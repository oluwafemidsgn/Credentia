import { NextRequest, NextResponse } from "next/server";
import { searchSanity } from "../../../lib/sanity/queries";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ checklists: [], blogs: [] });
  const results = await searchSanity(q);
  return NextResponse.json(results);
}
