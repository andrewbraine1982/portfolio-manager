import { MetadataRoute } from "next";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.portfoliomanager.co.uk";

  const res = await fetch("https://www.portfoliomanager.co.uk/api/feed");
  const data = await res.json();

  const articles = data.articles || data || [];

  const articleUrls = articles.map((article: any) => ({
    url: `${baseUrl}/article/${slugify(article.title)}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...articleUrls,
  ];
}
