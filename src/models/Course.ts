import mongoose from "mongoose";

interface ICourse {
  courseName: string;
  duration: number;
  location: string;
}

const courseSchema = new mongoose.Schema<ICourse>({
  courseName: { type: String, required: true, unique: true },
  duration: { type: Number, required: true },
  location: { type: String },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
export type { ICourse };
