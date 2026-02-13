import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../lib/utils";

const signup: RequestHandler = async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters long." });
        }
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            generateToken(JSON.stringify(newUser._id), res);
            await newUser.save();
            res.status(201).json(newUser);
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
        
    } catch (error: any) {
        console.log("Error in signup controller", error.message);
        res.send(500).json({ message: "Internal Server Error" });
    }
}
const login: RequestHandler = (req, res) => {
    res.send("login");
}
const logout: RequestHandler = (req, res) => {
    res.send("logout");
}

export { signup, logout, login };