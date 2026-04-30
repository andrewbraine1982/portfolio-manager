import { Metadata } from "next";
import { unstable_cache } from "next/cache";
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
const getAIAnalysis = unstable_cache(
  async (title: string, summary: string, source: string) => {
    if (!process.env.OPENAI_API_KEY) return null;

    try {
      const res = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
input: `You are a senior institutional portfolio strategist writing for professional investors.

Do NOT summarise or paraphrase the article. Interpret it.

Article title: ${title}
Article summary: ${summary}
Source: ${source}

Write two original analysis blocks:

1. portfolioView:
Explain what this could mean for asset allocation, sector exposure, risk appetite, rates, credit, commodities, geopolitics, or earnings expectations.

2. whyItMatters:
Explain the second-order market implication. What should a portfolio manager watch next?

Rules:
- Do not repeat the headline.
- Do not repeat the summary.
- No generic phrases.
- No "this story is relevant".
- Be specific.
- If the article is political/geopolitical, connect it to markets, sectors, commodities, sanctions, fiscal policy, or risk premium.
- If there is not enough information, make a cautious but useful market interpretation.

Return ONLY valid JSON:
{
  "portfolioView": "...",
  "whyItMatters": "..."
}


Each field must be 1–2 sentences max. Make it specific to the story.`,



        }),
      });

      const data = await res.json();
      const text = data.output_text || "";
      return JSON.parse(text);
    } catch {
      return null;
    }
  },
  ["article-ai-analysis"],
  { revalidate: 86400 }
);
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
const aiAnalysis = await getAIAnalysis(title, summary, source);
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
{aiAnalysis?.portfolioView || summary}
</p>       
     
      </section>

      <section style={{ borderTop: "1px solid #d6cbbb", paddingTop: "24px", marginTop: "30px" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "30px" }}>
          Why it matters
        </h2>

        <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#333" }}>
          {aiAnalysis?.whyItMatters}
        
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
 
}
