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

        <section style={{ marginTop: "30px", borderTop: "1px solid #ddd", paddingTop: "24px" }}>

  <h2 style={{ fontFamily: "Georgia, serif", fontSize: "24px" }}>
    What Happened
  </h2>
  <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#333" }}>
    {summary}
  </p>

  <h2 style={{ fontFamily: "Georgia, serif", fontSize: "24px", marginTop: "24px" }}>
    Why It Matters
  </h2>
  <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#444" }}>
    This development highlights shifting dynamics across financial markets and may influence investor sentiment, risk appetite and capital allocation decisions.
  </p>

  <h2 style={{ fontFamily: "Georgia, serif", fontSize: "24px", marginTop: "24px" }}>
    Market Implications
  </h2>
  <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#444" }}>
    Movements of this nature can drive volatility across equities, fixed income and commodities, particularly in sectors directly exposed to the underlying theme.
  </p>

  <h2 style={{ fontFamily: "Georgia, serif", fontSize: "24px", marginTop: "24px" }}>
    Portfolio View
  </h2>
  <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#444" }}>
    Portfolio managers should monitor developments closely and consider whether current positioning reflects evolving macro risks and opportunities.
  </p>

</section>
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
