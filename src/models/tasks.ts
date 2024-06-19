import mongoose from "mongoose";

import Subtask from "./subtasks";
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },

  //! i need to make a subtasks refrence for all the tasks for that first make the subtasks model

  subtasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Subtask,
    },
  ],
});

const Task = mongoose.model("Tasks", taskSchema); // COLLECTION  // or models

export default Task;
