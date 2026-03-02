import type { Request, Response } from "express";
import Course from "../models/Course.js";
import redis from "../utils/redis.js";

export const getAllCourse = async (req: Request, res: Response) => {
  try {
    const cacheKey = "course:all";
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({
        message: "Courses fetched from cache",
        course: JSON.parse(cachedData),
        success: true,
      });
    }

    const course = await Course.find();
    if (!course) {
      return res.status(400).json({
        message: "No course found",
        success: false,
      });
    }

    await redis.set(cacheKey, JSON.stringify(course), "EX", 60)

    return res.status(200).json({
      message: "All course fetched from DB",
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

    // DELETING CACHE
    await redis.del("courses:all")

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


export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    // clear cache
    await redis.del("courses:all");

    return res.status(200).json({
      message: "Course updated successfully",
      course,
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Update course error : ${error}`,
      success: false,
    });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    // clear cache
    await redis.del("courses:all");

    return res.status(200).json({
      message: "Course deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Delete course error : ${error}`,
      success: false,
    });
  }
};