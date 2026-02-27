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

export const addBooks = async (req: Request, res: Response) => {
  try {
    const { name, author, publishYear, description } = req.body;

    if (!name || !author || !publishYear || !description) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const book = await Book.create({ name, author, publishYear, description });
    return res.status(201).json({
      message: "Book added successfully!",
      book,
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Error in Add Books! ${error.message}`,
      success: false,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { name, author, publishYear, description } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id not found!",
      });
    }

    const book = await Book.findByIdAndUpdate(
      id,
      { name, author, publishYear, description },
      { new: true },
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "No books not found!",
      });
    }

    return res.status(200).json({
      message: "Book updated successfully!",
      book,
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Error in Update Books! ${error.message}`,
      success: false,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Id not found!",
        success: false,
      });
    }

    const book = await Book.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Book deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Error in Update Books! ${error.message}`,
      success: false,
    });
  }
};
