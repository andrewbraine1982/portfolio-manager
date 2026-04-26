import Image from "next/image";
import {
  featuredArticle,
  latestArticles,
  leadArticle,
  markets,
  mostRead
} from "@/lib/articles";

export default function Home() {
  return (
    <main className="site-shell">
      <header>
        <div className="topbar">
          <div className="topbar-inner">
            <span>Institutional Financial News & Analysis</span>
          </div>
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
        <div className="market-tape-inner">
          {markets.map(([name, value, change]) => (
            <span key={name}>
              <b>{name}</b> {value}{" "}
              <em className={change.startsWith("+") ? "up" : "down"}>
                {change}
              </em>
            </span>
          ))}
        </div>
      </section>

      <div className="container">
        <section className="hero-grid">
          <div>
            <article className="lead-story">
              <Image
                src={leadArticle.image}
                alt={leadArticle.title}
                width={1200}
                height={760}
                className="hero-image"
                priority
              />

              <div className="lead-copy">
                <p className="kicker">{leadArticle.category}</p>
                <h2>{leadArticle.title}</h2>
                <p className="summary">{leadArticle.summary}</p>
                <p className="byline">
                  By {leadArticle.author} <span>·</span> {leadArticle.time}
                </p>
              </div>
            </article>

            <section className="content-split">
              <div>
                <h3 className="section-label">Latest Briefings</h3>
                <div className="latest-list">
                  {latestArticles.map((article) => (
                    <article className="latest-item" key={article.title}>
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={420}
                        height={260}
                        className="article-image"
                      />
                      <div>
                        <h4>{article.title}</h4>
                        <p>{article.summary}</p>
                        <p className="byline">
                          By {article.author} <span>·</span> {article.time}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <article className="featured">
                <h3 className="section-label">{featuredArticle.category}</h3>
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  width={900}
                  height={560}
                  className="analysis-image"
                />
                <h4>{featuredArticle.title}</h4>
                <p>{featuredArticle.summary}</p>
                <p className="byline">
                  By {featuredArticle.author} <span>·</span>{" "}
                  {featuredArticle.time}
                </p>
              </article>
            </section>
          </div>

          <aside className="right-rail">
            <section className="most-read">
              <h3 className="section-label">Most Read</h3>
              {mostRead.map((item, index) => (
                <article className="most-row" key={item.title}>
                  <span>{index + 1}</span>
                  <h4>{item.title}</h4>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={180}
                    height={110}
                    className="most-image"
                  />
                </article>
              ))}
            </section>

            <section className="snapshot">
              <h3 className="section-label">Market Snapshot</h3>
              {markets.slice(0, 5).map(([name, value, change]) => (
                <div className="snapshot-row" key={name}>
                  <b>{name}</b>
                  <span>{value}</span>
                  <em className={change.startsWith("+") ? "up" : "down"}>
                    {change}
                  </em>
                </div>
              ))}
            </section>

            <section className="newsletter">
              <h3 className="section-label">Stay Informed</h3>
              <p>Get the latest news and analysis in your inbox.</p>
              <form>
                <input placeholder="Enter your email" />
                <button type="button">Subscribe</button>
              </form>
            </section>
          </aside>
        </section>

        <section className="opinion-strip">
          <h3 className="section-label">Opinion</h3>
          <div className="opinion-grid">
            <article>
              <h4>The Fed's patience may prove costly</h4>
              <p>Policy uncertainty is becoming a portfolio construction problem.</p>
            </article>
            <article>
              <h4>The AI investment boom: sustainable or speculative?</h4>
              <p>Capital intensity is now central to the technology trade.</p>
            </article>
            <article>
              <h4>Emerging markets require a selective approach</h4>
              <p>Currency risk and policy divergence are separating winners from losers.</p>
            </article>
          </div>
        </section>
      </div>

      <footer>
        <div className="footer-inner">
          <span>© 2026 Portfolio Manager</span>
          <span>Markets · Economy · Companies · Opinion · Portfolio Strategy</span>
        </div>
      </footer>
    </main>
  );
}
