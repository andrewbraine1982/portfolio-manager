"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ArticleContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "Article";
  const source = searchParams.get("source") || "Portfolio Manager";
  const image = searchParams.get("image") || "";
  const summary = searchParams.get("summary") || "";
const url = searchParams.get("url");
const date = searchParams.get("date");
  return (
    <main style={{
      background: "#f4efe6",
      minHeight: "100vh",
      padding: "60px 20px",
      color: "#111"
    }}>
      <article style={{
        maxWidth: "860px",
        margin: "0 auto"
      }}>
        <p style={{
          textTransform: "uppercase",
          letterSpacing: "3px",
          fontSize: "12px",
          fontWeight: 700,
          marginBottom: "20px"
        }}>
          {source}
        </p>

        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: "56px",
          lineHeight: "1.05",
          marginBottom: "28px"
        }}>
          {title}
        </h1>
{date && (
  <p style={{ marginTop: "10px", color: "#666" }}>
    {new Date(date).toLocaleDateString()}
  </p>
)}
        {image && (
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              maxHeight: "460px",
              objectFit: "cover",
              marginBottom: "28px"
            }}
          />
        )}

        {summary && (
          <p style={{
            fontSize: "21px",
            lineHeight: "1.6",
            color: "#444"
          }}>
            {summary}
          </p>
        )}
{url && (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      marginTop: "30px",
      padding: "12px 18px",
      border: "1px solid #111",
      color: "#111",
      textDecoration: "none",
      fontWeight: 700,
    }}
  >
    Read full story
  </a>
)}
</article>
    </main>
  );
}

export default function ArticlePage() {
  return (
    <Suspense fallback={null}>
      <ArticleContent />
    </Suspense>
  );
}
