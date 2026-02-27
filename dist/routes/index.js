import express from "express";
import bookRouter from "./book.routes.js";
const router = express.Router();
router.use("/books", bookRouter);
export default router;
//# sourceMappingURL=index.js.map