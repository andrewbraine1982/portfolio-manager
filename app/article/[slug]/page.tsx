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
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ MISSING OPENAI_API_KEY");
      return null;
    }

    try {
      const res = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", 
max_output_tokens: 3500,          
text: {
  format: {
    type: "json_object"
  }
},
input: `You are a senior financial journalist writing in the style of the Financial Times.

Write a complete, original, publication-ready financial article from the information provided.

Article title: ${title}

Source: ${source}

Summary: ${summary}

Return ONLY valid JSON in this exact shape:
{
  "headline": "...",
  "standfirst": "...",
  "articleBody": "...",
  "marketImplication": "..."
}`,


        }),
      });

      const data = await res.json();
      console.log("FULL OPENAI RESPONSE:", JSON.stringify(data));

      const text =
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "";

      console.log("RAW OPENAI TEXT:", text);

      if (!text) {
  console.error("❌ EMPTY AI RESPONSE");
  return null;
}

      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

try {
  return JSON.parse(cleaned);
} catch (e) {
  console.error("❌ JSON PARSE FAILED:", cleaned);
  return null;
}
    } catch (err) {
      console.error("❌ OPENAI ERROR:", err);
      return null;
    }
  },
  ["full-ai-article"],
  { revalidate: 1 }
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
  console.log("🔥 CALLING AI ANALYSIS");
const aiAnalysis = await getAIAnalysis(title, summary, source);
  console.log("🧠 AI RESULT:", aiAnalysis);
return (
  <main style={{ background: "#f4efe6", minHeight: "100vh", padding: "60px 24px" }}>
    <article style={{ maxWidth: "900px", margin: "0 auto" }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "3px", fontSize: "12px", fontWeight: 700 }}>
        {source}
      </p>

      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "52px", lineHeight: "1.1", marginBottom: "24px" }}>
    {aiAnalysis?.headline || title}
      </h1>

      {image && (
        <img
          src={image}
        alt={aiAnalysis?.headline || title}
          style={{ width: "100%", maxHeight: "460px", objectFit: "cover", marginBottom: "28px" }}
        />
      )}

      <p style={{ fontSize: "21px", lineHeight: "1.6", color: "#333", marginBottom: "36px" }}>
        {summary}
      </p>

      {aiAnalysis?.standfirst && (
        <p style={{ fontSize: "24px", lineHeight: "1.5", color: "#222", marginBottom: "36px", fontWeight: 500 }}>
          {aiAnalysis.standfirst}
        </p>
      )}

      <section style={{ borderTop: "3px solid #111", paddingTop: "28px", marginTop: "30px" }}>
        {(aiAnalysis?.articleBody || summary)
          .split("\n\n")
          .map((paragraph: string, index: number) => (
            <p
              key={index}
              style={{ fontSize: "19px", lineHeight: "1.8", color: "#222", marginBottom: "24px" }}
            >
              {paragraph}
            </p>
          ))}
      </section>

      <section style={{ borderTop: "1px solid #d6cbbb", paddingTop: "24px", marginTop: "36px" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "30px" }}>
          Market implication
        </h2>

        <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#333" }}>
          {aiAnalysis?.marketImplication}
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
