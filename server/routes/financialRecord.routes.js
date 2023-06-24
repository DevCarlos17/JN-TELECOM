import { Router } from "express"
import { getFincialRecords, createFinancialRecord, updateFinancialRecord, deleteFinancialRecord } from "../controllers/financialRecord.controllers.js";

const router = Router();

router.get("/financial-records", getFincialRecords)
router.post("/financial-records", createFinancialRecord)
router.put("/financial-records/", updateFinancialRecord)
router.delete("/financial-records", deleteFinancialRecord)

export default router