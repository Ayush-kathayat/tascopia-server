import mongoose from "mongoose";

import Task from "./tasks";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },

  //!todo: have to add the ref of the tasks schema/model
  //? for that first you have to create the task model and import it in here
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Task,
    },
  ],

});



const User = mongoose.model("User", userSchema);

export default User;