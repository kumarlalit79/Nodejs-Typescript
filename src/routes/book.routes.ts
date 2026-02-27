import express from "express";
import {
  addBooks,
  deleteBook,
  getBooks,
  updateBook,
} from "../controllers/book.controller.js";

const bookRouter = express.Router();

bookRouter.get("/get-book", getBooks);
bookRouter.post("/add-book", addBooks);
bookRouter.put("/update-book/:id", updateBook);
bookRouter.delete("/delete-book/:id", deleteBook);

export default bookRouter;