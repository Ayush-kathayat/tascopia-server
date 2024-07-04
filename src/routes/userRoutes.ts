import express from "express";

//todo : import the controller
import { Register, Login , Logout } from "../controllers/controllers";


const userRouter = express.Router();

//! todo  : NOW use the controllers here like for register , login , logout etc

userRouter.post("/register", Register);

userRouter.post("/login", Login);

userRouter.post("/logout", Logout);


export default userRouter;
