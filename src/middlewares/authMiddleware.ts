import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/users";


// Assuming JwtPayload is an interface that includes the properties of your token's payload
interface JwtPayload {
  email: string;
  // include other properties that might be in the payload
}





const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["token"]; // Access the token stored in the cookie
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, "North Remembers!") as JwtPayload; // Verify token and extract payload
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Optionally, find the user in the database
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to the request object
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to authenticate token", error: err });
  }
};

export default authMiddleware;
