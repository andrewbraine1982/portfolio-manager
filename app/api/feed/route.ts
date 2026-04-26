import { NextResponse } from "next/server";
import { getExternalFeed } from "@/lib/feed";

export async function GET() {
  const articles = await getExternalFeed();
  return NextResponse.json({ articles });
}
