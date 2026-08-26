import { categorySchema } from "./category";
import { checklistSchema } from "./checklist";
import { blogPostSchema } from "./blogPost";
import { adSlotSchema } from "./adSlot";
import { resourceSchema } from "./resource";
import { resourceLeadSchema } from "./resourceLead";

export const schemaTypes = [
  categorySchema,
  checklistSchema,
  blogPostSchema,
  adSlotSchema,
  resourceSchema,
  resourceLeadSchema,
];
