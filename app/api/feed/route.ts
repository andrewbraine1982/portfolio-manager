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

const articles = data
  .filter((item: any) => {
    const text = (item.headline + " " + item.summary).toLowerCase();

    return (
      item.headline &&
      item.image &&
      item.url &&
      keywords.some((word) => text.includes(word))
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
