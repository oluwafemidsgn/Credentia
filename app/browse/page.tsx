import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import BrowseClient from "./BrowseClient";
import { getAllCategories } from "../../lib/sanity/queries";

export const revalidate = 30;

export default async function Browse() {
  const categories = await getAllCategories();

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 px-5 text-center max-w-[834px] mx-auto">
        <h1
          className="font-display leading-none text-[#232323] tracking-[-0.04em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
        >
          Browse everything
        </h1>
        <p
          className="font-medium leading-[1.4] text-[#232323] tracking-[-0.02em]"
          style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
        >
          Pick a category, or search for the exact step you&apos;re on.
        </p>
      </section>

      {/* ── Search ───────────────────────────────────── */}
      <section className="flex flex-col gap-4 items-center px-5 pb-10 md:pb-12 w-full max-w-[720px] mx-auto">
        <SearchBar />
      </section>

      {/* ── Filter pills + category sections (client) ── */}
      <BrowseClient categories={categories} />


      <Footer />
    </main>
  );
}
