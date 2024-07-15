import express from "express";
import { IGetUserAuthInfoRequest } from "../../types/types";

// importing models which are neccesasry

import Task from "../models/tasks";




const UpdateTask = async (req: IGetUserAuthInfoRequest, res: express.Response) => { 
  //! Get the task ID from the request parameters
  const { taskId } = req.params; 
  const { title, completed, subtasks = [] } = req.body;
  
  //! Now that we do have the task id , we can update the task 
  
  // also as this is the update task i need to get the task body from there too from the request body
  
  try{
    //! Find the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    //! Update the task with the new values
    
    task.title = title;
    task.completed = completed;
    task.subtasks = subtasks;
    
    //! Save the updated task
    
    await task.save();
    
    //! send the updated task as a response
    res.status(200).json(task);
    
  }catch(error){
    res.status(500).json({ message: "An error occurred", error: error });
  }
}
export default UpdateTask;