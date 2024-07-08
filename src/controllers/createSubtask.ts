import express from "express";

//! now you need to import some model which are necessary so go to thots-0 first

import Task from "../models/tasks";
import Subtask from "../models/subtasks";

import { IGetUserAuthInfoRequest } from "../../types/types";

const CreateSubtask = async (
  req: IGetUserAuthInfoRequest,
  res: express.Response
) => {
  //? extracting the title and status of the subtask

  const { title, completed } = req.body;
  const taskId = req.params.taskId;

  //? checking if the task exists or not

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    //? creating the subtask

    const subtask = new Subtask({
      title: title,
      completed: completed,
    });

    //? saving the subtask

    const savedSubtask = await subtask.save();

    //? adding the subtask ID to the task

    task.subtasks.push(savedSubtask._id);
    await task.save();
    res.status(201).json(savedSubtask);


  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export default CreateSubtask;