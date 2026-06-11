import { defineType, defineField, defineArrayMember } from "sanity";

export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL path e.g. renew-passport-2026 → /blog/renew-passport-2026",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "postType",
      title: "Post Type",
      type: "string",
      description: "Shown as the tag pill on the card",
      options: {
        list: [
          "Guide",
          "Explainer",
          "News",
          "Step-by-step",
          "Insight",
          "Interview",
          "Analysis",
          "Review",
          "Case Study",
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Used for the filter pills on the blog index",
      options: {
        list: [
          { title: "Guides", value: "guides" },
          { title: "Explainers", value: "explainers" },
          { title: "Documents News", value: "documents-news" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g. 6 MIN",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedDate",
      title: "Published Date",
      type: "string",
      description: "Displayed as-is e.g. MAY 2026",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 2,
      description: "Short teaser shown on blog cards e.g. The new NIS process, step by step.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      description: "Upload a cover image for the blog card and article header (recommended: 1200×800px)",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      description: "If on, this post appears in the hero section of the blog index",
      initialValue: false,
    }),

    // ── Article content ───────────────────────────────────────────
    defineField({
      name: "lead",
      title: "Lead Paragraph",
      type: "text",
      rows: 5,
      description: "Opening paragraph shown in large text above the article image",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sections",
      title: "Article Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "articleSection",
          title: "Section",
          fields: [
            defineField({
              name: "heading",
              title: "Section Heading",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "body",
              title: "Section Body",
              type: "text",
              rows: 8,
              description: "Separate paragraphs with a blank line (double newline)",
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "heading" } },
        }),
      ],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "takeaways",
      title: "Key Takeaways",
      type: "array",
      description: "Bullet points shown in the coloured takeaways box at the end of the article",
      of: [defineArrayMember({ type: "string" })],
      validation: (r) => r.min(2),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      featured: "featured",
    },
    prepare({ title, subtitle, featured }) {
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle,
      };
    },
  },
  orderings: [
    { title: "Published Date (newest first)", name: "publishedDateDesc", by: [{ field: "publishedDate", direction: "desc" }] },
  ],
});
