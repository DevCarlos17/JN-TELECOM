import { Router } from "express";
import { createContact, deleteContact, getContacts, updateContact } from "../controllers/contacts.controllers.js";

const router = Router();

router.get("/contacts", getContacts)
router.post("/contacts", createContact)
router.put("/contacts/:id", updateContact)
router.delete("/contacts/:id", deleteContact)

export default router