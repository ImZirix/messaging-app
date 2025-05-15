import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  sendMessage,
  getMessages,
  getMessagesBetweenUsers,
} from "../controllers/messageController.js";
const router = express.Router();

router.post("/", authenticate, sendMessage);

router.get("/:otherUserId", authenticate, getMessagesBetweenUsers);

export default router;
