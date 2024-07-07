import { Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken"; // Import JsonWebTokenError for error handling
import User from "../models/users";

import { IGetUserAuthInfoRequest } from "../../types/types";

interface JwtPayload {
  email: string;
  // include other properties that might be in the payload
}

const authMiddleware = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Access the token from the header
    // const token = req.cookies['token']; // Access the token stored in the cookie
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, "North Remembers!") as JwtPayload; // Verify token and extract payload
    // No need to check if decoded is null, jwt.verify will throw an error if token is invalid

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found", email: decoded.email });
    }

    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      // This error is thrown for invalid tokens, including tampered ones
      return res.status(401).json({ message: "Invalid token", error: err.message });
    }
    // Handle other possible errors (e.g., database errors)
    res.status(500).json({ message: "Failed to authenticate token", error: err.message });
  }
};

export default authMiddleware;