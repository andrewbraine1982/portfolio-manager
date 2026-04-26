export const revalidate = 60;

const symbols = [
  { label: "S&P 500", symbol: "SPY" },
  { label: "NASDAQ", symbol: "QQQ" },
  { label: "DOW", symbol: "DIA" },
  { label: "FTSE 100", symbol: "ISF.L" },
  { label: "GOLD", symbol: "GLD" },
  { label: "OIL", symbol: "USO" },
  { label: "BTC/USD", symbol: "BINANCE:BTCUSDT" },
];

export async function GET() {
  const token = process.env.FINNHUB_API_KEY;

  const markets = await Promise.all(
    symbols.map(async (item) => {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(item.symbol)}&token=${token}`,
        { next: { revalidate: 60 } }
      );

      const data = await res.json();

      return {
        symbol: item.label,
        price: data.c || 0,
        change: data.dp || 0,
      };
    })
  );

 return Response.json({ markets });
}
