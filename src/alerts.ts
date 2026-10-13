import { Request, Response } from "express";

type symbols = "XAUUSD" | "NAS100" | "XAGUSD" | "SPX500";

type pair = {
  symbol: symbols;
  price: number;
};

const alerts: Partial<Record<symbols, number>> = {};
alerts.NAS100 = 30000;
alerts.XAUUSD = 4100;
alerts.SPX500 = 8000;
alerts.XAGUSD = 80;

export default async function priceAlert(req: Request, res: Response) {
  switch (req.method) {
    case "GET":
      res.status(200).send(JSON.stringify(alerts));
    case "POST":
      try {
        const body: pair = req.body;
        console.log("Pair:", body);
        switch (body.symbol) {
          case "XAUUSD":
            alerts.XAUUSD = body.price;
            res.status(201).json({ status: `created alert for ${body.price}` });
          case "NAS100":
            alerts.NAS100 = body.price;
            res.status(201).json({ status: `created alert for ${body.price}` });
          case "XAGUSD":
            alerts.XAGUSD = body.price;
            res.status(201).json({ status: `created alert for ${body.price}` });
          case "SPX500":
            alerts.SPX500 = body.price;
            res.status(201).json({ status: `created alert for ${body.price}` });
          default:
            console.log("Could not find symbol");
            res.status(500).json({ error: "Could not find requested symbol" });
        }
      } catch (e) {
        console.log("There was an error:", e);
        res.status(500).json({ error: "Unknown server error" });
      }
  }
}
