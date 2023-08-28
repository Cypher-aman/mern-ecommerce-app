import User from "../model/User.js";
import jwt from "jsonwebtoken";
import { sanitizeUser } from "../utils/common.js";
import bcrypt from "bcrypt";

/* SIGNUP USER */
export const createUser = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res.status(409).json({ message: "Email is already in use." });

  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY);
    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .status(201)
      .json({
        email: user.email,
        id: user._id,
        name: user.name,
        role: user.role,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* LOGIN USER */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(409).json({ message: "Invalid credentials" });
    }

    const { email: userEmail, _id: userId, name: userName } = user;
    res.status(201).json({ email: userEmail, id: userId, name: userName });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
