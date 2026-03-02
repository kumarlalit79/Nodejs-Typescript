import express from "express";
import bookRouter from "./book.routes.js";
import authRouter from "./auth.routes.js";
import courseRouter from "./course.routes.js";

const router = express.Router();

router.use("/books", bookRouter);

router.use("/auth", authRouter);

router.use("/course", courseRouter);

export default router;
