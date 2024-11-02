import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./app/config/dbConnection.js";
import errorHandler from "./app/middlewares/errorHandler.js";
import authRoute from "./app/routes/auth.js";

dotenv.config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use("/api/auth", authRoute);

// Error handlerss
app.use(errorHandler);

app.listen(port, () => {
  console.log("server running on port" + port);
});
