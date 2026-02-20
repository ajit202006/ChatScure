import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

// to extract publicId from cloudinary url
const extractPublicId = (url: string) => {
    const parts = url.split('/');
    const publicIdWithExtension = parts[parts.length - 1] || "";
    const publicId = publicIdWithExtension.split('.')[0];
    return publicId;
};

export default cloudinary;
export { extractPublicId };