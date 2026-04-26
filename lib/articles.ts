export type Article = {
  title: string;
  category: string;
  summary: string;
  author: string;
  time: string;
  image: string;
};

export const leadArticle: Article = {
  category: "Top Story",
  title: "Fed signals higher for longer as inflation progress stalls",
  summary:
    "The Federal Reserve left rates unchanged but indicated it will take more time to gain confidence that inflation is moving sustainably toward 2%.",
  author: "Sarah Chen",
  time: "2h ago",
  image:
    "https://images.unsplash.com/photo-1565373677928-90e963765eac?auto=format&fit=crop&w=1200&q=80"
};

export const latestArticles: Article[] = [
  {
    category: "Markets",
    title: "Stocks climb as earnings strength offsets rate worries",
    summary:
      "Better-than-expected corporate results helped lift U.S. equities, with the S&P 500 notching its fifth straight weekly gain.",
    author: "Michael Reynolds",
    time: "1h ago",
    image:
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80"
  },
  {
    category: "Trade",
    title: "China exports beat forecasts as global demand improves",
    summary:
      "Exports rose ahead of expectations, while imports showed signs of stabilization as regional supply chains recovered.",
    author: "Li Wei",
    time: "3h ago",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
  },
  {
    category: "Commodities",
    title: "Oil prices drop on demand concerns and OPEC+ uncertainty",
    summary:
      "Markets weighed weaker economic data from Europe and rising U.S. inventories against production discipline.",
    author: "James Carter",
    time: "4h ago",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80"
  }
];

export const featuredArticle: Article = {
  category: "Featured Analysis",
  title: "The outlook for global growth in a fragmented world",
  summary:
    "Slower growth, geopolitical risks, and policy divergence are redefining the global economic landscape.",
  author: "David Marsh",
  time: "5h ago",
  image:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"
};

export const mostRead = [
  {
    title: "Why the bond market is sending a warning signal",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=300&q=80"
  },
  {
    title: "Tech giants face new regulatory pressure in Washington",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=300&q=80"
  },
  {
    title: "Private credit booms as banks pull back",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=300&q=80"
  },
  {
    title: "The case for gold in an uncertain world",
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=300&q=80"
  },
  {
    title: "Europe's economy shows signs of life",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=300&q=80"
  }
];

export const markets = [
  ["S&P 500", "5,321.41", "+0.52%"],
  ["NASDAQ", "16,832.62", "+0.81%"],
  ["DOW JONES", "39,065.26", "+0.20%"],
  ["FTSE 100", "8,275.60", "-0.18%"],
  ["NIKKEI 225", "38,920.26", "+0.35%"],
  ["BRENT OIL", "82.54", "-0.37%"],
  ["GOLD", "2,343.70", "+0.15%"],
  ["USD INDEX", "104.32", "-0.11%"]
];
