import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResourcesClient from "./ResourcesClient";
import { getAllResources } from "../../lib/sanity/queries";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Resources — Credentia",
  description:
    "Free, printable checklists and guides for Lagos life admin. Download the resource you need — passport, NYSC, school, and more.",
  openGraph: {
    title: "Credentia Resources",
    description: "Free, printable checklists and guides for Lagos life admin.",
  },
};

export default async function ResourcesPage() {
  const resources = await getAllResources();

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-20 pt-10 md:pt-16 pb-8 md:pb-12 max-w-[1920px] mx-auto">
        <div className="max-w-[760px]">
          <p
            className="uppercase tracking-[0.12em] text-[#7a5cc0] font-medium mb-4"
            style={{ fontSize: "clamp(11px, 0.85vw, 13px)" }}
          >
            Free to download
          </p>
          <h1
            className="font-display text-[#232323] leading-[1.02] tracking-[-0.04em] mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            Resources
          </h1>
          <p
            className="text-[#505050] leading-[1.6] tracking-[-0.02em]"
            style={{ fontSize: "clamp(15px, 1.15vw, 19px)" }}
          >
            Printable checklists and guides for the documents you actually need — laid out for
            paper, so you can pack them and stop scrolling. Pick one, drop your email, and it&apos;s
            yours.
          </p>
        </div>
      </section>

      {/* ── Grid + download modal (client) ─────────────────── */}
      <ResourcesClient resources={resources} />

      <Footer />
    </main>
  );
}
