/*
 * NYSC Camp Checklist — page content.
 *
 * All copy and data for /guides/nysc-camp-checklist lives here so the page
 * can be updated each batch without touching layout code. The JSON-LD in
 * page.tsx is generated from these same structures, so the structured data
 * can never drift from what readers actually see.
 *
 * ── UPDATE CADENCE ──────────────────────────────────────────────────────
 * Review at the start of each batch cycle (roughly February, May/June,
 * October). The volatile fields are:
 *   - LAST_UPDATED and BATCH_COVERAGE
 *   - CORPS_ALLOWANCE (federal monthly allowance)
 *   - the registration fee in `sequence` step 4 and `faqs`
 *   - NERD agent pricing in `sourcing` and `costs`
 * Everything else is stable between batches.
 *
 * House style: no em dashes in visible copy (commas, colons, periods or
 * parentheses instead).
 */

export const LAST_UPDATED = "26 August 2026";
export const LAST_UPDATED_ISO = "2026-08-26";
export const BATCH_COVERAGE = "Covers 2026 Batch B and C";
export const CORPS_ALLOWANCE = "₦77,000";

/** Slug of the gated PDF in Sanity (`resource` document). */
export const PDF_RESOURCE_SLUG = "nysc-camp-ready-checklist-pdf";

export const PAGE_TITLE = "The NYSC Camp Checklist";

export const INTRO = [
  "Camp registration works on one rule: you either have the papers or you go home. Every batch, graduates travel across the country, reach the gate, and get turned back over a single missing sheet, usually not because it was hard to get, but because nobody told them in the right order.",
  "This is the whole thing, in the order it actually happens: what to do before the portal opens, what to carry to the gate, where each document physically comes from, what it costs, and what to pack for 21 days.",
];

/* ─── Contents / jump links ──────────────────────────────── */

export const contents = [
  { id: "three-gates", label: "The three gates" },
  { id: "sequence", label: "The full sequence" },
  { id: "documents", label: "Documents to carry" },
  { id: "sourcing", label: "Where to get each one" },
  { id: "costs", label: "What it costs" },
  { id: "packing", label: "What to pack" },
  { id: "banned", label: "Banned items" },
  { id: "arrival", label: "Arrival day" },
  { id: "mistakes", label: "Mistakes that send people home" },
  { id: "faq", label: "FAQ" },
] as const;

/* ─── Section 1: the three gates ─────────────────────────── */

export type Gate = {
  n: string;
  name: string;
  body: string;
  color: string;
};

export const gates: Gate[] = [
  {
    n: "01",
    name: "Your school",
    body: "Your name has to reach NYSC through the senate list. Your school controls this. Your job is to chase it.",
    color: "#efd536",
  },
  {
    n: "02",
    name: "The portal",
    body: "Online registration, biometrics, payment, green card. This is where name and date-of-birth mismatches kill people.",
    color: "#8bcef7",
  },
  {
    n: "03",
    name: "The camp gate",
    body: "Physical documents in a physical folder. No portal, no screenshots, no “it’s in my email.” Paper.",
    color: "#ccbaf8",
  },
];

export const GATES_KICKER =
  "Most people prepare heavily for Gate 2 and get destroyed at Gate 3.";

/* ─── Section 2: the full sequence (HowTo) ───────────────── */

export type Step = {
  name: string;
  body: string;
};

export const sequence: Step[] = [
  {
    name: "Clear your school",
    body: "Library, bursary, department, hostel. Until you owe nothing, your name does not go up.",
  },
  {
    name: "Get NERD clearance",
    body: "Upload your final-year project to the Nigeria Education Repository and Databank, pass the plagiarism check, get supervisor and HOD approval, print the clearance slip. Mandatory since October 2025: no NERD slip, no camp registration.",
  },
  {
    name: "Confirm you are on the senate list",
    body: "Check at portal.nysc.org.ng with your institution, matric number and surname. If your name is not there after a couple of weeks, go to Student Affairs in person.",
  },
  {
    name: "Register online",
    body: "The portal opens for roughly one week per batch. Create a profile with a working email and Nigerian phone number, fill in your details, then go physically to an NYSC-accredited centre for biometric capture. Registration by proxy is prohibited and triggers disqualification. The official fee is around ₦3,000, and centres add charges on top.",
  },
  {
    name: "Print and sign your green card",
    body: "This is your registration summary slip and it is a camp-gate document. Print spares now.",
  },
  {
    name: "Wait for your call-up number",
    body: "It appears on your dashboard. This is your signal to start spending and packing.",
  },
  {
    name: "Print your call-up letter",
    body: "Released a few days before camp. In recent batches that has been the Monday before a Wednesday reporting date. It carries your state of deployment and your camp address. Print it in colour.",
  },
  {
    name: "Report to camp",
    body: "21 days. Arrive early on the opening day.",
  },
];

