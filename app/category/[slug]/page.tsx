type PageProps = {
  params: Promise<{ slug: string }>;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function getArticles() {
  const res = await fetch("https://www.portfoliomanager.co.uk/api/feed", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.articles || data || [];
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const keyword = resolvedParams.slug.replace(/-/g, " ");

  const articles = await getArticles();

const categoryKeywords: Record<string, string[]> = {
  markets: [
    "market", "markets", "stock", "stocks", "shares", "s&p", "nasdaq",
    "dow", "futures", "bonds", "yield", "trading", "wall street"
  ],

  economy: [
    "economy", "economic", "inflation", "fed", "federal reserve",
    "rates", "interest", "jobs", "employment", "gdp", "recession",
    "growth", "consumer", "spending"
  ],

  companies: [
    "company", "companies", "earnings", "revenue", "profit", "profits",
    "ceo", "business", "corporate", "shares", "stock", "deal",
    "merger", "acquisition"
  ],

  technology: [
    "technology", "tech", "ai", "artificial intelligence", "software",
    "semiconductor", "chip", "chips", "nvidia", "apple", "microsoft",
    "google", "alphabet", "amazon", "meta", "tesla", "openai"
  ],

  policy: [
    "policy", "government", "regulation", "regulator", "tariff",
    "tariffs", "tax", "taxes", "white house", "congress", "law",
    "legal", "court", "election", "president"
  ],

  international: [
    "global", "international", "world", "china", "europe", "uk",
    "britain", "asia", "japan", "india", "iran", "middle east",
    "oil", "shipping", "trade", "geopolitical"
  ],

  opinion: [
    "opinion", "analysis", "commentary", "view", "views", "outlook",
    "explains", "why", "what it means", "column"
  ],

  "portfolio-strategy": [
    "portfolio", "strategy", "investing", "investment", "investor",
    "investors", "allocation", "risk", "dividend", "etf", "fund",
    "funds", "retirement", "wealth", "asset", "assets"
  ],
};

const keywords = categoryKeywords[resolvedParams.slug] || [
  keyword.toLowerCase(),
];

const filtered = articles.filter((article: any) => {
  const text = `${article.title || ""} ${article.summary || ""} ${article.source || ""}`.toLowerCase();

  return keywords.some((word) => text.includes(word));
});

return (
  <main
    style={{
      background: "#f4efe6",
      minHeight: "100vh",
      padding: "60px 24px",
      color: "#111",
    }}
  >
    <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <p
        style={{
          textTransform: "uppercase",
          letterSpacing: "4px",
          fontSize: "12px",
          fontWeight: 700,
          marginBottom: "16px",
        }}
      >
        Portfolio Manager
      </p>

      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "52px",
          textTransform: "capitalize",
          marginBottom: "40px",
        }}
      >
        {keyword}
      </h1>

      {filtered.length === 0 && (
        <p>No articles found for this category yet.</p>
      )}

      <div style={{ display: "grid", gap: "28px" }}>
        {filtered.map((article: any) => (
          <a
            key={article.title}
            href={`/article/${slugify(article.title)}?title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.summary || "")}&source=${encodeURIComponent(article.source || "")}&image=${encodeURIComponent(article.image || "")}`}
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr",
              gap: "24px",
              paddingBottom: "28px",
              borderBottom: "1px solid #d6cbbb",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                style={{
                  width: "180px",
                  height: "110px",
                  objectFit: "cover",
                  background: "#ddd",
                }}
              />
            )}

            <div>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "26px",
                  lineHeight: "1.15",
                  margin: "0 0 12px",
                }}
              >
                {article.title}
              </h2>

              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  margin: "0 0 10px",
                  color: "#444",
                }}
              >
                {article.summary}
              </p>

              <p
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {article.source || "Portfolio Manager"}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  </main>
);
}
