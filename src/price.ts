import { Request, Response } from "express";
import { Tick } from "./types.ts";
import { triggerAlert } from "./alerts.ts";

export default async function ticker(req: Request, res: Response) {
    const body = req.body as Tick;
    checkAlert(body);
}
