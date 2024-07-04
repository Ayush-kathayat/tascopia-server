import express from "express";


const Logout  = (req: express.Request, res: express.Response) => {

  // const {email} = req.body;
  // Clear the cookie
  res.clearCookie("token");
  res.json({  msg: "Logged out" });
};

export default Logout;