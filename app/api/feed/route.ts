export const revalidate = 300;

export async function GET() {
  const token = process.env.FINNHUB_API_KEY;

  const res = await fetch(
    `https://finnhub.io/api/v1/news?category=general&token=${token}`,
    { next: { revalidate: 300 } }
  );

  const data = await res.json();

  const articles = data
    .filter((item: any) => item.headline && item.image && item.url)
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
