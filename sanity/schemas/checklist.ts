import { defineType, defineField, defineArrayMember } from "sanity";

export const checklistSchema = defineType({
  name: "checklist",
  title: "Checklist",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g. University Admission",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL path e.g. university-admission → /checklist/university-admission",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Lagos",
    }),
    defineField({
      name: "updatedDate",
      title: "Last Updated",
      type: "string",
      description: "Displayed as-is e.g. May 2026",
    }),
    defineField({
      name: "sortedCount",
      title: "Documents Sorted / Verified",
      type: "number",
      description: "How many documents have been fully verified",
      initialValue: 0,
    }),
    defineField({
      name: "documents",
      title: "Documents",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "checklistDocument",
          title: "Document",
          fields: [
            defineField({
              name: "title",
              title: "Document Name",
              type: "string",
              description: "e.g. WAEC / NECO result",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              description: "What the document is and why it is needed",
            }),
            defineField({
              name: "where",
              title: "Where to Get It",
              type: "string",
              description: "e.g. waecdirect.org or Local Government Secretariat",
            }),
            defineField({
              name: "cost",
              title: "Cost",
              type: "string",
              description: "e.g. Free or ₦2,500 – ₦5,000",
            }),
            defineField({
              name: "time",
              title: "Time to Obtain",
              type: "string",
              description: "e.g. Instant (online) or 1–4 weeks",
            }),
            defineField({
              name: "prereq",
              title: "You'll Need First",
              type: "string",
              description: "Prerequisite e.g. Exam already sat or None",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "cost" },
          },
        }),
      ],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "relatedChecklists",
      title: "Related Checklists",
      description: "Shown as \"People also checked\" pills at the bottom of the page",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "checklist" }] })],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.label",
      count: "documents",
    },
    prepare({ title, subtitle, count }) {
      return {
        title,
        subtitle: `${subtitle || "No category"} · ${Array.isArray(count) ? count.length : 0} documents`,
      };
    },
  },
});
