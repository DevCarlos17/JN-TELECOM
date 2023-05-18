import { Router } from "express";

import { createVenta, deleteVenta, getSalesBySeller, getSalesBySupervisor, getVenta, getVentas, updateVenta, updateVentaByAdmin } from "../controllers/ventas.js";


const router = Router();

router.get("/ventas", getVentas)
router.post("/ventas", createVenta)
router.put("/ventas/:id", updateVenta)
router.put("/ventas/admin/:id", updateVentaByAdmin)
router.delete("/ventas/:id", deleteVenta)
router.get("/ventas/:id", getVenta)
router.get("/sales/seller/:username", getSalesBySeller)
router.get("/sales/supervisor/:username", getSalesBySupervisor)

export default router
