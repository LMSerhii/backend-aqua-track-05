import fs from "fs";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";

import waterRouter from "./routes/waterRouter.js";
import { MONGODB_URL, PORT } from "./index.js";

import authRouter from "./routes/usersRouter.js";
import googleAuthRouter from "./routes/googleAuthRouter.js";

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
const pathPrefix = "/api/v1";

app.use(`${pathPrefix}/auth`, googleAuthRouter);
app.use(`${pathPrefix}/users`, authRouter);
app.use(`${pathPrefix}/water`, waterRouter);

app.use(
  `${pathPrefix}/docs`,
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

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

const clientOptions = {};

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
