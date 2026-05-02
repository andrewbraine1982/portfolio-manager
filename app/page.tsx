"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  summary?: string;
  image?: string;
  source?: string;
  url?: string;
  date?: string | null;
};
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function makeSeoTitle(title: string) {
  const lower = title.toLowerCase();

  if (lower.includes("stock market")) {
    return "What to watch in the stock market today";
  }

  if (lower.includes("hormuz")) {
    return "Why shipping traffic through the Strait of Hormuz is low right now";
  }

  if (lower.includes("landlords") || lower.includes("apartments")) {
    return "Why landlords are offering concessions right now";
  }

  if (lower.includes("fed") || lower.includes("interest rates")) {
    return "What the latest Fed decision means for markets";
  }

  if (lower.includes("oil")) {
    return "Why oil prices are moving today";
  }

  return title;
}

type Market = {
  symbol: string;
  price: number;
  change: number;
};

const fallbackArticles: Article[] = [
  {
    title: "Fed signals higher for longer as inflation progress stalls",
    summary: "Markets reassess rate expectations as investors digest central bank guidance.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    source: "Portfolio Manager",
    url: "#",
  },
];

function label(symbol: string) {
  const labels: Record<string, string> = {
    "^DJI": "DOW",
    "^FTSE": "FTSE 100",
    BTCUSD: "BTC/USD",
  };
  return labels[symbol] || symbol;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>(fallbackArticles);
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [newsRes, marketRes] = await Promise.all([
          fetch("/api/feed"),
          fetch("/api/markets"),
        ]);

        const newsData = await newsRes.json();
        const marketData = await marketRes.json();

setArticles(newsData.articles?.length ? newsData.articles : fallbackArticles);
        if (marketData.markets?.length) setMarkets(marketData.markets);
      } catch (err) {
        console.error("Live data failed", err);
      }
    }

    loadData();
    const timer = setInterval(loadData, 60000);
    return () => clearInterval(timer);
  }, []);

  const lead = articles[0] || fallbackArticles[0];
 const latest = articles.slice(1, 7);
