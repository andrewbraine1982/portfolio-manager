export const revalidate = 60;

export async function GET() {
  const token = process.env.FINNHUB_API_KEY;

  const symbols = [
    "^DJI",      // Dow Jones
    "^FTSE",     // FTSE 100
    "BTCUSD"     // Bitcoin
  ];

  const results = await Promise.all(
    symbols.map(async (symbol) => {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`
      );
      const data = await res.json();

      return {
        symbol,
        price: data.c,
        change: data.dp
      };
    })
  );

  return Response.json({ markets: results });
}
