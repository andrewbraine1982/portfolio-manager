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

  const filtered = articles.filter((article: any) => {
    const text = `${article.title || ""} ${article.summary || ""}`.toLowerCase();
    return text.includes(keyword.toLowerCase());
  });

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textTransform: "capitalize" }}>{keyword}</h1>

      {filtered.length === 0 && (
        <p>No articles found for this category yet.</p>
      )}

      {filtered.map((article: any) => (
        <a
          key={article.title}
          href={`/article/${slugify(article.title)}?title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.summary || "")}&source=${encodeURIComponent(article.source || "")}&image=${encodeURIComponent(article.image || "")}`}
          style={{
            display: "block",
            marginBottom: "24px",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
          <p>{article.source}</p>
        </a>
      ))}
    </main>
  );
}
