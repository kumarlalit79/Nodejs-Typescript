import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookie = req.headers.cookie;
    const token = cookie?.split("=")[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.MYSECRET as Secret) as MyJwtPayload

    console.log("decoded", decoded)

    req.id = decoded.id;
    req.role = decoded.role;

    next();

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Verify Middleware Token error ${error.message}`,
    });
  }
};
