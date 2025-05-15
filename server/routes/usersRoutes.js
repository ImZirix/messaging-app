import express from "express";
import { getAllUsers } from "../controllers/usersController.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();

router.get("/", getAllUsers);

export default router;
