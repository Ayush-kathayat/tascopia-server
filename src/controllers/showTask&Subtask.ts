import express from "express";
import User from "../models/users";
import Subtask from "../models/subtasks";

import { IGetUserAuthInfoRequest } from "../../types/types";

const showTaskAndSubtasks = async (
  req: IGetUserAuthInfoRequest,
  res: express.Response
) => {
  try {
    // Find the user and populate their tasks, and for each task, also populate the subtasks
    const user = await User.findById(req.user._id).populate({
      path: "tasks", // Populate tasks
      populate: {
        path: "subtasks", // Within each task, also populate subtasks
        model: Subtask, // Assuming 'Subtask' is the name of your subtasks model
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default showTaskAndSubtasks;
