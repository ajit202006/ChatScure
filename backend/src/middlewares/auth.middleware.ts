import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const protectRoute: RequestHandler = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" })
        }

        const decoded = <{ userId: string }>jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded.userId, { email: 1, fullName: 1, profilePic: 1 });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error: any) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

export { protectRoute };