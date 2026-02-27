import express from "express"
import { getBooks } from "../controllers/book.controller.js"

const bookRouter = express.Router()

bookRouter.get('/get-book', getBooks)

export default bookRouter