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

const ID = "checklist-nysc-camp-day";
const REG_ID = "checklist-nysc-registration";
const slug = "nysc-camp-day-checklist";

const doc = {
  _id: ID,
  _type: "checklist",
  title: "NYSC Camp Day (What to Pack)",
  slug: { _type: "slug", current: slug },
  category: { _type: "reference", _ref: "category-education" },
  location: "Lagos",
  updatedDate: "Aug 2026",
  sortedCount: 0,
  documents: [
    {
      _key: "callup",
      title: "Original call-up letter (+ photocopies)",
      description:
        "Your single most important document. Print the original plus several photocopies — it's checked at the gate, at registration, and again at various points during camp. Your camp address is printed on it, so confirm the location from here and nowhere else.",
      where: "Printed from your NYSC dashboard after mobilization",
      cost: "₦100 – ₦500 (printing)",
      time: "Same day",
      prereq: "Completed online registration; senate list confirmed",
    },
    {
      _key: "green-card",
      title: "NYSC registration printout (green card)",
      description:
        "The registration slip generated when you finished online registration. Bring it printed, plus copies — it's used to confirm your details during camp verification.",
      where: "Printed from your NYSC dashboard",
      cost: "₦100 – ₦500 (printing)",
      time: "Same day",
      prereq: "Completed online registration",
    },
    {
      _key: "result",
      title: "Degree certificate / Statement of Result (original + copies)",
      description:
        "Proof you actually graduated. Bring the original and at least 4 photocopies. Verification officers keep copies; you keep the original on you at all times.",
      where: "Your university / institution",
      cost: "Free – ₦5,000",
      time: "1–4 weeks if not yet collected",
      prereq: "Graduated and mobilised",
    },
    {
      _key: "nin",
      title: "NIN slip",
      description:
        "Your National Identification Number slip is part of standard identity verification at camp. Bring a printed copy.",
      where: "NIMC office or nimc.gov.ng",
      cost: "Free",
      time: "1–3 days",
      prereq: "Enrolled for NIN",
    },
    {
      _key: "photos",
      title: "Passport photographs (white background)",
      description:
        "Bring at least 8 recent passport photos on a white background. They're used for forms, your ID card, and various registrations — you always need more than you expect.",
      where: "Any photo studio",
      cost: "₦500 – ₦2,000",
      time: "Same day",
      prereq: "None",
    },
    {
      _key: "medical",
      title: "Medical certificate of fitness",
      description:
        "A recent fitness certificate from a registered hospital, confirming you're fit for the physical activities of camp. Some camps also re-test on arrival.",
      where: "Government or registered private hospital",
      cost: "₦2,000 – ₦5,000",
      time: "1–2 days",
      prereq: "None",
    },
    {
      _key: "id",
      title: "Government / school ID",
      description:
        "Any additional valid photo ID — school ID, driver's licence, or voter's card — as backup identification during verification.",
      where: "You already have it",
      cost: "Free",
      time: "N/A",
      prereq: "None",
    },
    {
      _key: "cash",
      title: "Cash for camp (₦20,000 – ₦30,000)",
      description:
        "Your first federal allowance does NOT arrive until after camp, so carry your own money. Covers your mattress, kit, Mammy Market food and provisions for the full three weeks. Bring cash — ATMs near camp are unreliable and often have long queues.",
      where: "Withdraw before you travel",
      cost: "₦20,000 – ₦30,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "whites",
      title: "White round-neck T-shirts & white shorts",
      description:
        "The unofficial camp uniform for morning drills and parade. Bring several plain white round-neck tops and white shorts — you'll sweat through them daily and laundry is basic. (NYSC issues crested kit at camp, but it's rarely enough on its own.)",
      where: "Any market — buy before you travel; cheaper outside camp",
      cost: "₦5,000 – ₦12,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "shoes",
      title: "White sneakers / canvas shoes",
      description:
        "Plain white trainers for parade and drills, plus a comfortable second pair of slippers/sandals for around the hostel. Break new shoes in before camp — blisters on day one are miserable.",
      where: "Any market",
      cost: "₦4,000 – ₦15,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "pouch",
      title: "Waist pouch / document pouch",
      description:
        "A small pouch you can wear under clothing to keep your documents and cash on you at all times. Theft in crowded hostels does happen — never leave documents or money in your box.",
      where: "Any market",
      cost: "₦1,000 – ₦3,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "bedding",
      title: "Mattress, bedsheets & light blanket",
      description:
        "Hostels are dormitory-style with bare bunk frames. A thin foam mattress is often sold at or near camp on arrival, but bring your own bedsheets, a pillow and a light blanket. Nights can get cold depending on the camp.",
      where: "Market before travel; foam often bought at camp",
      cost: "₦5,000 – ₦15,000",
      time: "Before departure / on arrival",
      prereq: "None",
    },
    {
      _key: "toiletries",
      title: "Toiletries & personal medication",
      description:
        "A full toiletry kit (soap, toothbrush/paste, sanitary items, tissue) plus a small personal first-aid kit and any prescription medication you take. The camp clinic handles emergencies only — don't rely on it for routine needs.",
      where: "Any pharmacy / supermarket",
      cost: "₦3,000 – ₦8,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "power",
      title: "Torch, power bank & phone charger",
      description:
        "Electricity is inconsistent, so a charged power bank and a torch (or headlamp) are essential for night movement and charging your phone. Label your charger — communal charging points lose cables constantly.",
      where: "Any electronics store",
      cost: "₦5,000 – ₦20,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "padlock",
      title: "Padlock & chain",
      description:
        "A sturdy padlock (and a light chain) to secure your box or locker in the hostel. Bring two — one as a spare. This is your main defence against opportunistic theft.",
      where: "Any market",
      cost: "₦1,000 – ₦3,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "net",
      title: "Mosquito net / insect repellent",
      description:
        "Camps are often on semi-rural land where mosquitoes are heavy. A treated net or repellent protects you from malaria — falling ill in your first week is a common, avoidable setback.",
      where: "Any pharmacy / market",
      cost: "₦1,500 – ₦4,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "bottle",
      title: "Reusable water bottle & cup",
      description:
        "You'll spend long hours on the parade ground in the sun. A refillable bottle keeps you hydrated between activities, and a plastic cup/plate/cutlery set covers meals and Mammy Market food.",
      where: "Any supermarket / market",
      cost: "₦1,000 – ₦3,000",
      time: "Before departure",
      prereq: "None",
    },
  ],
  relatedChecklists: [
    { _key: "rel-reg", _type: "reference", _ref: REG_ID },
  ],
};

const saved = await client.createOrReplace(doc);
console.log("Saved checklist:", saved._id, "→ /checklist/" + slug);

// Cross-link: add the camp checklist to the Registration checklist's "related" list (idempotent).
const reg = await client.fetch(
  `*[_id == $id][0]{ "refs": relatedChecklists[]._ref }`,
  { id: REG_ID }
);
if (reg && (reg.refs || []).includes(ID)) {
  console.log("Cross-link already present; nothing to do.");
} else {
  await client
    .patch(REG_ID)
    .setIfMissing({ relatedChecklists: [] })
    .insert("after", "relatedChecklists[-1]", [
      { _key: "rel-camp", _type: "reference", _ref: ID },
    ])
    .commit();
  console.log("Linked camp checklist into NYSC Registration related list.");
}
