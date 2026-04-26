# Portfolio Manager

Institutional-style financial news website built with Next.js.

## Included

- Responsive editorial homepage
- Finance-relevant article photography
- Market ticker and market snapshot
- Most Read section
- Featured analysis section
- Newsletter signup layout
- RSS/API-ready article feed endpoint

## Run locally

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Deploy

Upload this folder to GitHub and import it into Vercel.

## Automated article feed

The API endpoint is:

```bash
/api/feed
```

RSS sources live in:

```bash
lib/feed.ts
```

For production, connect this to a database such as Supabase and run ingestion on a cron schedule.

Important: do not republish full copyrighted articles from premium publishers. Use headlines, short summaries, source attribution, images where licensed, and outbound links.
