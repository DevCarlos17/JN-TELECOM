import { Router } from "express";
import { getProcessedSales, createProcessedSale, updateProcessedSale, deleteProcessedSale } from "../controllers/verticalGrowth.controllers.js";


const router = Router();

router.get("/vertical-growth", getProcessedSales)
router.post("/vertical-growth", createProcessedSale)
router.put("/vertical-growth", updateProcessedSale)
router.delete("/vertical-growth", deleteProcessedSale)

export default router