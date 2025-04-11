import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //  check if all fields were created
    if (!username || !password || !email) {
      return res.status(400).json({message:"All fields are required"});
    }
    // check for password length
    if (password.length < 6) {
      return res.status(400).json({message: "Password length should not be less than 6"});
    }

    // check for username length
    if (username.length < 3) {
      return res.status(400).json({message: "Username too short"});
    }

    // check for existing user
    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({message: "Username already exist"});

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({message: "email already exist"});

    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    const user = new User({
      email,
      username,
      password,
      profileImage,
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("An error occured", error);
    res.status(500).json({message:"Internal server error"});
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({message: "Please provide all fields"});

    //check if user exist
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({message: "Incorrect password or email"});

    const validPass = await user.comparePass(password)

    if (!validPass) return res.status(400).json({message: "Incorrect password or email"});

    const token = generateToken(user._id);

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("An error occured", error);
    res.status(500).json({message: "Internal server error"});
  }
});

export default router;
