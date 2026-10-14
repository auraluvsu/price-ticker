import { Router } from "express";
import { getPrice, priceAlert } from "./alerts.ts";

const router = Router();

router.get("/alerts", getPrice);
router.post("/alerts", priceAlert);
router.post("/ticker", ticker);

export default router;
