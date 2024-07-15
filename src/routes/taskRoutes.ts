//! Here will be all the routes for the tasks

import express from "express";

import { CreateTask, DeleteTask , CreateSubtask ,showTaskAndSubtasks , deleteSubtaskFromTask, UpdateTask} from "../controllers/controllers";




const taskRouter = express.Router();

//! todo  : NOW use the controllers 

taskRouter.post("/addtask",CreateTask);
taskRouter.delete("/deletetask/:taskId",DeleteTask);
taskRouter.post("/addsubtask/:taskId",CreateSubtask);
taskRouter.get("/show" , showTaskAndSubtasks);
taskRouter.delete("/deletesubtask/:taskId/:subtaskId",deleteSubtaskFromTask);
taskRouter.put("/updatetask/:taskId",UpdateTask);




export default taskRouter;