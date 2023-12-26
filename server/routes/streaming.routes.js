import { Router } from "express";
import { getUserStreaming, createUserStreaming, updateUserStreaming, deleteUserStreaming, getProfilesStreaming } from "../controllers/streaming.controllers.js";

const router = Router();

router.get("/streaming/accounts", getUserStreaming)
router.post("/streaming/accounts", createUserStreaming)
router.put("/streaming/accounts/:id", updateUserStreaming)
router.delete("/streaming/accounts/:id", deleteUserStreaming)

export default router