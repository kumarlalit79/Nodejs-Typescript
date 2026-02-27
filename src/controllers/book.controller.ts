import express, { type Request, type Response } from "express";
import Book from "../models/Books.js";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    if (!books) {
      return res.status(400).json({
        message: "No book found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book Fetched Successfully",
      books,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in Get Books!",
      success: false,
    });
  }
};
