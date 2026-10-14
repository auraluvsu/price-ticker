import { Request, Response } from "express";
import { Pair } from "./types.ts";

const assertPair = (body: any): body is Pair => {
    return body.symbol !== undefined && body.price !== undefined && body.direction !== undefined;
};

const alerts: Pair[] = [];

export async function getPrice(req: Request, res: Response) {
    const key = req.header("secret-key");
    if (key !== process.env.secret!) res.status(401).send("Unauthorized");
    res.status(200).send(JSON.stringify(alerts));
}

export async function priceAlert(req: Request, res: Response) {
    try {
        const body: Pair = req.body;
        console.log("Pair:", body);
        if (!assertPair(body)) throw new Error("Body is not of type Pair");
        switch (body.symbol) {
            case "XAUUSD":
                alerts.push({
                    id: alerts.length + 1,
                    direction: body.direction,
                    symbol: body.symbol,
                    price: body.price,
                });
                res.status(201).json({ status: `created alert for ${body.price}` });
                break;
            case "NAS100":
                alerts.push({
                    id: alerts.length + 1,
                    direction: body.direction,
                    symbol: body.symbol,
                    price: body.price,
                });
                res.status(201).json({ status: `created alert for ${body.price}` });
                break;
            case "XAGUSD":
                alerts.push({
                    id: alerts.length + 1,
                    direction: body.direction,
                    symbol: body.symbol,
                    price: body.price,
                });
                res.status(201).json({ status: `created alert for ${body.price}` });
                break;
            case "SPX500":
                alerts.push({
                    id: alerts.length + 1,
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

export async function deleteAlert(req: Request, res: Response) {}
