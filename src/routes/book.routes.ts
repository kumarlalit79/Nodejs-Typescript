import express from "express";
import { addBooks, getBooks, updateBook } from "../controllers/book.controller.js";

const bookRouter = express.Router();

bookRouter.get("/get-book", getBooks);
bookRouter.post("/add-book", addBooks);
bookRouter.put("/update-book/:id", updateBook);

export default bookRouter;
