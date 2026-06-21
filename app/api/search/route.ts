import { NextRequest, NextResponse } from "next/server";
import { searchSanity, getCloseMatches } from "../../../lib/sanity/queries";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ checklists: [], blogs: [], suggested: false });

  const results = await searchSanity(q);
  if (results.checklists.length + results.blogs.length > 0) {
    return NextResponse.json({ ...results, suggested: false });
  }

  // No direct hits — offer the closest matches instead.
  const close = await getCloseMatches(q);
  return NextResponse.json({ ...close, suggested: true });
}
