import express from "express"
import { createCourse, deleteCourse, getAllCourse, updateCourse } from "../controllers/course.controller.js"

const courseRouter = express.Router()

courseRouter.post("/add-coures", createCourse)
courseRouter.get("/getAll-coures", getAllCourse)
courseRouter.put("/update-coures", updateCourse)
courseRouter.delete("/delete-coures", deleteCourse)

export default courseRouter