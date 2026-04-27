import { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    title?: string;
    summary?: string;
    source?: string;
    image?: string;
    date?: string;
  }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const title =
    resolvedSearchParams.title ||
    resolvedParams.slug.replace(/-/g, " ");

  const description =
    resolvedSearchParams.summary ||
    "Latest financial news and market analysis.";

  return {
    title: `${title} | Portfolio Manager`,
    description,
  };
}

export default async function ArticlePage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const title =
    resolvedSearchParams.title ||
    resolvedParams.slug.replace(/-/g, " ");

  const source = resolvedSearchParams.source || "Portfolio Manager";
  const image = resolvedSearchParams.image || "";
  const summary = resolvedSearchParams.summary || "";
  const date = resolvedSearchParams.date;

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

      <p style={{ marginTop: "20px", color: "#666" }}>
        {source}
      </p>
    </main>
  );
}
