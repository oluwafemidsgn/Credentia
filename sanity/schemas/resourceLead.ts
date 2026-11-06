import { defineType, defineField } from "sanity";

// One captured name and email per resource download. Created by the
// /api/resource-lead route — you view them here in Studio and can export them.
// Leads captured before the name field was added have no name.
export const resourceLeadSchema = defineType({
  name: "resourceLead",
  title: "Resource Lead (Captured Email)",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "resourceTitle", title: "Resource", type: "string" }),
    defineField({ name: "resourceSlug", title: "Resource Slug", type: "string" }),
    defineField({ name: "createdAt", title: "Captured At", type: "datetime" }),
  ],
  preview: {
    select: { name: "name", email: "email", subtitle: "resourceTitle", date: "createdAt" },
    prepare({ name, email, subtitle, date }) {
      const when = typeof date === "string" ? date.slice(0, 10) : "";
      // Older leads have no name, so fall back to the email as the title.
      const title = name ? `${name} · ${email}` : email;
      return { title, subtitle: `${subtitle || "—"}${when ? ` · ${when}` : ""}` };
    },
  },
  orderings: [
    { title: "Newest first", name: "newest", by: [{ field: "createdAt", direction: "desc" }] },
  ],
});
