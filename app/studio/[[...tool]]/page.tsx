"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

// Prevent the global layout from wrapping the studio
export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