export const SEQUENCE_KICKER =
  "Steps 1 to 3 can take months and are largely outside your control. Steps 6 to 8 can take four days and will feel like an ambush. Prepare during the waiting.";

/* ─── Section 3: camp-gate documents (ItemList) ──────────── */

export type GateDoc = {
  document: string;
  carry: string;
  notes: string;
};

export const gateDocs: GateDoc[] = [
  { document: "Call-up letter", carry: "Original + 5 copies", notes: "Print in colour" },
  { document: "Green card (registration slip)", carry: "Original + 2 copies", notes: "Must be signed" },
  { document: "Statement of Result or Certificate", carry: "Original + 5 copies", notes: "School-endorsed" },
  { document: "School ID card", carry: "Original + 2 copies", notes: "Final-year ID. UNILAG students: your photocard" },
  { document: "Medical fitness certificate", carry: "Original + 2 copies", notes: "Government or military hospital only, signed and stamped" },
  { document: "NERD clearance slip", carry: "Original + 2 copies", notes: "From your NERD dashboard" },
  { document: "NIN slip", carry: "Original + 2 copies", notes: "Name must match your result" },
  { document: "Passport photographs", carry: "12", notes: "White background. 8 for registration, 4 spare" },
];

export const DOCS_INTRO =
  "One folder, waterproof, at the top of your bag. Do not laminate anything.";

export type ConditionalDoc = {
  who: string;
  needs: string;
};

export const conditionalDocs: ConditionalDoc[] = [
  {
    who: "Polytechnic graduates",
    needs: "Your OND certificate, original plus copies. Checked at the gate.",
  },
  {
    who: "Licensed professionals",
    needs: "Doctors, nurses and pharmacists: your professional licence or registration certificate, original plus copies.",
  },
  {
    who: "Married women",
    needs: "Marriage certificate, evidence of change of name, and evidence of your husband’s place of domicile. These are also uploaded during online registration and support a relocation request.",
  },
  {
    who: "Foreign-trained graduates",
    needs: "International passport including the data page and entry/exit stamps, evidence your institution is accredited, and certified English translations of non-English credentials.",
  },
];

export const DOCS_KICKER =
  "Photocopy everything at home. Camp towns run out of paper, power and patience on reporting day.";

/* ─── Section 4: where to get each document ──────────────── */

export type SourcingEntry = {
  title: string;
  from: string;
  cost?: string;
  time?: string;
  watch: string;
};

export const sourcing: SourcingEntry[] = [
  {
    title: "NERD clearance slip",
    from: "The NERD portal, through your institution or an accredited NERD Digital Service Centre.",
    cost: "Free if you upload it yourself and your school allows that. Accredited agents commonly charge ₦10,000 to ₦20,000.",
    time: "Days to weeks. It needs supervisor and HOD approval after the automated plagiarism check.",
    watch:
      "Schools handle this very differently. Ask your own department rather than copying a friend at another school. The portal is slow during peak periods, and late-night attempts work better.",
  },
  {
    title: "Senate list confirmation",
    from: "portal.nysc.org.ng, and your school’s Student Affairs / DSA office.",
    cost: "Free.",
    watch:
      "Schools upload in batches, so a missing name is not automatically a crisis. But if two weeks pass, go in person with your clearance form.",
  },
  {
    title: "Green card",
    from: "Printed by you from the NYSC portal after registration and payment.",
    watch:
      "It has to be signed. Unsigned green cards get bounced at the documentation desk.",
  },
  {
    title: "Medical fitness certificate",
    from: "A government or military hospital: general hospitals, federal medical centres, teaching hospitals. Private clinics are not accepted.",
    cost: "Government hospitals typically ₦5,000 to ₦15,000 for the full package, teaching hospitals ₦10,000 to ₦20,000. Some general hospitals charge much less if you are only paying for tests.",
    time: "Often same day if you arrive early.",
    watch:
      "It must be signed and stamped by a doctor employed by that hospital. Ask for a breakdown of what is included before paying. It is generally treated as valid for three months, so do not get it too early either. Take two passport photographs with you.",
  },
  {
    title: "Call-up letter",
    from: "Your NYSC dashboard, a few days before camp.",
    watch:
      "Download it the moment it appears. The portal struggles in the 48 hours after release.",
  },
  {
    title: "Passport photographs",
    from: "Any photo studio.",
    cost: "₦2,000 to ₦5,000 for twelve.",
    watch:
      "White background, plain top, no jewellery. Print extras, because you will be asked for passports repeatedly all service year.",
  },
];

