import { Request, Response } from 'express';
// import  User  from '../models/users'; // Adjust the import path as necessary
import  Task  from '../models/tasks'; // Adjust the import path as necessary



// When accessing the user property, you might need to assert its type to IUser if you encounter issues
const CreateTask = async (req: Request, res: Response) => {
  const { title, completed, subtasks = [] } = req.body;

  try {
    const task = new Task({
      title: title,
      completed: completed,
      subtasks: subtasks,
    });

    const savedTask = await task.save();

    if (!req.user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Assuming req.user is correctly typed as IUser, you might need to assert its type here
    req.user.tasks.push(savedTask._id);
    await req.user.save(); // Use type assertion to satisfy TypeScript

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export default CreateTask;