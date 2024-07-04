import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/users"; // importing the user model

const Login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body; // destructure the email and the password form the body of the email

  //! Now as we have destructured the email and the password from the request body we can now validate the email and the password

  // Validate the user email

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all the fields" });
  }

  //! Check if the user email exists in the database

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "User does not Exist" });
  }

  //! Check if the password is correct

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err)
      return res.status(500).json({ msg: "Error comparing the password" });

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  });

  // Create the JWT token
  const token = jwt.sign({ email }, "North Remembers!");

  // Set the cookie with token in the browser
  res.cookie("token", token, { httpOnly: true });

  res.json({ email: email, msg: "Login Success", JWT_token: token });
};

export default Login;
