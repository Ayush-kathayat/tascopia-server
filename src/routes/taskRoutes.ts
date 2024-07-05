//! Here will be all the routes for the tasks

import express from "express";

import { CreateTask} from "../controllers/controllers";


const taskRouter = express.Router();

//! todo  : NOW use the controllers 

taskRouter.post("/addtask", CreateTask);




export default taskRouter;