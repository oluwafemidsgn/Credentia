export type SearchResult = {
  title: string;
  type: "checklist" | "blog";
  tag: string;
  href: string;
};

export const allChecklists: SearchResult[] = [
  // Education
  { title: "University Admission", type: "checklist", tag: "Education", href: "/checklist/university-admission" },
  { title: "WAEC / NECO sign-up", type: "checklist", tag: "Education", href: "/checklist/waec-neco-signup" },
  { title: "Scholarship application", type: "checklist", tag: "Education", href: "/checklist/scholarship-application" },
  { title: "NYSC registration", type: "checklist", tag: "Education", href: "/checklist/nysc-registration" },
  { title: "Transcript request", type: "checklist", tag: "Education", href: "/checklist/transcript-request" },
  { title: "Student ID & hostel", type: "checklist", tag: "Education", href: "/checklist/student-id-hostel" },
  { title: "Post-UTME registration", type: "checklist", tag: "Education", href: "/checklist/post-utme" },
  { title: "Change of course", type: "checklist", tag: "Education", href: "/checklist/change-of-course" },
  // Travel
  { title: "First international passport", type: "checklist", tag: "Travel", href: "/checklist/international-passport" },
  { title: "Passport renewal", type: "checklist", tag: "Travel", href: "/checklist/passport-renewal" },
  { title: "Visa application", type: "checklist", tag: "Travel", href: "/checklist/visa-application" },
  { title: "Yellow card / vaccinations", type: "checklist", tag: "Travel", href: "/checklist/yellow-card" },
  { title: "Travel insurance", type: "checklist", tag: "Travel", href: "/checklist/travel-insurance" },
  { title: "Emigration clearance", type: "checklist", tag: "Travel", href: "/checklist/emigration-clearance" },
  { title: "Work permit abroad", type: "checklist", tag: "Travel", href: "/checklist/work-permit" },
  { title: "Student visa", type: "checklist", tag: "Travel", href: "/checklist/student-visa" },
  // Civic
  { title: "NIN registration", type: "checklist", tag: "Civic", href: "/checklist/nin-registration" },
  { title: "Get your PVC", type: "checklist", tag: "Civic", href: "/checklist/pvc-registration" },
  { title: "Birth certificate", type: "checklist", tag: "Civic", href: "/checklist/birth-certificate" },
  { title: "Marriage certificate", type: "checklist", tag: "Civic", href: "/checklist/marriage-certificate" },
  { title: "Name change", type: "checklist", tag: "Civic", href: "/checklist/name-change" },
  { title: "Driver's licence", type: "checklist", tag: "Civic", href: "/checklist/drivers-licence" },
  { title: "National ID card", type: "checklist", tag: "Civic", href: "/checklist/national-id" },
  { title: "Death certificate", type: "checklist", tag: "Civic", href: "/checklist/death-certificate" },
  // Property
  { title: "Buy a plot of land", type: "checklist", tag: "Property", href: "/checklist/buy-land" },
  { title: "Rent an apartment", type: "checklist", tag: "Property", href: "/checklist/rent-apartment" },
  { title: "C of O application", type: "checklist", tag: "Property", href: "/checklist/cof-o" },
  { title: "Building permit", type: "checklist", tag: "Property", href: "/checklist/building-permit" },
  { title: "Survey plan", type: "checklist", tag: "Property", href: "/checklist/survey-plan" },
  { title: "Deed of assignment", type: "checklist", tag: "Property", href: "/checklist/deed-of-assignment" },
  { title: "Mortgage application", type: "checklist", tag: "Property", href: "/checklist/mortgage" },
  { title: "Property transfer", type: "checklist", tag: "Property", href: "/checklist/property-transfer" },
];

export const allBlogPosts: SearchResult[] = [
  { title: "Mastering remote work tools", type: "blog", tag: "Step-by-step", href: "/blog/mastering-remote-work-tools" },
  { title: "The future of electric vehicles", type: "blog", tag: "Insight", href: "/blog/future-electric-vehicles" },
  { title: "ChatGPT and the new AI wave", type: "blog", tag: "Interview", href: "/blog/chatgpt-new-ai-wave" },
  { title: "How to renew your passport in 2026", type: "blog", tag: "Guide", href: "/blog/renew-passport-2026" },
  { title: "NIN vs BVN: what's the difference?", type: "blog", tag: "Explainer", href: "/blog/nin-vs-bvn" },
  { title: "JAMB changes its 2026 requirements", type: "blog", tag: "News", href: "/blog/jamb-2026-requirements" },
  { title: "The rise of sustainable fashion", type: "blog", tag: "Analysis", href: "/blog/rise-sustainable-fashion" },
  { title: "Top 5 smart home devices in 2026", type: "blog", tag: "Review", href: "/blog/top-5-smart-home-devices" },
  { title: "Revamping urban transport systems", type: "blog", tag: "Case Study", href: "/blog/revamping-urban-transport" },
];

const allItems = [...allChecklists, ...allBlogPosts];

export function searchItems(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return allItems
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
    )
    .slice(0, 10);
}
