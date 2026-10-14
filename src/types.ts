export type TickerSymbol = "XAUUSD" | "NAS100" | "XAGUSD" | "SPX500";
export type Direction = "bear" | "bull";

export type TickerAlert = {
    symbol: TickerSymbol;
    direction: Direction;
    alertPrice: number;
};

export type Tick = {
    symbol: TickerSymbol;
    direction: Direction;
    price: number;
};

export type Pair = {
    id: number;
    direction: Direction;
    symbol: TickerSymbol;
    price: number;
};
