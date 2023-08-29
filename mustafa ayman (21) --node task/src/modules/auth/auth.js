import express from "express";
import { User } from "../../../database/models/user.model.js";
import { generateToken } from "../../utils/generateTokent.js";
import bcrypt from "bcryptjs";
const router = express.Router();
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" + error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken({
      username: user.username,
      role: user.role,
      userId: user._id,
    });
    res.status(200).json({ message: "Sign-in successful", token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" + " " + error });
  }
});
export default router;
