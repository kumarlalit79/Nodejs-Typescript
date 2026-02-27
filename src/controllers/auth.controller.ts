import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber, username, password, roles } = req.body;
    if (!name || !email || !phoneNumber || !username || !password || !roles) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: "Username already taken, please use different one!",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      phoneNumber,
      username,
      password: hashedPassword,
      roles,
    });
    return res.status(201).json({
      message: "User registered!",
      user,
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Error in Signup! ${error.message}`,
      success: false,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email does not exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      return res.status(400).json({
        message: "Password is wrong",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Login success",
      user,
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Error in Signin! ${error.message}`,
      success: false,
    });
  }
};
