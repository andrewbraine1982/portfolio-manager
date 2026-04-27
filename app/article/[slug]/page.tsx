"use client";

import { useSearchParams } from "next/navigation";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();

  const title =
    searchParams.get("title") ||
    params.slug.replace(/-/g, " ");

  const source = searchParams.get("source") || "Portfolio Manager";
  const image = searchParams.get("image") || "";
  const summary = searchParams.get("summary") || "";
  const date = searchParams.get("date");

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
