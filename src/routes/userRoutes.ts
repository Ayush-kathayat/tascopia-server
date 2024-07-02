import express from "express";

//todo : import the controller
import { Register } from "../controllers/controllers";

const userRouter = express.Router();

//! todo  : NOW use the controllers here like for register , login , logout etc

userRouter.post("/register", Register);

export default userRouter;
