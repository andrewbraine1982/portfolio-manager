export const revalidate = 300;

const financeTerms = [
  "stock", "stocks", "market", "markets", "fed", "rates", "inflation",
  "bond", "bonds", "treasury", "oil", "gold", "bitcoin", "crypto",
  "earnings", "investors", "economy", "economic", "bank", "banks",
  "dollar", "nasdaq", "dow", "s&p", "ftse", "shares", "equities",
  "recession", "yield", "yields", "central bank", "ecb", "federal reserve"
];

export async function GET() {
  const token = process.env.FINNHUB_API_KEY;

  const res = await fetch(
    `https://finnhub.io/api/v1/news?category=general&token=${token}`,
    { next: { revalidate: 300 } }
  );

  const data = await res.json();

  const articles = data
    .filter((item: any) => {
      const text = `${item.headline || ""} ${item.summary || ""}`.toLowerCase();

      return (
        item.headline &&
        item.image &&
        item.url &&
        financeTerms.some((term) => text.includes(term))
      );
    })
    .slice(0, 12)
    .map((item: any) => ({
      title: item.headline,
      summary: item.summary,
      image: item.image,
      source: item.source,
      url: item.url,
    }));

  return Response.json({ articles });
}
