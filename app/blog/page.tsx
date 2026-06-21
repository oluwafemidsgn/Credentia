import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogClient from "./BlogClient";
import { getAllBlogPosts } from "../../lib/sanity/queries";

export const revalidate = 30;

export default async function Blog() {
  const posts = await getAllBlogPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];

  return (
    <main className="bg-white overflow-x-hidden pt-[70px]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-8 px-5 text-center max-w-[900px] mx-auto">
        <h1
          className="font-display leading-none text-[#232323] tracking-[-0.04em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
        >
          The Credentia Blog
        </h1>
        <p
          className="font-medium leading-[1.5] text-[#505050] tracking-[-0.02em] max-w-[640px] mx-auto mb-10"
          style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)" }}
        >
          Guides, explainers, and updates on Nigerian documents, so the news reaches you before the queue does.
        </p>
      </section>

      {/* ── Filter pills + featured + grid (client component) */}
      <BlogClient posts={posts} featured={featured} />


      <Footer />
    </main>
  );
}
