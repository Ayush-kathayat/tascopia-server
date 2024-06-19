import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

// Hash the password before saving it to the database

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // generate the salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
      }

      // hash the password
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// Now to compare
type ComparisonCallback = (error: Error | null, isMatch: boolean) => void;


userSchema.methods.isValidPassword = function (password:string, callback:ComparisonCallback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return callback(err, false);
    callback(null, isMatch);
  });
};



const User = mongoose.model("User", userSchema);

export default User;