
import express from "express"

//!importing the necessary models

import User from "../models/users";
import Task from "../models/tasks";

import { IGetUserAuthInfoRequest } from "../../types/types";


const DeleteTask = async (req: IGetUserAuthInfoRequest, res: express.Response) => {

  //! i will take the task id from the user params

  const taskId  = req.params.taskId;

  try{

    //! i will find the task by its id and delete it

    await Task.findByIdAndDelete(taskId);

    //! i will find the user by its email

    const user = await User.findOne({ email: req.user.email });

    //! i will remove the task id from the user tasks array

    user.tasks = user.tasks.filter((task) => task.toString() !== taskId);

    await user.save();

    res.status(200).json({ message: "Task deleted successfully" });

  }
  catch(err){
    res.status(500).json({ message: "An error occurred", error: err });
  }
}
        

export default DeleteTask;