import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./utils/db";
import router from "./routes/index.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 2000;
await connectDb();
app.use(cors({
    origin: process.env.HOST_URL || "*"
}));
app.use("/api", router);
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Everything is fine!"
    });
});
app.listen(port, () => console.log(`Server is running at port ${port}`));
//# sourceMappingURL=index.js.map