const more = articles.slice(7, 20);

  return (
    <main className="site-shell">
      <header>
        <div className="topbar">
          <div className="topbar-inner">Institutional Financial News & Analysis</div>
        </div>
<div style={{
 borderTop: "1px solid #ddd",
borderBottom: "1px solid #ddd",
  padding: "12px 0",
  marginBottom: "20px",
  fontFamily: "Georgia, serif",
  fontSize: "14px",
  display: "flex",
  gap: "20px",
  justifyContent: "center"
}}>
  {["Markets", "Economy", "Companies", "Tech", "Politics"].map((cat) => (
    <a
      key={cat}
      href={`/category/${cat.toLowerCase()}`}
      style={{
        textDecoration: "none",
        color: "#333",
        fontWeight: 500
      }}
    >
      {cat}
    </a>
  ))}
</div>
        <section className="masthead">
          <div className="logo-mark">PM</div>
          <h1 className="logo-title">Portfolio Manager</h1>
          <p className="logo-subtitle">News · Analysis · Insight</p>
        </section>
{/* HERO */}
<div
  style={{
    position: "relative",
    width: "100%",
    height: "520px",
    marginBottom: "40px",
    overflow: "hidden",
  }}
>
  {/* Background Image */}
  <img
    src="/hong-kong-hero.jpg"
    alt="Hong Kong skyline"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />

  {/* Gradient Overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
"linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.2), transparent)"        
    }}
  />

  {/* Text Content */}
  <div
    style={{
      position: "absolute",
      bottom: "60px",
      left: "40px",
      color: "white",
      maxWidth: "700px",
    }}
  >
    <p
      style={{
        textTransform: "uppercase",
        letterSpacing: "3px",
        fontSize: "12px",
        fontWeight: 700,
        marginBottom: "12px",
        opacity: 0.9,
      }}
    >
      Portfolio Manager
    </p>

    <h1
      style={{
        fontFamily: "Georgia, serif",
        fontSize: "56px",
        lineHeight: "1.1",
        marginBottom: "16px",
      }}
    >
      Global Markets Intelligence
    </h1>

    <p
      style={{
        fontSize: "18px",
        opacity: 0.9,
      }}
    >
      Real-time financial news and curated insights for modern investors
    </p>
  </div>
</div>
</div>   // line 211

<section>
  ...EMAIL BOX...
</section>

</header>        
  

      <section className="market-tape">
        <div className="ticker-track">
          {[...markets, ...markets].map((m, i) => (
            <span key={`${m.symbol}-${i}`}>
              <b>{label(m.symbol)}</b>{" "}
              {m.price ? m.price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—"}{" "}
              <em className={m.change >= 0 ? "up" : "down"}>
                {m.change >= 0 ? "+" : ""}
                {m.change?.toFixed?.(2) ?? "0.00"}%
              </em>
            </span>
          ))}
        </div>
      </section>

      <div className="container">
        <section className="hero-grid">
          <div>
<a
  href={`/article/${slugify(lead.title)}?title=${encodeURIComponent(lead.title)}&summary=${encodeURIComponent(lead.summary || "")}&source=${encodeURIComponent(lead.source || "Financial News")}&image=${encodeURIComponent(lead.image || "/fallback.jpg")}`}
>
  <article className="lead-story">
    <img
      className="hero-image"
      src={lead.image || "/fallback.jpg"}
      alt={lead.title}
      onError={(e) => {
        e.currentTarget.src = "/fallback.jpg";
      }}
    />

    <div className="lead-copy">
      <p className="kicker">Top Story</p>
      <h2>{makeSeoTitle(lead.title)}</h2>
      <p className="byline">{lead.source || "Financial News"}</p>
    </div>
  </article>
</a>

            <section className="content-split">
              <div>
                <h3 className="section-label">Latest Briefings</h3>
                <div className="latest-list">
                  {latest.slice(0, 4).map((article) => (
<a
  className="latest-item"
  key={article.title}
 href={`/article/${slugify(article.title)}?title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.summary || "")}&source=${encodeURIComponent(article.source || "")}&image=${encodeURIComponent(article.image || "/fallback.jpg")}`}
>
<img className="article-image" src={article.image || "/fallback.jpg"} alt={article.title} onError={(e) => { e.currentTarget.src = "/fallback.jpg"; }} />
                      <div>
      <h4>{makeSeoTitle(article.title)}</h4>
                        <p>{article.summary}</p>
                        <p className="byline">{article.source}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

<a href={`/article/${slugify(latest[4]?.title || "markets")}?title=${encodeURIComponent(latest[4]?.title || "Markets continue to digest global rate expectations")}&summary=${encodeURIComponent(latest[4]?.summary || "Investors are watching inflation, rates and risk appetite.")}&source=${encodeURIComponent(latest[4]?.source || "Portfolio Manager")}&image=${encodeURIComponent(latest[4]?.image || "")}`}>
  <article className="featured">
    <h3 className="section-label">Featured Analysis</h3>

    {latest[4]?.image && (
      <img
        className="analysis-image"
        src={latest[4].image}
        alt={latest[4].title}
      />
    )}

 <h4>
  {makeSeoTitle(latest[4]?.title || "Markets continue to digest global rate expectations")}
</h4>

    <p>
      {latest[4]?.summary ||
        "Investors are watching inflation, rates and risk appetite."}
    </p>

    <p className="byline">
      {latest[4]?.source || "Portfolio Manager"}
    </p>
  </article>
</a>             
            </section>
          </div>
<section style={{
  maxWidth: "1200px",
  margin: "60px auto",
  padding: "0 20px"
}}>
  <h3 style={{
    fontFamily: "Georgia, serif",
    fontSize: "18px",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px"
  }}>
    More Stories
  </h3>

  <div style={{
    display: "flex",
   flexDirection: "column",
  gap: "10px"
  }}>
    {more.map((article) => (
<a
  key={article.title}
href={`/article/${slugify(article.title)}?title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.summary || "")}&source=${encodeURIComponent(article.source || "")}&image=${encodeURIComponent(article.image || "")}`}
  style={{
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    textDecoration: "none",     

color: "inherit"
      }}>
      <img
  src={article.image}
  alt={article.title}
onError={(e) => {
  e.currentTarget.style.display = "none";
}}

style={{
    width: "110px",
    height: "75px",
    objectFit: "cover",
    flexShrink: 0
  }}
/>
 
 
 
   
   
    
    
 

         
        
        
       
           
           
            
          
        

        <h4 style={{
          fontSize: "14px",
          lineHeight: "1.4",
          fontWeight: 600
        }}>
          {article.title}
        </h4>

   
      </a>
    ))}
  </div>
</section>
<aside className="right-rail">
  <section className="most-read">
    <h3 className="section-label">Most Read</h3>
    {articles.slice(0, 5).map((item, index) => (
      <a
        className="most-row"
        href={`/article/${slugify(item.title)}?title=${encodeURIComponent(item.title)}&summary=${encodeURIComponent(item.summary || "")}&source=${encodeURIComponent(item.source || "")}&image=${encodeURIComponent(item.image || "")}`}
        key={item.title}
      >
        <span>{index + 1}</span>
        <h4>{makeSeoTitle(item.title)}</h4>
        {item.image && (
          <img className="most-image" src={item.image} alt={item.title} />
        )}
      </a>
    ))}
  </section>

            <section className="snapshot">
              <h3 className="section-label">Market Snapshot</h3>
              {markets.map((m) => (
                <div className="snapshot-row" key={m.symbol}>
                  <b>{label(m.symbol)}</b>
                  <span>{m.price ? m.price.toFixed(2) : "—"}</span>
                  <em className={m.change >= 0 ? "up" : "down"}>
                    {m.change >= 0 ? "+" : ""}
                    {m.change?.toFixed?.(2) ?? "0.00"}%
                  </em>
                </div>
              ))}
            </section>

            <section className="newsletter">
              <h3 className="section-label">Stay Informed</h3>
              <p>Get the latest markets news and analysis in your inbox.</p>
              <form>
                <input placeholder="Enter your email" />
                <button type="button">Subscribe</button>
              </form>
            </section>
          </aside>
        </section>
      </div>

      <style jsx>{`
        .ticker-track {
          display: flex;
          gap: 38px;
          white-space: nowrap;
          animation: ticker 35s linear infinite;
          padding: 13px 24px;
        }

        .ticker-track span {
          font-size: 13px;
          flex: 0 0 auto;
        }

        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
  `}</style>
<footer style={{
  marginTop: "60px",
  padding: "50px 20px",
  borderTop: "1px solid #e5e5e5",
  background: "#faf9f7",
  fontSize: "13px",
  color: "#555"
}}>

  <div style={{
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "40px"
  }}>
    
    {/* LOGO + DESCRIPTION */}
    <div>
      <div style={{
        width: "42px",
        height: "42px",
        border: "1px solid #111",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, serif",
        fontSize: "18px",
        fontWeight: 600,
        color: "#111",
        marginBottom: "12px"
      }}>
        PM
      </div>

      <div style={{ color: "#777", lineHeight: "1.6" }}>
        Real-time markets, curated financial news, and actionable insights.
      </div>
    </div>

    {/* MARKETS */}
    <div>
      <strong>Markets</strong>
      <div>S&P 500</div>
      <div>NASDAQ</div>
      <div>Commodities</div>
      <div>Crypto</div>
    </div>

    {/* NEWS */}
    <div>
      <strong>News</strong>
      <div>Latest Briefings</div>
      <div>Global Economy</div>
      <div>Central Banks</div>
    </div>

    {/* COMPANY */}
    <div>
      <strong>Company</strong>
      <div>About</div>
      <div>Contact</div>
      <div>Careers</div>
    </div>

  </div>

  <div style={{
    marginTop: "40px",
    textAlign: "center",
    fontSize: "12px",
    color: "#888"
  }}>
    © {new Date().getFullYear()} Portfolio Manager
  </div>
</footer>
    </main>
  );
}
