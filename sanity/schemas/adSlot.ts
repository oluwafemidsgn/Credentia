import { defineType, defineField } from "sanity";

export const adSlotSchema = defineType({
  name: "adSlot",
  title: "Sponsor / Ad",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Name",
      type: "string",
      description: "Only shown in the Studio e.g. Education — JAMB partner",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "The section this ad appears in — shows on every checklist in this category",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Ad Image",
      type: "image",
      options: { hotspot: true },
      description: "The creative. Recommended wide banner ~1000×360",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "link",
      title: "Destination Link",
      type: "url",
      description: "Where clicking the ad sends visitors e.g. https://partner.com",
      validation: (r) =>
        r.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the ad for accessibility / screen readers",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Toggle the ad on or off without deleting it",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category.label", media: "image" },
  },
});
