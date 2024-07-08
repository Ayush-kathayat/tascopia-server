import express from "express";

//!importing the necessary models

import User from "../models/users";
import Task from "../models/tasks";
import Subtask from "../models/subtasks";

import { IGetUserAuthInfoRequest } from "../../types/types";

const DeleteTask = async (
  req: IGetUserAuthInfoRequest,
  res: express.Response
) => {
  //! i will take the task id from the user params

  const taskId = req.params.taskId;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Delete subtasks if they exist
    if (task.subtasks && task.subtasks.length > 0) {
      try {
        // Use the Subtask model to delete subtasks
        const deleteResult = await Subtask.deleteMany({
          _id: { $in: task.subtasks },
        });
        console.log(deleteResult); // For debugging, to see the outcome of the delete operation
      } catch (error) {
        console.error("Error deleting subtasks:", error);
        return res
          .status(500)
          .json({ message: "Failed to delete subtasks", error });
      }
    }

    //! i will find the task by its id and delete it

    await Task.findByIdAndDelete(taskId); //! this shit here just deleting the task not the subtask in it

    //! i will find the user by its email

    const user = await User.findOne({ email: req.user.email });

    //! i will remove the task id from the user tasks array

    user.tasks = user.tasks.filter((task) => task.toString() !== taskId);

    await user.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export default DeleteTask;
