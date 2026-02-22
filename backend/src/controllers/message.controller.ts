import { RequestHandler } from "express";
import mongoose from "mongoose";
import User from "../models/user.model";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";
import { getReceiverSocketId, io } from "../lib/socket";

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
        const id = req.params.id;
        const userToChatId = new mongoose.Types.ObjectId(`${id}`);
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        res.status(200).json(messages);
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
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(`${receiverId}`);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error: any) {
        console.log("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { getUsersForSidebar, getMessages, sendMessage };