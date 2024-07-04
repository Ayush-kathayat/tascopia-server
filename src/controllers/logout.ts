import express from "express";


const Logout  = (req: express.Request, res: express.Response) => {

  // Clear the cookie
  res.clearCookie("token");
  res.json({ msg: "Logged out" });
};

export default Logout;