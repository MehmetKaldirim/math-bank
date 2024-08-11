import express from "express";
import mongoose from "mongoose";
import commentRouter from "./routes/comment.route.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

app.use("/api/comment", commentRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
