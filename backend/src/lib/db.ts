import mongoose from "mongoose";

const connectDB = async (MONGODB_URI: string) => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected:", conn.connection.host);
    } catch (error) {
        console.log("MongoDB connection error:", error)
    }
}

export default connectDB;