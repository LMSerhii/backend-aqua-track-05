import express from "express";
import morgan from "morgan";
import cors from "cors";
import path, { dirname } from "path";
import mongoose from "mongoose";

import { fileURLToPath } from "url";


import contactsRouter from "./routes/contactsRouter.js";
import waterRouter from "./routes/waterRouter.js";
import { MONGODB_URL, PORT } from "./index.js";

import authRouter from "./routes/usersRouter.js";
import googleAuthRouter from "./routes/googleAuthRouter.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
const pathPrefix = "/api/v1";



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get(`${pathPrefix}/users/forgot-password-form`, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "mailForm.html"));
});

app.get(`${pathPrefix}/users/reset-password-form/:otp`, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "passwordForm.html"));
});

app.use(express.static(path.join(__dirname, "public")));


app.use(`${pathPrefix}/link`, (req, res) =>
  res.sendFile(path.join(process.cwd(), "./public/link.html"))
);

app.use(`${pathPrefix}/auth`, googleAuthRouter);
app.use(`${pathPrefix}/users`, authRouter);
app.use(`${pathPrefix}/contacts`, contactsRouter);
app.use(`${pathPrefix}/water`, waterRouter);

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
