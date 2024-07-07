//! Here will be all the routes for the tasks

import express from "express";

import { CreateTask, DeleteTask} from "../controllers/controllers";


const taskRouter = express.Router();

//! todo  : NOW use the controllers 

taskRouter.post("/addtask", CreateTask);
taskRouter.delete("/deletetask/:taskId", DeleteTask);




export default taskRouter;