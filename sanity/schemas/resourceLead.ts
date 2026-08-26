import { defineType, defineField } from "sanity";

// One captured email per resource download. Created by the /api/resource-lead
// route — you view them here in Studio and can export them.
export const resourceLeadSchema = defineType({
  name: "resourceLead",
  title: "Resource Lead (Captured Email)",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "resourceTitle", title: "Resource", type: "string" }),
    defineField({ name: "resourceSlug", title: "Resource Slug", type: "string" }),
    defineField({ name: "createdAt", title: "Captured At", type: "datetime" }),
  ],
  preview: {
    select: { title: "email", subtitle: "resourceTitle", date: "createdAt" },
    prepare({ title, subtitle, date }) {
      const when = typeof date === "string" ? date.slice(0, 10) : "";
      return { title, subtitle: `${subtitle || "—"}${when ? ` · ${when}` : ""}` };
    },
  },
  orderings: [
    { title: "Newest first", name: "newest", by: [{ field: "createdAt", direction: "desc" }] },
  ],
});
