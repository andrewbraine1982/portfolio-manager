1  import { Metadata } from "next";

2  type PageProps = {
3    params: { slug: string };
4    searchParams: {
5      title?: string;
6      summary?: string;
7      source?: string;
8      image?: string;
9      date?: string;
10   };
11 };

12 export function generateMetadata({
13   params,
14   searchParams,
15 }: PageProps): Metadata {
16   const title =
17     searchParams.title || params.slug.replace(/-/g, " ");

18   const description =
19     searchParams.summary ||
20     "Latest financial news and market analysis.";

21   return {
22     title: `${title} | Portfolio Manager`,
23     description,
24   };
25 }

26 export default function ArticlePage({
27   params,
28   searchParams,
29 }: PageProps) {
30   const title =
31     searchParams.title || params.slug.replace(/-/g, " ");

32   const source = searchParams.source || "Portfolio Manager";
33   const image = searchParams.image || "";
34   const summary = searchParams.summary || "";
35   const date = searchParams.date;

36   return (
37     <main style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
38       <h1>{title}</h1>

39       {date && <p>{new Date(date).toLocaleDateString()}</p>}

40       {image && (
41         <img
42           src={image}
43           alt={title}
44           style={{ width: "100%", margin: "20px 0" }}
45         />
46       )}

47       <p>{summary}</p>

48       <p style={{ marginTop: "20px", color: "#666" }}>{source}</p>
49     </main>
50   );
51 }
