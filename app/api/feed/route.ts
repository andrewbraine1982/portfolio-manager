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
  const fallbackImages = [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1642790551116-18e150f248e1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?auto=format&fit=crop&w=1200&q=80"
  ];

  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % fallbackImages.length;

  return fallbackImages[index];
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
    
        item.url &&
        keywords.some((word) => text.includes(word))
      );
    })
    .slice(0, 12)
  .map((item: any) => {
  const title = item.headline || "";
  const text = title.toLowerCase();

  const isBadImage =
  !item.image ||
  !item.image.startsWith("http") ||
  item.image.includes("logo") ||
  item.image.includes("finnhub") ||
  item.image.includes("static2") ||
  item.image.includes("google.com/rss");

const image = isBadImage ? getFallbackImage(text) : item.image;

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
