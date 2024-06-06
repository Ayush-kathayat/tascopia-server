import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
});

// Hash the password before saving it to the database

userSchema.pre("save", async function (next) {


  if (this.isModified("password")) {
    // generte the salt
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
