import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureBuilder } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "credentia-studio",
  title: "Credentia CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("📋 Checklists")
              .child(S.documentTypeList("checklist").title("Checklists")),
            S.listItem()
              .title("📰 Blog Posts")
              .child(S.documentTypeList("blogPost").title("Blog Posts")),
            S.divider(),
            S.listItem()
              .title("🗂 Categories")
              .child(S.documentTypeList("category").title("Categories")),
          ]),
    }),
  ],

  schema: { types: schemaTypes },
});
