import { notFound } from "next/navigation";

async function getArticles() {
  const res = await fetch("https://www.portfoliomanager.co.uk/api/feed");
  const data = await res.json();
  return data.articles || data;
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const articles = await getArticles();

  const keyword = params.slug.replace("-", " ");

  const filtered = articles.filter((a: any) =>
    a.title.toLowerCase().includes(keyword)
  );

  if (!filtered.length) return notFound();

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textTransform: "capitalize" }}>{keyword}</h1>

      {filtered.map((article: any) => (
        <a
          key={article.title}
          href={`/article/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          style={{ display: "block", marginBottom: "20px" }}
        >
          <h3>{article.title}</h3>
        </a>
      ))}
    </main>
  );
}
