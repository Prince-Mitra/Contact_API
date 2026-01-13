import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const isAuthenticate = async (req, res, next) => {
  const token = req.header("Auth");
  if (!token) {
    return res.json({ message: "Login first", success: false });
  }

  const decoded = jwt.verify(token, process.env.JWT);
  const id = decoded.user;
  let user = await User.findById(id);
  if (!user) {
    return res.json({ message: "user does not exixts..", succes: false });
  }
  req.user = user;
  next();
};
