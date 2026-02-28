import express from "express";
import {
  addBooks,
  deleteBook,
  getBooks,
  updateBook,
} from "../controllers/book.controller.js";
import { verifyToken } from "../utils/middleware.js";

const bookRouter = express.Router();

bookRouter.get("/get-book", verifyToken ,getBooks);
bookRouter.post("/add-book", addBooks);
bookRouter.put("/update-book/:id", updateBook);
bookRouter.delete("/delete-book/:id", deleteBook);

export default bookRouter;