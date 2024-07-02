import express from "express";
import jwt from "jsonwebtoken";

//! importing the user model
import User from "../models/users";

const Register = async (req: express.Request, res: express.Response) => {
  const { username, email, password } = req.body;

  //! todo : validate the user input

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //! todo : check if the user already exists in the database

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  //! todo : create a new user

  //? Don't worry i have used bcrypt to hash the password before saving it to the database in the model itself

  const newUser = new User({
    username,
    email,
    password,
  });

  //! todo : save the user to the database

  newUser.save();

  //! todo : create the JWT token

  const token = jwt.sign({ email }, "shhhhh");

  //! And set the cookie with token in the browser

  res.cookie("token", token);

  //! todo : send the token in the response

  res.json({
    user: {
      username,
      email,
      password,
    },
  });
};

export default Register;
