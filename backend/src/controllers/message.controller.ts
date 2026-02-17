import { RequestHandler } from "express";
import User from "../models/user.model";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";

const getUsersForSidebar: RequestHandler = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error: any) {
        console.log("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getMessages: RequestHandler = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });
    } catch (error: any) {
        console.log("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const sendMessage: RequestHandler = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secrure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error: any) {
        console.log("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { getUsersForSidebar, getMessages, sendMessage };