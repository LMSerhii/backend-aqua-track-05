import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/usersRouter.js";

dotenv.config();

const { PORT, MONGODB_URL } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
const pathPrefix = "/api/v1";

app.use(`${pathPrefix}/users`, authRouter);
app.use(`${pathPrefix}/contacts`, contactsRouter);

// Error handles
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// Server connection
const port = PORT || 3000;
const uri = MONGODB_URL;

const clientOptions = {
  // serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const run = async () => {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Database connected ...");

    app.listen(port, () => {
      console.log(`Server is running. Use our API on port: ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

run().catch(console.dir);
