import { Router } from "express";
import alerts from "./alerts.ts";

const router = Router();

router.use("/alerts", alerts);
