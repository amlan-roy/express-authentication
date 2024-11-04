import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./app/config/dbConnection.js";
import errorHandler from "./app/middlewares/errorHandler.js";
import authRoute from "./app/routes/auth.js";
import cors from "cors";
import sanitize from "sanitize";

dotenv.config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(sanitize.middleware);

// Routes
app.use("/api/auth", authRoute);

// Error handlerss
app.use(errorHandler);

app.listen(port, () => {
  console.log("server running on port" + port);
});
