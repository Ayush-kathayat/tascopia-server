import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users"; // importing the user model

const Login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body; // destructure the email and the password from the body of the request

  // Validate the user email and password
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all the fields" });
  }

  // Check if the user email exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  // Create the JWT token
  const token = jwt.sign({ email }, "North Remembers!");

  // Set the cookie with token in the browser
  res.cookie("token", token, { httpOnly: true });

  // Send the response
  res.json({ email: email, msg: "Login Success", JWT_token: token });
};

export default Login;
