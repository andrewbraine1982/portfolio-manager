export const revalidate = 300;

const keywords = [
  "market",
  "stock",
  "economy",
  "inflation",
  "interest",
  "fed",
  "central bank",
  "oil",
  "crypto",
  "bitcoin",
  "earnings",
  "recession",
  "bond",
  "treasury",
  "forex",
];
function getFallbackImage(text: string) {
  if (text.includes("oil") || text.includes("energy")) {
    return "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1200";
  }

  if (text.includes("bitcoin") || text.includes("crypto")) {
    return "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200";
  }

  if (text.includes("stock") || text.includes("s&p") || text.includes("dow")) {
    return "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200";
  }

  if (text.includes("fed") || text.includes("rates") || text.includes("bank")) {
    return "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=1200";
  }

  if (text.includes("china") || text.includes("trade")) {
    return "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200";
  }

  return "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1200";
}
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
        keywords.some((word) => text.includes(word))
      );
    })
    .slice(0, 12)
  .map((item: any) => {
  const title = item.headline || "";
  const text = title.toLowerCase();

  const image =
    item.image && !item.image.includes("logo")
      ? item.image
      : getFallbackImage(text);

  return {
    title,
    summary: item.summary,
    image,
    source: item.source,
    url: item.url,
  };
});

  return Response.json({ articles });
}
