import express from "express";
import { authenticate } from "../middleware/auth.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";
const router = express.Router();

router.post("/", authenticate, sendMessage);

router.get("/:id", authenticate, getMessages);

export default router;
