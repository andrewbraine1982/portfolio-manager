import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { title?: string; summary?: string };
}): Promise<Metadata> {
  const title = searchParams.title || "Article";
  const description = searchParams.summary || "Latest financial news and analysis";

  return {
    title: `${title} | Portfolio Manager`,
    description,
  };
}



export default function ArticlePage({ params }: { params: { slug: string } }) {
 

  const title = params.slug.replace(/-/g, " ");

const source = "Portfolio Manager";
const image = "";
const summary = "";
const date = null;

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>

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
