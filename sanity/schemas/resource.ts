import { defineType, defineField } from "sanity";

export const resourceSchema = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  description:
    "A downloadable resource (PDF or link) shown on the /resources page. Visitors enter their email to download it.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g. NYSC Camp-Ready Checklist (PDF)",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short line shown on the resource card.",
    }),
    defineField({
      name: "category",
      title: "Label / Category",
      type: "string",
      description: "Optional pill on the card, e.g. Checklist, Guide, Template.",
    }),
    defineField({
      name: "file",
      title: "PDF File",
      type: "file",
      options: { accept: ".pdf,application/pdf" },
      description:
        "Upload the PDF here. Use EITHER this OR an External Link below — if both are set, the file wins.",
    }),
    defineField({
      name: "externalUrl",
      title: "External Link",
      type: "url",
      description:
        "Or link to an externally hosted resource (Google Drive, Notion, etc.) instead of uploading a PDF.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional thumbnail for the resource card.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured resources sort to the top of the page.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first (after featured).",
      initialValue: 0,
    }),
  ],
  validation: (r) =>
    r.custom((doc) => {
      const d = doc as { file?: unknown; externalUrl?: unknown } | undefined;
      if (d && !d.file && !d.externalUrl) {
        return "Add a PDF file or an external link so there is something to download.";
      }
      return true;
    }),
  preview: {
    select: { title: "title", category: "category", media: "coverImage", hasFile: "file" },
    prepare({ title, category, media, hasFile }) {
      return {
        title,
        subtitle: `${category || "Resource"} · ${hasFile ? "PDF" : "Link"}`,
        media,
      };
    },
  },
  orderings: [
    { title: "Featured first", name: "featured", by: [{ field: "featured", direction: "desc" }, { field: "order", direction: "asc" }] },
  ],
});
