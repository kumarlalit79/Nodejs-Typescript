import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./utils/db.js";
import router from "./routes/index.js";
import redis from "./utils/redis.js";

const app = express();

dotenv.config();
const port = process.env.PORT || 2000;

await connectDb();

app.use(
  cors({
    origin: process.env.HOST_URL || "*",
  }),
);

app.use(express.json());

app.use("/api", router);


// Normal testing express server
// app.get("/", (req: Request, res: Response) => {
//   return res.status(200).json({
//     message: "Everything is fine!",
//   });
// });

// testing redis server
app.get("/", async (req: Request, res: Response) => {
  await redis.set("name", "Lalit");

  const value = await redis.get("name");

  res.json({
    success: true,
    value,
  });
});



app.listen(port, () => console.log(`Server is running at port ${port}`));
