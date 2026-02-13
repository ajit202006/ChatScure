import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (userId: string | null, res: Response) => {
    const key = process.env.JWT_SECRET;
    const token = jwt.sign({ userId }, key || "mysecretkey", {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
    return token;
}

export { generateToken };