export const SOURCING_WARNING =
  "No one can sell you a shortcut. Forged medical certificates and fake results are checked at camp. Being caught means being decamped: you lose the batch and the year.";

/* ─── Section 5: costs ───────────────────────────────────── */

export type CostRow = {
  item: string;
  lean: string;
  comfortable: string;
};

export const costs: CostRow[] = [
  { item: "NERD clearance", lean: "₦0 (self-upload)", comfortable: "₦20,000 (agent)" },
  { item: "Registration + biometrics", lean: "₦3,000", comfortable: "₦10,000" },
  { item: "Medical fitness certificate", lean: "₦5,000", comfortable: "₦20,000" },
  { item: "Passport photographs (12)", lean: "₦2,000", comfortable: "₦5,000" },
  { item: "Printing, photocopies, folder", lean: "₦1,500", comfortable: "₦4,000" },
  { item: "Transport to camp", lean: "₦5,000", comfortable: "₦50,000" },
  { item: "Whites, canvas, socks", lean: "₦20,000", comfortable: "₦60,000" },
  { item: "Toiletries, bucket, net, bedding", lean: "₦12,000", comfortable: "₦30,000" },
  { item: "Provisions and snacks", lean: "₦8,000", comfortable: "₦20,000" },
  { item: "Power bank, torch, pouch, padlock, fan", lean: "₦12,000", comfortable: "₦40,000" },
  { item: "Cash to carry into camp", lean: "₦20,000", comfortable: "₦35,000" },
];

export const COSTS_TOTAL = { lean: "≈ ₦88,500", comfortable: "≈ ₦294,000" };

export const COSTS_INTRO =
  "Realistic ranges as of August 2026. Your state, your school and your habits will move them.";

export const costNotes: { heading: string; body: string }[] = [
  {
    heading: "The allowance is fixed, the top-up is not",
    body: `The federal corps allowance has been ${CORPS_ALLOWANCE} a month since March 2025. Some states pay an additional allowance, many pay it late or not at all. Plan on ${CORPS_ALLOWANCE}.`,
  },
  {
    heading: "It does not arrive immediately",
    body: "Budget to fund camp and your first weeks at your PPA yourself.",
  },
  {
    heading: "Carry physical cash",
    body: "Most camps have no ATM on site, network coverage is unreliable, POS queues are long, and vendors inside charge a premium on everything.",
  },
];

/* ─── Section 6: packing ─────────────────────────────────── */

export const ISSUED_KIT =
  "Khaki jacket and trousers, khaki cap, two NYSC white T-shirts, white shorts, jungle boots, white socks, crested vest. Sizing is unreliable, especially boots. Replacement khaki sets are sold inside camp, usually around ₦4,000 to ₦5,000.";

export type ClothingRow = {
  item: string;
  qty: string;
  note: string;
};

export const clothing: ClothingRow[] = [
  { item: "Plain white round-neck T-shirts", qty: "5 to 7", note: "No prints or logos" },
  { item: "White shorts, knee length", qty: "5 to 7", note: "Plain" },
  { item: "White canvas / sneakers", qty: "1 pair", note: "Break them in first" },
  { item: "White socks", qty: "7 pairs", note: "" },
  { item: "Plain mufti (non-white)", qty: "3 to 5 outfits", note: "Evenings and off-duty" },
  { item: "Bathroom slippers", qty: "1 pair", note: "" },
  { item: "Bedsheet and pillowcase", qty: "1 set", note: "" },
  { item: "Light blanket or duvet", qty: "1", note: "Nights get cold, especially up north" },
  { item: "Traditional attire", qty: "1", note: "Carnival day" },
  { item: "Underwear and singlets", qty: "21 days’ worth", note: "Plain white or nude, because colour shows through white shorts" },
  { item: "Sports bras", qty: "4 to 5", note: "More practical than underwire during drills" },
];

export type PackGroup = {
  heading: string;
  intro?: string;
  items: string[];
  /** Items worth setting in bold because people forget them and suffer. */
  emphasis?: string[];
};

