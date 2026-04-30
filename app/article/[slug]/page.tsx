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
  <main style={{ background: "#f4efe6", minHeight: "100vh", padding: "60px 24px" }}>
    <article style={{ maxWidth: "900px", margin: "0 auto" }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "3px", fontSize: "12px", fontWeight: 700 }}>
        {source}
      </p>

      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "52px", lineHeight: "1.1", marginBottom: "24px" }}>
        {title}
      </h1>

      {image && (
        <img
          src={image}
          alt={title}
          style={{ width: "100%", maxHeight: "460px", objectFit: "cover", marginBottom: "28px" }}
        />
      )}

      <p style={{ fontSize: "21px", lineHeight: "1.6", color: "#333", marginBottom: "36px" }}>
        {summary}
      </p>

      <section style={{ borderTop: "3px solid #111", paddingTop: "24px", marginTop: "30px" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "30px" }}>
          Portfolio View
        </h2>

        <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#333" }}>
          This story may be relevant for investors because it highlights developments that could affect
          market sentiment, sector positioning, company valuations, or broader portfolio risk.
        </p>
      </section>

      <section style={{ borderTop: "1px solid #d6cbbb", paddingTop: "24px", marginTop: "30px" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "30px" }}>
          Why it matters
        </h2>

        <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#333" }}>
          Portfolio managers should consider whether this development changes expectations around
          earnings, interest rates, liquidity, credit conditions, or risk appetite.
        </p>
      </section>

      <p style={{ marginTop: "36px" }}>
        <a
          href="#"
          style={{
            display: "inline-block",
            border: "1px solid #111",
            padding: "12px 18px",
            color: "#111",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Source: {source}
        </a>
      </p>
    </article>
  </main>
);
  );
}
