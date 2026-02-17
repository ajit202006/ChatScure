import express from "express";
import { getUsersForSidebar } from "../controllers/message.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = express.Router()

router.get("/users", protectRoute, getUsersForSidebar);

export default router;