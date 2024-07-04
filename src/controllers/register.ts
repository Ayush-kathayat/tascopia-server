import express from "express";
import bcrypt from "bcrypt";
import User from "../models/users"; // importing the user model

const Register = async (req: express.Request, res: express.Response) => {
  const { username, email, password } = req.body;

  // Validate the user input
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check if the user already exists in the database
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // Create a new user
  bcrypt.genSalt(10, async (err, salt) => {
    if (err) return res.status(500).json({ msg: "Error generating salt" });
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.status(500).json({ msg: "Error hashing password" });

      const newUser = new User({
        username,
        email,
        password: hash, // Save the hashed password
      });

      // Save the user to the database
      try {
        await newUser.save();

        // Send the token in the response
        res.json({
          user: {
            username,
            email,
            password: hash, // Do not send back the password //! just send back the hashed password
          },
        });
      } catch (saveError) {
        return res.status(500).json({ msg: "Error saving the user" });
      }
    });
  });
};

export default Register;
