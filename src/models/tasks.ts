import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    min: 6,
    trim : true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Tasks", taskSchema); // COLLECTION  // or models

export default Task;