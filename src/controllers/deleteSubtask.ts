import express from "express";
import Task from "../models/tasks";
import Subtask from "../models/subtasks";

import { IGetUserAuthInfoRequest } from "../../types/types";

const deleteSubtaskFromTask = async (
  req: IGetUserAuthInfoRequest,
  res: express.Response
) => {
  const taskId = req.params.taskId;
  const subtaskId = req.params.subtaskId;

  try {
    // Find the task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove the subtask from the task's subtasks array
    const subtaskIndex = task.subtasks.findIndex(
      (id) => id.toString() === subtaskId
    );
    if (subtaskIndex > -1) {
      task.subtasks.splice(subtaskIndex, 1);
    } else {
      return res.status(404).json({ message: "Subtask not found in task" });
    }

    // Save the updated task
    await task.save();

    //! delete the subtask document from the subtasks collection
    await Subtask.findByIdAndDelete(subtaskId);

    res.status(200).json({ message: "Subtask deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default deleteSubtaskFromTask;
