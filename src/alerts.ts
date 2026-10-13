import { Request, Response } from "express";

type TickerSymbol = "XAUUSD" | "NAS100" | "XAGUSD" | "SPX500";
type Direction = "bear" | "bull";

type TickerAlert = {
    direction: Direction;
    alertPrice: number;
};

type Pair = {
    id: number;
    symbol: TickerSymbol;
    price: number;
};

const alerts: Partial<Record<TickerSymbol, number>> = {};
alerts.NAS100 = 30000;
alerts.XAUUSD = 4100;
alerts.SPX500 = 8000;
alerts.XAGUSD = 80;

export async function getPrice(req: Request, res: Response) {
    const key = req.header("secret-key");
    if (key !== process.env.secret!) res.status(401).send("Unauthorized");
    res.status(200).send(JSON.stringify(alerts));
}

export async function priceAlert(req: Request, res: Response) {
    try {
        const body: Pair = req.body;
        console.log("Pair:", body);
        switch (body.symbol) {
            case "XAUUSD":
                alerts.XAUUSD = body.price;
                res.status(201).json({ status: `created alert for ${body.price}` });
                break;
            case "NAS100":
                alerts.NAS100 = body.price;
                res.status(201).json({ status: `created alert for ${body.price}` });
                break;
            case "XAGUSD":
                alerts.XAGUSD = body.price;
                res.status(201).json({ status: `created alert for ${body.price}` });
                break;
            case "SPX500":
                alerts.SPX500 = body.price;
                res.status(201).json({ status: `created alert for ${body.price}` });
                break;
            default:
                console.log("Could not find symbol");
                res.status(500).json({ error: "Could not find requested symbol" });
                break;
        }
    } catch (e) {
        console.log("There was an error:", e);
        res.status(500).json({ error: "Unknown server error" });
    }
}

export async function deleteAlert(req: Request, res: Response) {}
