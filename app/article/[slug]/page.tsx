import { Metadata } from "next";

type PageProps = {
  params: { slug: string };
  searchParams: {
    title?: string;
    summary?: string;
    source?: string;
    image?: string;
    date?: string;
  };
};

export function generateMetadata({
  params,
  searchParams,
}: PageProps): Metadata {
  const title = searchParams.title || params.slug.replace(/-/g, " ");
  const description =
    searchParams.summary || "Latest financial news and market analysis.";

  return {
    title: `${title} | Portfolio Manager`,
    description,
  };
}

export default function ArticlePage({ params, searchParams }: PageProps) {
  const title = searchParams.title || params.slug.replace(/-/g, " ");
  const source = searchParams.source || "Portfolio Manager";
  const image = searchParams.image || "";
  const summary = searchParams.summary || "";
  const date = searchParams.date;

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{title}</h1>

      {date && <p>{new Date(date).toLocaleDateString()}</p>}

      {image && (
        <img
          src={image}
          alt={title}
          style={{ width: "100%", margin: "20px 0" }}
        />
      )}

      <p>{summary}</p>

      <p style={{ marginTop: "20px", color: "#666" }}>{source}</p>
    </main>
  );
}
