import express from "express"
import { createCourse, getAllCourse } from "../controllers/course.controller.js"

const courseRouter = express.Router()

courseRouter.post("/add-coures", createCourse)
courseRouter.get("/getAll-coures", getAllCourse)

export default courseRouter