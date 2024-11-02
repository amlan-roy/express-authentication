import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./app/config/dbConnection.js";

dotenv.config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded());

// Routes
// Add the routes here

// Error handlerss
// Add the error handlers here

app.listen(port, () => {
  console.log("server running on port" + port);
});
