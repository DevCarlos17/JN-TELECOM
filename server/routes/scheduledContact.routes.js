import { Router } from "express";
import { getScheduledContacts, createScheduledContact, updateScheduledContact, deleteScheduledContact } from "../controllers/scheduledContacts.js";

const router = Router();

router.get("/scheduledContact", getScheduledContacts)
router.post("/scheduledContact", createScheduledContact)
router.put("/scheduledContact/:id", updateScheduledContact)
router.delete("/scheduledContact/:id", deleteScheduledContact)

export default router