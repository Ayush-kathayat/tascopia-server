import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/databaseConnection";

import authMiddleware from "./middlewares/authMiddleware";
//! IMPORTING ROUTES
import userRouter from "./routes/userRoutes";
import taskRouter from "./routes/taskRoutes";

const app = express();

const PORT = process.env.PORT || 5050;

//! Middleware to parse JSON bodies
app.use(express.json());

app.use(cookieParser());

//! MIDDLEWARES for routes
app.use("/api/v3", userRouter); // using the user routes
app.use("/api/v3", authMiddleware, taskRouter); // using the task routes

//! Db connection
connectDB();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
