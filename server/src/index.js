import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', userRouter)

mongoose.connect('mongodb+srv://erickfb5:hMd8OYaYXda1lD7X@recipes.ilndjmn.mongodb.net/recipes?retryWrites=true&w=majority')

app.listen(3001, () => console.log("Server running on port 3001"));
