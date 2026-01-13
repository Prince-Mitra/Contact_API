import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, department } = req.body;

  if (name == "" || email == "" || password == "" || department == "") {
    return res.json({ message: "All fields are required", success: false });
  }

  let user = await User.findOne({ email });

  if (user) {
    return res.json({ message: "User already exist!", success: false });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashPassword, department });

  res.json({
    message: "user successfully registered and saved in DB..",
    success: true,
    user,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (email == "" || password == "") {
    return res.json({ message: "All fields are required" });
  }

const allUsers = await User.find({});
console.log("All emails in DB:", allUsers.map(u => u.email));
console.log("Login attempt:", email);

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "user does not exists", success: false });
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({
      message: "password does not matched enter valid password",
      success: false,
    });
  }
  const token = jwt.sign({ user: user._id }, process.env.JWT, { //;;;; = secret password that keeps your login token safe.
    expiresIn: "1d", //Makes a login token for the user ✅

    // Stores user ID inside → so server knows who it is

    // Uses a secret key → keeps token safe 🔒

    // Expires in 1 day → user must log in again after 1 day ⏰
  });
  res.json({ message: `welcome ${user.name}`, token, success: true });
};
