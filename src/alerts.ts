import { Request, Response } from "express";
import { Pair, Tick } from "./types.ts";

const assertPair = (body: any): body is Pair => {
    return body.symbol !== undefined && body.price !== undefined && body.direction !== undefined;
};

const alerts: Pair[] = [];

export async function getPrice(req: Request, res: Response) {
    const key = req.header("secret-key");
    if (key !== process.env.secret!) res.status(401).json({ error: "Unauthorized" });
    res.status(200).json({ body: alerts });
}

export async function createPriceAlert(req: Request, res: Response) {
    try {
        const body: Pair = req.body;
        console.log("Pair:", body);
        if (!assertPair(body)) throw new Error("Body is not of type Pair");
        switch (body.symbol) {
            case "XAUUSD":
                alerts.push({
                    id: body.id,
                    direction: body.direction,
                    symbol: body.symbol,
                    price: body.price,
                });
                res.status(201).json({ status: `created alert for ${body.price}` });
                break;
            case "NAS100":
                alerts.push({
                    id: body.id,
                    direction: body.direction,
                    symbol: body.symbol,
                    price: body.price,
                });
                res.status(201).json({ status: `created alert for ${body.price}` });
                break;
            case "XAGUSD":
                alerts.push({
                    id: body.id,
                    direction: body.direction,
                    symbol: body.symbol,
                    price: body.price,
                });
                res.status(201).json({ status: `created alert for ${body.price}` });
                break;
            case "SPX500":
                alerts.push({
                    id: body.id,
                    direction: body.direction,
                    symbol: body.symbol,
                    price: body.price,
                });
                res.status(201).json({ status: `created alert for ${body.price}` });
                break;
            default:
                console.log("Could not find symbol");
                res.status(500).json({ error: "Could not find requested symbol" });
                break;
        }
    } catch (e) {
        console.log("There was an error:", e);
        res.status(500).json({ error: e });
    }
}

const direction = (tick: Tick, a: Pair) => {
    return tick.direction === a.direction;
};

const pairMatch = (tick: Tick, a: Pair) => {
    if (direction(tick, a) && tick.direction === "bear") return false;
    else if (direction(tick, a) && tick.direction === "bull") return true;
    else return;
};

export async function checkAlert(tick: Tick) {
    for (const a of alerts) {
        if (pairMatch(tick, a)) {
            if (tick.price > a.price) {
                console.log("ALERT TRIGGERED:", a);
            } else return;
        } else if (!pairMatch(tick, a)) {
            if (tick.price > a.price) {
                console.log("ALERT TRIGGERED:", a);
            } else return;
        }
    }
}

export async function deleteAlert(req: Request, res: Response) {}
