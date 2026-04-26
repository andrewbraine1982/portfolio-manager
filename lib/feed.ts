import Parser from "rss-parser";

const parser = new Parser();

export const rssFeeds = [
  "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",
  "https://www.investing.com/rss/news.rss",
  "https://feeds.marketwatch.com/marketwatch/topstories/"
];

export async function getExternalFeed() {
  const feeds = await Promise.allSettled(
    rssFeeds.map(async (url) => {
      const feed = await parser.parseURL(url);
      return (feed.items || []).slice(0, 8).map((item) => ({
        title: item.title || "Untitled",
        link: item.link || "#",
        source: feed.title || "External Source",
        date: item.pubDate || "",
        summary: item.contentSnippet || item.content || ""
      }));
    })
  );

  return feeds
    .filter((result) => result.status === "fulfilled")
    .flatMap((result: any) => result.value)
    .slice(0, 20);
}
