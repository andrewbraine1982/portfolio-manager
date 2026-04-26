export const revalidate = 60;

const symbols = [
  { label: "S&P 500", symbol: "^GSPC" },
  { label: "NASDAQ", symbol: "^IXIC" },
  { label: "DOW", symbol: "^DJI" },
  { label: "FTSE 100", symbol: "^FTSE" },
  { label: "GOLD", symbol: "GC=F" },
  { label: "OIL", symbol: "CL=F" },
  { label: "BTC/USD", symbol: "BTC-USD" },
];

export async function GET() {
  const markets = await Promise.all(
    symbols.map(async (item) => {
      try {
        const res = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(item.symbol)}`,
          { next: { revalidate: 60 } }
        );

        const data = await res.json();
        const result = data?.chart?.result?.[0];

        const price = result?.meta?.regularMarketPrice || 0;
        const previousClose =
          result?.meta?.chartPreviousClose ||
          result?.meta?.previousClose ||
          price;

        const change = previousClose
          ? ((price - previousClose) / previousClose) * 100
          : 0;

        return {
          symbol: item.label,
          price,
          change,
        };
      } catch {
        return {
          symbol: item.label,
          price: 0,
          change: 0,
        };
      }
    })
  );

  return Response.json({ markets });
}
