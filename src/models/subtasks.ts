import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema({
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
});

const Subtask = mongoose.model("Subtasks", subTaskSchema); // COLLECTION  // or models

export default Subtask;
