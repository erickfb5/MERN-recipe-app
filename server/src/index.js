import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { usersRouter, recipesRouter } from "./routes/index.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", usersRouter);
app.use("/recipes", recipesRouter);

mongoose
  .connect(
    process.env.MONGODB_URI,
    { connectTimeoutMS: 10000 }
  )
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
