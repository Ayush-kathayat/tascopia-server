import { Response } from 'express';
import User from '../models/users'; // Adjust the import path as necessary
import Task from '../models/tasks'; // Adjust the import path as necessary

import { IGetUserAuthInfoRequest } from "../../types/types";


const CreateTask = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { title, completed, subtasks = [] } = req.body;

  try {
    const task = new Task({
      title: title,
      completed: completed,
      subtasks: subtasks,
    });

    const savedTask = await task.save();

    if (!req.user) {
      return res.status(400).json({ message: "User not found " });
    }

    // Find the user based on email from JWT payload
    const user = await User.findOne({ email: req.user.email }); // Assuming email is part of req.user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the task ID to the user's tasks array
    user.tasks.push(savedTask._id);
    await user.save();

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export default CreateTask;