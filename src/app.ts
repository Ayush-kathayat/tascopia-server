import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/databaseConnection";

//! IMPORTING ROUTES
import userRouter from "./routes/userRoutes";

const app = express();

const PORT = process.env.PORT || 5050;

//! Middleware to parse JSON bodies
app.use(express.json());

//! MIDDLEWARES for routes
app.use("/api/v3", userRouter); // using the user routes

//! Db connection
connectDB();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
