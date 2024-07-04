import jwt from "jsonwebtoken";

  
  // Create the JWT token
  const token = jwt.sign({ email }, "North Remembers!");

  // Set the cookie with token in the browser
  res.cookie("token", token, { httpOnly: true });