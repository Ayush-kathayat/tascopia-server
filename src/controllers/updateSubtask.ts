import express from "express";
import { IGetUserAuthInfoRequest } from "../../types/types";

// importing models which are neccesasry
import Task from "../models/tasks";
import Subtask from "../models/subtasks";


const UpdateSubtask = async (req: IGetUserAuthInfoRequest, res: express.Response) => {
  
  const { taskId, subtaskId } = req.params;
  const { title, completed } = req.body;
  
  try {
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    const subtask = await Subtask.findById(subtaskId);
    
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }
    
    subtask.title = title;
    subtask.completed = completed;
    
    await subtask.save();

    // now after saving the subtask we need to save its id in the subtasks array of the task
    
    
    // task.subtasks.push(subtask._id);
    
    // //! save the task after deleting the id of the subtask from the subtasks array
    // await task.save();
    
    res.status(200).json(subtask);
  }
  catch (error) {
    res.status(500).json({ message: "An error occurred", error: error });
  }
  
}

export default UpdateSubtask;