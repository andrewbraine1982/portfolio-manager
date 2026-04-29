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
<div
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "40px",
  }}
>
  {/* LEFT COLUMN */}
  <div>
    {/* HERO ARTICLE */}
    {filtered[0] && (
      <a
        href={`/article/${slugify(filtered[0].title)}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {filtered[0].image && (
          <img
            src={filtered[0].image}
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />
        )}

        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "36px",
            lineHeight: "1.2",
            marginBottom: "12px",
          }}
        >
          {filtered[0].title}
        </h2>

        <p style={{ fontSize: "18px", color: "#444" }}>
          {filtered[0].summary}
        </p>
      </a>
    )}

    {/* ARTICLE LIST */}
    <div style={{ marginTop: "40px" }}>
      {filtered.slice(1).map((article: any) => (
        <a
          key={article.title}
          href={`/article/${slugify(article.title)}`}
          style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr",
            gap: "20px",
            paddingBottom: "24px",
            marginBottom: "24px",
            borderBottom: "1px solid #ddd",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {article.image && (
            <img
              src={article.image}
              style={{
                width: "160px",
                height: "100px",
                objectFit: "cover",
              }}
            />
          )}

          <div>
            <h3
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "22px",
                marginBottom: "8px",
              }}
            >
              {article.title}
            </h3>

            <p style={{ fontSize: "15px", color: "#555" }}>
              {article.summary}
            </p>

            <p
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginTop: "6px",
              }}
            >
              {article.source || "Portfolio Manager"}
            </p>
          </div>
        </a>
      ))}
    </div>
  </div>

  {/* RIGHT COLUMN */}
  <div>
    <h3
      style={{
        borderTop: "3px solid black",
        paddingTop: "10px",
        marginBottom: "20px",
      }}
    >
      Most Read
    </h3>

    {filtered.slice(0, 5).map((article: any, i: number) => (
      <div
        key={article.title}
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>{i + 1}</span>

        <a
          href={`/article/${slugify(article.title)}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {article.title}
        </a>
      </div>
    ))}
  </div>
</div>

    </section>
  </main>
);
}
