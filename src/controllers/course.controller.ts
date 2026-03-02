import type { Request, Response } from "express";
import Course from "../models/Course.js";

export const getAllCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.find();
    if (!course) {
      return res.status(400).json({
        message: "No course found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All course fetched",
      course,
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Get all course error : ${error}`,
      success: false,
    });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { courseName, duration, location } = req.body;
    if (!courseName || !duration || !location) {
      return res.status(400).json({
        message: "All fiels are required",
        success: false,
      });
    }

    const course = await Course.create({ courseName, duration, location });
    return res.status(201).json({
      message: "Course created successfully",
      course,
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Create course error : ${error}`,
      success: false,
    });
  }
};