export const packGroups: PackGroup[] = [
  {
    heading: "Toiletries and washing",
    items: [
      "Bucket (most camps are bucket-wash)",
      "Small bowl",
      "Bathing soap and sponge",
      "Two towels",
      "Toothbrush and toothpaste",
      "Roll-on deodorant",
      "Body lotion",
      "Shaving supplies or clippers",
      "Toilet roll (more than you think)",
      "Detergent and hypo bleach",
      "Small mirror and comb",
      "Sanitary pads or tampons, 2 to 3 packs",
      "Skincare and hair products",
    ],
    emphasis: ["Mosquito net and rope to hang it. Not optional."],
  },
  {
    heading: "Food",
    intro: "Cooking is strictly prohibited. Ready-to-eat only.",
    items: [
      "Garri, milk, sugar",
      "Milo or cocoa",
      "Golden Morn or instant cereal",
      "Noodles you can soak in hot water",
      "Biscuits, groundnuts, chin chin",
      "Peanut butter",
      "Plate, bowl, cup, spoon",
      "Water and juice for day one",
    ],
  },
  {
    heading: "Power, security and gadgets",
    items: [
      "Phone and charger",
      "Waist pouch for the parade ground",
      "Torch or rechargeable lamp",
      "Rechargeable fan",
      "Two padlocks",
      "Cash in notes",
    ],
    emphasis: ["Power bank, 10,000mAh minimum. Camp power runs a few hours a day."],
  },
  {
    heading: "Health",
    items: [
      "Paracetamol",
      "Antimalarial (ask your doctor about prophylaxis before you travel)",
      "Oral rehydration salts",
      "Your usual pain relief",
      "Plasters and bandages",
      "Hand sanitiser and insect repellent",
    ],
    emphasis: [
      "Any prescription medication for 21 days plus a buffer. Tell the camp clinic about any chronic condition on arrival.",
    ],
  },
  {
    heading: "Stationery and odds",
    items: [
      "Notebook and several pens for SAED sessions and lectures",
      "Transparent waterproof bag for documents",
      "Hangers, pegs, laundry rope",
      "Small umbrella",
      "Stapler",
    ],
  },
];

/* ─── Section 7: banned items ────────────────────────────── */

export const BANNED_INTRO =
  "Bags are searched at the gate. Prohibited items are seized, and in some cases you face a disciplinary panel.";

export const banned = [
  "Electric stoves and hot plates",
  "Gas cookers",
  "Laptops",
  "Tablets",
  "Extension cords",
  "Knives and sharp objects",
  "Weapons of any kind",
  "Alcohol",
  "Political materials",
  "Anything associated with secret societies",
];

export const bannedSometimes = ["Glass mirrors", "Forks", "Expensive jewellery"];

export const BANNED_KICKER =
  "Laptops and tablets are usually returned after the three weeks, but you will not have them during camp. Plan around that.";

/* ─── Section 8: arrival day ─────────────────────────────── */

export const arrival = [
  "Gate: documents and medical certificate checked",
  "Security screening: bags searched",
  "Hostel allocation",
  "Collect mattress from the store",
  "Document verification unit",
  "Biometric capture",
  "State code issued",
  "Bank account opened, if required",
  "Kit collection, then platoon",
];

export const arrivalNotes: { heading: string; body: string }[] = [
  {
    heading: "Your platoon",
    body: "Your platoon number is usually the last digit of your state code.",
  },
  {
    heading: "In your first hour",
    body: "Set up your mosquito net, padlock your bag and locker, greet the people around your bunk, and do not leave anything unattended.",
  },
  {
    heading: "Arrive early",
    body: "Hundreds of people arrive at once. Early means a better bunk, a shorter queue and time to set up. Late means darkness and whatever is left. And do not travel at night: NYSC repeats this warning every batch for good reason.",
  },
];

/* ─── Section 9: mistakes ────────────────────────────────── */

export type Mistake = {
  title: string;
  body?: string;
};

export const mistakes: Mistake[] = [
  {
    title: "Name or date-of-birth mismatch across NIN, JAMB and your result",
    body: "Blocks registration entirely. Fix it months ahead, because it cannot be fixed during registration week.",
  },
  {
    title: "No NERD clearance slip",
    body: "Mandatory since October 2025. Everything else can be perfect and you will still be turned back.",
  },
  { title: "A medical certificate from a private clinic", body: "Not accepted." },
  { title: "An unsigned green card" },
  {
    title: "Planning to photocopy at camp",
    body: "The business centre will be overwhelmed.",
  },
  { title: "Laminated documents", body: "They need to handle and stamp them." },
  { title: "A black-and-white call-up letter" },
  {
    title: "Assuming your school handled NERD for you",
    body: "Confirm, in person, that your slip has actually been generated.",
  },
];

