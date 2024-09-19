import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/users.route.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/users", userRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("Listening on port 3000");
});
