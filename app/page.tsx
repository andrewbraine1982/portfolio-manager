"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  summary?: string;
  image?: string;
  source?: string;
  url?: string;
};

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

        if (newsData.articles?.length) setArticles(newsData.articles);
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

  return (
    <main className="site-shell">
      <header>
        <div className="topbar">
          <div className="topbar-inner">Institutional Financial News & Analysis</div>
        </div>

        <section className="masthead">
          <div className="logo-mark">PM</div>
          <h1 className="logo-title">Portfolio Manager</h1>
          <p className="logo-subtitle">News · Analysis · Insight</p>
        </section>

        <nav className="nav-wrap">
          <div className="nav">
            <a>Markets</a>
            <a>Economy</a>
            <a>Companies</a>
            <a>Technology</a>
            <a>Policy</a>
            <a>International</a>
            <a>Opinion</a>
            <a>Portfolio Strategy</a>
          </div>
        </nav>
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
            <article className="lead-story">
              <img className="hero-image" src={lead.image} alt={lead.title} />

              <div className="lead-copy">
                <p className="kicker">Top Story</p>
                <h2>{lead.title}</h2>
                <p className="summary">{lead.summary}</p>
                <p className="byline">{lead.source || "Financial News"}</p>
              </div>
            </article>

            <section className="content-split">
              <div>
                <h3 className="section-label">Latest Briefings</h3>
                <div className="latest-list">
                  {latest.slice(0, 4).map((article) => (
                    <a className="latest-item" key={article.title} href={article.url} target="_blank">
                      <img className="article-image" src={article.image} alt={article.title} />
                      <div>
                        <h4>{article.title}</h4>
                        <p>{article.summary}</p>
                        <p className="byline">{article.source}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <article className="featured">
                <h3 className="section-label">Featured Analysis</h3>
                {latest[4]?.image && (
                  <img className="analysis-image" src={latest[4].image} alt={latest[4].title} />
                )}
                <h4>{latest[4]?.title || "Markets continue to digest global rate expectations"}</h4>
                <p>{latest[4]?.summary || "Investors are watching inflation, rates and risk appetite."}</p>
                <p className="byline">{latest[4]?.source || "Portfolio Manager"}</p>
              </article>
            </section>
          </div>

          <aside className="right-rail">
            <section className="most-read">
              <h3 className="section-label">Most Read</h3>
              {articles.slice(0, 5).map((item, index) => (
                <a className="most-row" href={item.url} target="_blank" key={item.title}>
                  <span>{index + 1}</span>
                  <h4>{item.title}</h4>
                  {item.image && <img className="most-image" src={item.image} alt={item.title} />}
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
    </main>
  );
}
