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
      title: "Call-up letter (original + 5 copies)",
      description:
        "Your single most important document. Print the original plus 5 photocopies — in colour. Black-and-white call-up letters get rejected at the gate. It carries your state of deployment and your camp address, so confirm the location from here and nowhere else. Released a few days before camp (in recent batches, the Monday before a Wednesday reporting date) — download it the moment it appears, as the portal congests fast. Do not laminate it.",
      where: "NYSC dashboard (portal.nysc.org.ng), a few days before camp",
      cost: "₦100 – ₦500 (colour printing)",
      time: "Same day",
      prereq: "Call-up number issued on your dashboard",
    },
    {
      _key: "green-card",
      title: "Green card / registration slip (original + 2 copies)",
      description:
        "The registration summary slip generated when you finished online registration. It must be signed — unsigned green cards get bounced at the documentation desk. Bring the original plus 2 copies.",
      where: "Printed by you from the NYSC portal after registration and payment",
      cost: "₦100 – ₦500 (printing)",
      time: "Same day",
      prereq: "Completed online registration and payment",
    },
    {
      _key: "result",
      title: "Statement of Result / degree certificate (original + 5 copies)",
      description:
        "Proof you graduated, school-endorsed (on letterhead with official stamp). Bring the original and 5 photocopies — verification officers keep copies while you keep the original on you at all times. Do not laminate it.",
      where: "Your university / institution",
      cost: "Free – ₦5,000",
      time: "1–4 weeks if not yet collected",
      prereq: "Graduated and mobilised",
    },
    {
      _key: "nerd",
      title: "NERD clearance slip (original + 2 copies)",
      description:
        "Mandatory since October 2025 — no NERD slip, no camp registration, and it's checked again at the gate. You upload your final-year project to the Nigeria Education Repository and Databank, pass the plagiarism check, get supervisor and HOD approval, then print the clearance slip. Don't assume your school did it for you — confirm in person that your slip has actually been generated.",
      where: "NERD portal, via your institution or an accredited NERD Digital Service Centre",
      cost: "Free (self-upload) – ₦20,000 (accredited agent)",
      time: "Days to weeks (needs supervisor + HOD approval)",
      prereq: "Completed final-year project",
    },
    {
      _key: "id",
      title: "School ID card (original + 2 copies)",
      description:
        "Your final-year student ID card, original plus 2 copies, used as backup identification during verification. (UNILAG students: bring your photocard.)",
      where: "You already have it",
      cost: "Free",
      time: "N/A",
      prereq: "None",
    },
    {
      _key: "medical",
      title: "Medical fitness certificate (original + 2 copies)",
      description:
        "From a government or military hospital only — private clinics are NOT accepted. It must be both signed and stamped by a doctor employed at that hospital. Take two passport photos with you. It's treated as valid for about three months, so don't get it too early either. Some camps also re-test on arrival.",
      where: "Government or military hospital (general, federal medical centre or teaching hospital)",
      cost: "₦5,000 – ₦20,000",
      time: "Often same day if you arrive early",
      prereq: "None",
    },
    {
      _key: "nin",
      title: "NIN slip (original + 2 copies)",
      description:
        "Your National Identification Number slip is part of standard identity verification at camp. The name on it must match your result — a mismatch across NIN, JAMB and your result blocks registration, so fix it months ahead, not during registration week.",
      where: "NIMC office or nimc.gov.ng",
      cost: "Free",
      time: "1–3 days",
      prereq: "Enrolled for NIN",
    },
    {
      _key: "photos",
      title: "Passport photographs (12, white background)",
      description:
        "Bring 12 recent passport photos on a white background — 8 for registration and 4 spare. Plain top, no jewellery. You'll be asked for passports repeatedly all service year, so print extras.",
      where: "Any photo studio",
      cost: "₦2,000 – ₦5,000 (for 12)",
      time: "Same day",
      prereq: "None",
    },
    {
      _key: "cash",
      title: "Cash for camp (₦20,000 – ₦35,000)",
      description:
        "The federal allowance (₦77,000/month since March 2025) does NOT arrive until after camp, so carry your own money — in physical notes. It covers your mattress, kit, Mammy Market food and provisions for the full three weeks. Most camps have no ATM on site, network coverage is unreliable, POS queues are long, and vendors inside charge a premium on everything.",
      where: "Withdraw before you travel",
      cost: "₦20,000 – ₦35,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "whites",
      title: "White round-neck T-shirts & white shorts",
      description:
        "The unofficial camp uniform for morning drills and parade. Bring 5–7 plain white round-neck tops (no prints or logos) and 5–7 plain knee-length white shorts — you'll sweat through them daily and laundry is basic. NYSC issues crested khaki kit at camp, but sizing is unreliable and it's rarely enough on its own; spare khaki sets sell inside camp for around ₦4,000–₦5,000.",
      where: "Any market — buy before you travel; cheaper outside camp",
      cost: "₦20,000 – ₦60,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "shoes",
      title: "White sneakers / canvas + white socks",
      description:
        "Plain white trainers for parade and drills, 7 pairs of white socks, plus a comfortable second pair of slippers/sandals for around the hostel. Break new shoes in before camp — blisters on day one are miserable.",
      where: "Any market",
      cost: "₦4,000 – ₦15,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "pouch",
      title: "Waist pouch / document pouch",
      description:
        "A small pouch you can wear under clothing to keep your documents and cash on you at all times — including on the parade ground. Theft in crowded hostels does happen — never leave documents or money in your box.",
      where: "Any market",
      cost: "₦1,000 – ₦3,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "bedding",
      title: "Mattress, bedsheets & light blanket",
      description:
        "Hostels are dormitory-style with bare bunk frames. A thin foam mattress is often sold at or near camp on arrival, but bring your own bedsheet, pillowcase and a light blanket or duvet. Nights get cold, especially up north.",
      where: "Market before travel; foam often bought at camp",
      cost: "₦5,000 – ₦15,000",
      time: "Before departure / on arrival",
      prereq: "None",
    },
    {
      _key: "toiletries",
      title: "Bucket, toiletries & personal medication",
      description:
        "Most camps are bucket-wash, so bring a bucket and bowl plus a full toiletry kit (soap, sponge, two towels, toothbrush/paste, deodorant, toilet roll, detergent, sanitary items). Add a small health kit: paracetamol, oral rehydration salts, plasters, hand sanitiser, and any prescription medication for 21 days plus a buffer. Tell the camp clinic about any chronic condition on arrival — it handles emergencies only.",
      where: "Any pharmacy / supermarket",
      cost: "₦12,000 – ₦30,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "power",
      title: "Power bank (10,000mAh+), torch & charger",
      description:
        "Camp power runs only a few hours a day, so a power bank of at least 10,000mAh and a torch (or rechargeable lamp) are essential for night movement and charging your phone. Label your charger — communal charging points lose cables constantly. A small rechargeable fan is worth it. Note: laptops, tablets and extension cords are banned at most camps and seized at the gate.",
      where: "Any electronics store",
      cost: "₦12,000 – ₦40,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "padlock",
      title: "Padlocks (bring two)",
      description:
        "Two sturdy padlocks to secure your box and locker in the hostel — one as a spare. This is your main defence against opportunistic theft. Padlock your bag and locker within your first hour at camp.",
      where: "Any market",
      cost: "₦1,000 – ₦3,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "net",
      title: "Mosquito net (+ rope) / insect repellent",
      description:
        "Camps are often on semi-rural land where mosquitoes are heavy. A treated net (bring rope to hang it) or repellent protects you from malaria — falling ill in your first week is a common, avoidable setback. Not optional.",
      where: "Any pharmacy / market",
      cost: "₦1,500 – ₦4,000",
      time: "Before departure",
      prereq: "None",
    },
    {
      _key: "bottle",
      title: "Water bottle, cutlery & ready-to-eat food",
      description:
        "Cooking is strictly prohibited (ready-to-eat food only). Bring a refillable water bottle, a plate/bowl/cup/spoon, and provisions you don't cook — garri, milk, sugar, Milo, cereal, noodles you can soak, biscuits, groundnuts, peanut butter. You'll spend long hours on the parade ground in the sun, so stay hydrated.",
      where: "Any supermarket / market",
      cost: "₦8,000 – ₦20,000",
      time: "Before departure",
      prereq: "None",
    },
  ],
  relatedChecklists: [
    { _key: "rel-reg", _type: "reference", _ref: REG_ID },
  ],
};

const saved = await client.createOrReplace(doc);
console.log("Saved checklist:", saved._id, "→ /checklist/" + slug, "(" + doc.documents.length + " items)");

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
