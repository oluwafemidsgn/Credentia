import { defineType, defineField } from "sanity";

export const categorySchema = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Display name e.g. Education, Travel",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "id",
      title: "URL ID",
      type: "slug",
      description: "Used for browse page anchor links e.g. #education",
      options: { source: "label" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "color",
      title: "Background Color",
      type: "string",
      description: "Hex color used on cards e.g. #efd536",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "textColor",
      title: "Heading Text Color",
      type: "string",
      description: "Hex e.g. #292929 or white",
      initialValue: "#292929",
    }),
    defineField({
      name: "descColor",
      title: "Description Text Color",
      type: "string",
      description: "Hex for secondary text on cards e.g. #505050",
      initialValue: "#505050",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "string",
      description: "Used on homepage category cards e.g. Admission, results, transcripts, NYSC",
    }),
    defineField({
      name: "homepageName",
      title: "Homepage Card Name",
      type: "string",
      description: "Short name shown on the homepage card e.g. School",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "id.current" },
  },
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