/* ─── FAQ (FAQPage) ──────────────────────────────────────── */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do I need the NERD clearance slip?",
    a: "Yes. Since October 2025, every prospective corps member must have their final-year project deposited and verified in the Nigeria Education Repository and Databank, and must present the clearance slip at camp registration. It applies to foreign-trained graduates too, through a separate enrolment route.",
  },
  {
    q: "How much does NYSC registration cost?",
    a: "The official online registration fee is around ₦3,000. Accredited centres and cybercafés add their own charges for biometric capture and printing, so most people spend ₦5,000 to ₦10,000 in total at that stage.",
  },
  {
    q: "Can someone register on my behalf?",
    a: "No. Biometric capture must be done in person at an NYSC-accredited centre. Registration by proxy is prohibited and can trigger disqualification. Never share your portal login with an agent.",
  },
  {
    q: "Can I use a private hospital for my medical fitness certificate?",
    a: "No. It must come from a government or military hospital, and it must be both signed and stamped by a doctor employed there.",
  },
  {
    q: "How many passport photographs do I need?",
    a: "Twelve is the safe number: eight for registration and four spare. You will be asked for passports repeatedly throughout the service year, so print extras.",
  },
  {
    q: "When does the call-up letter come out?",
    a: "A few days before camp opens. In recent batches it has been released on the Monday before a Wednesday reporting date. Download it the moment it appears, because the portal gets congested immediately after release.",
  },
  {
    q: "How much cash should I take to camp?",
    a: "Between ₦20,000 and ₦35,000 covers personal expenses for the three weeks for most people. Take it in physical notes. Most camps have no ATM on site.",
  },
  {
    q: "What is the monthly corps allowance?",
    a: `${CORPS_ALLOWANCE} from the federal government, in place since March 2025. Some states pay an additional allowance on top, but it varies widely and is not reliable.`,
  },
  {
    q: "My name is not on the senate list. What do I do?",
    a: "Wait a week, because schools upload in batches. If it still is not there, go physically to your Student Affairs or DSA office with your clearance documentation and ask them to confirm you were included in the upload.",
  },
  {
    q: "Can I bring my laptop?",
    a: "No. Laptops, tablets and extension cords are banned in most camps. They are typically seized and returned after the three weeks.",
  },
];

/* ─── Related on Credentia ───────────────────────────────── */

/*
 * Only real, published checklists are linked here. The spec also wanted
 * standalone pages for the NERD clearance slip, Statement of Result,
 * Medical Certificate of Fitness and Certificate of Exemption. Those do not
 * exist in the CMS yet, so they are deliberately not linked: a dead internal
 * link costs more than a missing one.
 */
export const relatedChecklists: { title: string; blurb: string; slug: string }[] = [
  {
    title: "NYSC Registration",
    blurb: "The portal stage, step by step, with every document it asks for.",
    slug: "nysc-registration",
  },
  {
    title: "NYSC Camp Day (What to Pack)",
    blurb: "The packing list as a tickable checklist you can work through.",
    slug: "nysc-camp-day-checklist",
  },
  {
    title: "NIN Enrollment",
    blurb: "Get your NIN, or fix a name that does not match your result.",
    slug: "nin-enrollment",
  },
  {
    title: "JAMB UTME Registration",
    blurb: "Where your JAMB result slip and matriculation list come from.",
    slug: "jamb-utme-registration",
  },
  {
    title: "International Passport (New / Renewal)",
    blurb: "Needed by foreign-trained graduates at the camp gate.",
    slug: "passport-new-renewal",
  },
  {
    title: "University Admission",
    blurb: "Where the Statement of Result sits in the longer paper trail.",
    slug: "university-admission",
  },
];

export const RELATED_GUIDE = {
  title: "NYSC, honestly: what nobody tells you about camp, money, and the year ahead",
  slug: "nysc-honestly-camp-money-year-ahead",
};

/* ─── Source and disclaimer ──────────────────────────────── */

export const SOURCE_NOTE = `Compiled August 2026 from official NYSC guidance, current mobilisation reporting, and first-hand accounts from corps members who served in 2026. Costs and requirements change between batches. Always confirm against portal.nysc.org.ng and your institution’s Student Affairs office. Credentia is not affiliated with the National Youth Service Corps.`;
