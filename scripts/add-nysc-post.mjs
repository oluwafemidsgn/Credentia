import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";

// Load .env.local manually
const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) => {
  const m = env.match(new RegExp("^" + k + "=(.*)$", "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
};

const client = createClient({
  projectId: get("SANITY_PROJECT_ID") || get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: get("SANITY_DATASET") || get("NEXT_PUBLIC_SANITY_DATASET") || "production",
  apiVersion: "2025-06-01",
  token: get("SANITY_API_WRITE_TOKEN"),
  useCdn: false,
});

const slug = "nysc-honestly-camp-money-year-ahead";

const doc = {
  _id: "blogPost-nysc-honestly",
  _type: "blogPost",
  title:
    "NYSC, honestly: what nobody tells you about camp, money, and the year ahead",
  slug: { _type: "slug", current: slug },
  postType: "Guide",
  category: "guides",
  readTime: "9 MIN",
  publishedDate: "AUG 2026",
  featured: true,
  excerpt:
    "Camp, money, PPA and clearance — the NYSC service year explained without the scare stories. What to pack, how much cash to carry, and the things nobody tells you until you've already missed one.",
  lead:
    "If you're reading this because your call-up letter just landed, or because Batch B or C is on the horizon and the anxiety has started creeping in — take a breath. NYSC is one of those Nigerian institutions that everyone has an opinion about, most of them loud, some of them scary, and very few of them actually organized into something useful. This guide is our attempt at the useful version: replacing vague dread with an actual picture of what to expect. We're not going to tell you it's easy, and we're not going to tell you it's a nightmare either. It's a year — structured, sometimes frustrating, occasionally genuinely fun, and almost always more manageable once you know what's actually coming.",
  sections: [
    {
      _type: "articleSection",
      _key: "camp-locations",
      heading: "Where you'll actually go: camp locations",
      body: [
        "NYSC operates orientation camps across the country — one in most states, with some states running more than one depending on capacity. Your camp is not something you choose. It's determined by your state of deployment, which is assigned during mobilization, with the one guarantee being that you won't be deployed to your own state of origin.",
        "Camps tend to be located on the outskirts of major cities rather than in city centers — often on large, semi-rural land with dormitory-style hostels, an open parade ground, and a \"Mammy Market\" (the informal market inside camp where vendors sell food, provisions, and camp necessities at, frankly, inflated prices). Your specific camp address will be printed clearly on your call-up letter. Don't rely on rumors or old information from a friend who served three years ago — camps occasionally change locations, and your call-up letter is the only document that matters here.",
        "The honest version: camp facilities are basic. Hostels are shared, dormitory-style, and can be crowded. Electricity and water supply vary and are sometimes inconsistent. This isn't said to alarm you — it's said so you pack like someone who knows this, rather than someone hoping for a hotel.",
      ].join("\n\n"),
    },
    {
      _type: "articleSection",
      _key: "21-days",
      heading: "What actually happens during the 21 days",
      body: [
        "Orientation camp lasts three weeks, and it runs on a fairly predictable rhythm once you're inside.",
        "Registration and verification (day 1): This is usually the most chaotic day. You'll go through document verification, biometric capture, a security bag check, hostel allocation, and platoon assignment — your platoon number is typically the last digit of your state code. Expect this to take hours. Bring patience, water, and your documents in a labeled, waterproof folder (originals separate from photocopies).",
        "The daily structure: mornings start early with drills and parade. There are lectures (on topics ranging from entrepreneurship to civic responsibility), skills acquisition training (SAED — more on this below), sports, and organized social and cultural activities. It's part military-style discipline, part youth camp, part civic program. Genuinely, most people who've been through it describe the friendships made in those three weeks as one of the best parts of the entire service year.",
        "SAED (Skills Acquisition and Entrepreneurship Development): free training in vocational and entrepreneurial skills, run during camp. Worth taking seriously — some corps members leave with a certification or a skill that outlasts the service year itself.",
        "What you cannot do: cook (no stoves, no burners — ready-to-eat food only), leave camp without official permission, or skip registration steps. NYSC officials take documentation and process seriously, not because they enjoy bureaucracy, but because your Certificate of National Service depends on a clean paper trail.",
      ].join("\n\n"),
    },
    {
      _type: "articleSection",
      _key: "money",
      heading: "The money: what to actually expect",
      body: [
        "This is the section most guides gloss over, so let's not.",
        "The federal allowance is currently ₦77,000 per month, calculated as the national minimum wage (₦70,000) plus a 10% top-up — a rate that took effect after the 2024 national minimum wage increase. It's paid by the Federal Government to every serving corps member, in every state, regardless of your course of study or your Place of Primary Assignment. Payment typically lands between the 25th and 30th of each month, though administrative delays do happen — corps members occasionally report payments slipping into early the following month.",
        "(Figures like this are exactly the kind of thing that shift — verify the current rate on the NYSC portal or with your state secretariat before you build your budget around it. If you spot outdated info here, flag it and we'll fix it.)",
        "Important: you will not receive your first allowance until after camp. This trips a lot of people up. You need to arrive at camp with your own money — most guides suggest at least ₦20,000–₦30,000 in cash to cover the three weeks, plus mattress, bedding, kit essentials, and Mammy Market spending. Don't travel to camp broke assuming the allowance will save you. It won't arrive in time.",
        "State top-ups exist, but they're inconsistent. Some state governments pay an additional monthly stipend on top of the federal allowance — anywhere from roughly ₦5,000 to ₦50,000+, depending on the state. Some states pay reliably. Others announce increases that don't fully materialize in practice. And some states, historically, pay nothing extra at all. This is genuinely one of the more frustrating parts of the system — the unpredictability itself is the problem, not any single state's generosity. Don't plan your finances around a state allowance until you've actually confirmed it's being paid, in your specific state, in the current year.",
        "Your Place of Primary Assignment (PPA) may also pay you. This is often the biggest financial variable of your entire service year. A PPA at a bank, telecom company, or well-resourced private organization might pay an additional ₦20,000 to ₦150,000+ per month on top of your federal allowance. A PPA at an under-resourced public school might pay nothing extra at all. This is one of the few parts of the system you can actually influence: a little research and, if allowed in your state, self-sourcing your placement can make a real financial difference over the year.",
        "A word of caution: NYSC does not sell postings, PPA placements, or redeployments. If anyone — online or in person — offers to secure you a \"good\" posting or PPA for a fee, that's a scam. The information about how postings and PPAs work is public. It should never cost you money to access it.",
      ].join("\n\n"),
    },
    {
      _type: "articleSection",
      _key: "after-camp",
      heading: "After camp: PPA, clearance, and the 11 months that follow",
      body: [
        "Camp is only the first three weeks. The remaining eleven months happen at your Place of Primary Assignment — the organization (school, hospital, government office, private company, NGO) where you'll actually work for the rest of your service year.",
        "Reporting to your PPA: You'll receive a posting letter, either at camp on closing day or via your NYSC dashboard shortly after. Report promptly — delays here can create complications with your clearance record.",
        "Monthly clearance: every month, you're required to clear with your Local Government Inspector (LGI) to confirm you're still active at your PPA. This is not optional. Missing clearance can mean missing that month's allowance, and missing clearance three times can extend your entire service year. It sounds harsh, but it's a simple habit to build once you know it exists — which, again, is exactly the kind of thing nobody tells you until you've already missed one.",
        "Redeployment and relocation: if your posting genuinely doesn't work for you — health reasons, marriage (for women wanting to be posted near a spouse), or security concerns in your assigned state — there is an official process to request a change. It's not guaranteed, and it's not something to plan around casually, but it exists and it's legitimate. Applications go through the NYSC portal with supporting documentation.",
        "Community Development Service (CDS): a weekly commitment to a community project — teaching, sanitation drives, youth empowerment programs, and similar initiatives. Many corps members find this to be one of the more genuinely rewarding parts of the year, both for the community impact and for the leadership experience it builds.",
      ].join("\n\n"),
    },
    {
      _type: "articleSection",
      _key: "its-okay",
      heading: "The part where we tell you it's going to be okay",
      body: [
        "If you've read this far and you're still nervous — that's normal, and honestly, it's a reasonable response to a system that changes its own rules almost every batch. New requirements like the NERD clearance step have been added recently. Timelines shift. State allowances fluctuate. None of that is your fault, and none of it means you're going to fail at this.",
        "Here's what actually helps: preparation, not perfection. You don't need to know everything about NYSC before you start. You need to know the next step in front of you — what document you need this week, what to pack for camp, how much money to carry, when your next clearance is due. That's exactly why we built the checklist that goes with this post, and it's exactly why Credentia exists in the first place: not to make the system less bureaucratic, but to make sure you're never standing in front of an official realizing you're missing something nobody told you about.",
        "Every year, hundreds of thousands of Nigerian graduates go through this exact process. Most of them come out the other side with a completed service year, a national identity that goes beyond their home state, and — more often than people expect — genuine friendships and stories they'll tell for years. You'll be one of them.",
      ].join("\n\n"),
    },
    {
      _type: "articleSection",
      _key: "quick-answers",
      heading: "Quick answers to what people actually ask",
      body: [
        "Do I need to go to camp if I'm scared of the \"stress\" I've heard about? Yes — camp is mandatory for anyone not officially exempted. But \"stress\" in most corps members' accounts means early mornings and structured discipline, not danger. Camps are secured, and the vast majority of corps members describe camp as tiring but memorable, not traumatic.",
        "What if I can't afford camp costs? Budget what you genuinely can, prioritize documents and essential kit over comfort items, and know that a lot of what's sold inside camp is available cheaper outside — buy what you can before you arrive.",
        "What if my PPA doesn't pay extra? Your federal allowance is guaranteed regardless. A PPA stipend is a bonus, not a right — plenty of corps members complete a financially fine service year on the federal allowance alone, especially outside the most expensive cities.",
        "Is it true NYSC can extend your service year? Yes, but almost always for a specific, avoidable reason — missed clearances, unresolved documentation issues, or an incomplete registration. This is exactly what staying on top of your checklist and monthly clearance protects you from.",
        "Requirements, allowances, and timelines change — sometimes every batch. This guide reflects our most recent research, but always cross-check dates, figures, and requirements against the official NYSC portal before you act. Spotted something outdated here? Flag it — that's exactly what keeps Credentia accurate for the next graduate reading this.",
      ].join("\n\n"),
    },
  ],
  takeaways: [
    "Your call-up letter is the only source of truth for your camp location — ignore rumors and outdated advice from past corps members.",
    "You won't get your first allowance until after camp, so carry at least ₦20,000–₦30,000 in cash for the three weeks, plus bedding and kit.",
    "The federal allowance (₦77,000/month at time of writing) is guaranteed everywhere; state top-ups and PPA pay are variable — never budget around them until confirmed.",
    "Clear with your Local Government Inspector every single month; missing clearance three times can extend your whole service year.",
    "NYSC never sells postings, PPAs, or redeployments — anyone charging a fee for a \"good\" posting is running a scam.",
    "Preparation beats perfection: know the next step in front of you, and let the checklist handle the rest.",
  ],
  // Links the end-of-article CTA to the existing NYSC Registration checklist.
  ctaChecklist: { _type: "reference", _ref: "checklist-nysc-registration" },
};

const created = await client.createOrReplace(doc);
console.log("Saved blog post:", created._id, "→ /blog/" + slug);
