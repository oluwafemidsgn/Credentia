/**
 * Seed script — populates Sanity with all Credentia content.
 *
 * Usage:
 *   1. Copy .env.local.example → .env.local and fill in your Sanity credentials
 *   2. Add SANITY_API_WRITE_TOKEN to .env.local (needs Editor or Administrator role)
 *   3. node scripts/seed.mjs
 *
 * The script is idempotent — running it twice will update existing docs, not duplicate them.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      if (key) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {
    console.error("❌  .env.local not found. Copy .env.local.example and fill in the values.");
    process.exit(1);
  }
}

loadEnv();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-06-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// ── Categories ───────────────────────────────────────────────────────────────

const categories = [
  {
    _id: "category-education",
    _type: "category",
    label: "Education",
    id: { _type: "slug", current: "education" },
    color: "#efd536",
    textColor: "#292929",
    descColor: "#505050",
    description: "University admissions, JAMB, NYSC, scholarships, and student documents.",
    homepageName: "Education",
    order: 1,
  },
  {
    _id: "category-travel",
    _type: "category",
    label: "Travel",
    id: { _type: "slug", current: "travel" },
    color: "#8bcef7",
    textColor: "#292929",
    descColor: "#505050",
    description: "Passports, visas, travel documents, and international clearance.",
    homepageName: "Travel",
    order: 2,
  },
  {
    _id: "category-civic",
    _type: "category",
    label: "Civic",
    id: { _type: "slug", current: "civic" },
    color: "#ddf07c",
    textColor: "#292929",
    descColor: "#505050",
    description: "NIN, PVC, birth certificate, marriage, driver's licence, and national ID.",
    homepageName: "Civic",
    order: 3,
  },
  {
    _id: "category-property",
    _type: "category",
    label: "Property",
    id: { _type: "slug", current: "property" },
    color: "#6f00ed",
    textColor: "#ffffff",
    descColor: "#d6d6d6",
    description: "Land purchase, C of O, building permits, deeds, and mortgage documents.",
    homepageName: "Property",
    order: 4,
  },
];

// ── University Admission Checklist ───────────────────────────────────────────

const universityAdmission = {
  _id: "checklist-university-admission",
  _type: "checklist",
  title: "University Admission",
  slug: { _type: "slug", current: "university-admission" },
  category: { _type: "reference", _ref: "category-education" },
  location: "Lagos",
  updatedDate: "May 2026",
  sortedCount: 2,
  documents: [
    {
      _key: "doc-waec",
      title: "WAEC / NECO result",
      description:
        "Proves you completed secondary school. Both JAMB and the university verify it directly, so the result must match your other names exactly.",
      where: "waecdirect.org",
      cost: "Free – ₦5,000",
      time: "Instant (online)",
      prereq: "Exam already sat",
    },
    {
      _key: "doc-jamb",
      title: "JAMB result slip",
      description:
        "Your JAMB score determines which course and university you qualify for. Download the slip from the JAMB portal after results are released.",
      where: "jamb.gov.ng",
      cost: "Free",
      time: "Instant (online)",
      prereq: "JAMB exam taken",
    },
    {
      _key: "doc-birth",
      title: "Birth certificate",
      description:
        "Used to verify your age and identity during the admission process. Ensure the name matches exactly what's on your WAEC and JAMB results.",
      where: "NPC office or hospital of birth",
      cost: "₦2,500 – ₦5,000",
      time: "1–4 weeks",
      prereq: "None",
    },
    {
      _key: "doc-origin",
      title: "Certificate of origin",
      description:
        "Required by most federal universities for state quota purposes. Issued by your local government office or your state government liaison office.",
      where: "Local Government Secretariat",
      cost: "₦1,000 – ₦5,000",
      time: "1–2 weeks",
      prereq: "Valid ID",
    },
    {
      _key: "doc-photos",
      title: "Passport photographs",
      description:
        "White background, recent (within 3 months). Most universities require 4–6 copies in different sizes for various forms during registration.",
      where: "Any photo studio",
      cost: "₦500 – ₦2,000",
      time: "Same day",
      prereq: "None",
    },
  ],
  relatedChecklists: [],
};

// ── Blog Posts ───────────────────────────────────────────────────────────────

const blogPosts = [
  {
    _id: "blog-renew-passport-2026",
    _type: "blogPost",
    title: "How to renew your passport in 2026",
    slug: { _type: "slug", current: "renew-passport-2026" },
    postType: "Guide",
    category: "guides",
    readTime: "6 MIN",
    publishedDate: "MAY 2026",
    excerpt: "The new NIS process, step by step.",
    image: "/assets/blog-1.svg",
    featured: true,
    lead: "The Nigeria Immigration Service (NIS) updated its passport renewal process at the start of 2026, introducing mandatory online pre-registration for all applicants. If you walked into a passport office without booking first, you were turned back. Here is exactly what the new process looks like and how to get through it without wasting a trip.",
    sections: [
      {
        _key: "sec-1",
        heading: "What changed in 2026",
        body: "The biggest shift is the end of walk-in applications at all NIS offices in Lagos. Every applicant must now book a slot on the NIS portal (immigration.gov.ng) before showing up. This was introduced to reduce queue congestion and cut out touts who used to sell slot positions outside the gates.\n\nThe fee structure also changed. Standard booklets (32 pages) now cost ₦35,000, while the 64-page international booklet is ₦70,000. Emergency processing — still available — is ₦85,000 for 72-hour turnaround, but slots are extremely limited.",
      },
      {
        _key: "sec-2",
        heading: "Step-by-step: book and show up",
        body: "Start at immigration.gov.ng and create an account using your NIN. Once logged in, select \"Passport Renewal,\" choose your nearest office, and pick an available date. Pay the fee online — bank card or USSD both work. You will receive a confirmation email with a QR code.\n\nOn your appointment day, bring your expired or expiring passport, the printed or digital QR code, two passport photographs (white background, taken within 3 months), and your NIN slip. Biometrics — fingerprints and photo — will be captured at the office. The whole visit usually takes under 45 minutes if you have everything.",
      },
      {
        _key: "sec-3",
        heading: "How long does collection take?",
        body: "Standard processing is 6–8 weeks from your appointment date. NIS will send an SMS when your booklet is ready for collection at the office you registered. You must collect it in person — no agents or proxies are accepted.\n\nIf you are travelling sooner, emergency processing can be done in 3 business days but requires you to show proof of travel (flight booking or visa appointment letter). Emergency slots open every Monday morning and fill within hours.",
      },
    ],
    takeaways: [
      "Book your appointment at immigration.gov.ng before visiting — walk-ins are no longer accepted",
      "Standard processing costs ₦35,000 (32 pages) or ₦70,000 (64 pages)",
      "Bring your expired passport, QR confirmation, two photographs, and your NIN slip",
      "Allow 6–8 weeks for standard delivery; emergency slots are available for ₦85,000",
    ],
  },
  {
    _id: "blog-nin-vs-bvn",
    _type: "blogPost",
    title: "NIN vs BVN: what's the difference?",
    slug: { _type: "slug", current: "nin-vs-bvn" },
    postType: "Explainer",
    category: "explainers",
    readTime: "6 MIN",
    publishedDate: "MAY 2026",
    excerpt: "And why you need both.",
    image: "/assets/blog-2.svg",
    featured: false,
    lead: "Both are 11-digit identification numbers issued by Nigerian government bodies, and both are frequently requested when you are trying to open an account, apply for a document, or register for a service. But they are not the same thing, and confusing them has caused people to arrive at banks or government offices with the wrong document. Here is a clear breakdown.",
    sections: [
      {
        _key: "sec-1",
        heading: "What is the NIN?",
        body: "The National Identification Number (NIN) is issued by the National Identity Management Commission (NIMC). It is your lifetime biometric identity number — linked to your fingerprints, face photo, and demographic data. Every Nigerian citizen and legal resident is entitled to one.\n\nYou get your NIN by enrolling at a NIMC enrolment centre. The process captures your fingerprints and photograph, and your NIN is issued (usually within a few days). Your NIN slip or virtual NIN (vNIN) is what you present as proof.",
      },
      {
        _key: "sec-2",
        heading: "What is the BVN?",
        body: "The Bank Verification Number (BVN) is issued by the Central Bank of Nigeria (CBN) through the banking system. It is specifically a banking identity number, introduced in 2014 to reduce fraud across Nigerian bank accounts. When you enrol for a BVN at any bank branch, your fingerprints and face are captured and linked to a single 11-digit number.\n\nThe critical difference: your BVN ties together all your bank accounts across all Nigerian banks. If you have accounts at GTBank, Access, and First Bank, they all connect to the same BVN. This means the CBN can track financial activity across the system.",
      },
      {
        _key: "sec-3",
        heading: "When do you need each one?",
        body: "You need your NIN for almost everything outside the banking system: passport applications, SIM card registration, JAMB, NYSC, school admissions, government benefits, and driving licence applications. NIMC is steadily becoming the central hub of Nigerian identity — if a government service asks for ID, it is asking for NIN.\n\nYour BVN is required for anything inside the financial system: opening or upgrading a bank account, getting a loan, using a fintech app, or receiving transfers above certain thresholds. Some employers also request it during payroll setup.\n\nIn short: NIN is your national identity. BVN is your banking identity. You will need both at some point, and they are not interchangeable.",
      },
    ],
    takeaways: [
      "NIN is issued by NIMC and covers government and civic purposes",
      "BVN is issued via the banking system and covers all financial activity",
      "Both are 11 digits but link to completely separate databases",
      "Enrol for NIN at any NIMC centre; enrol for BVN at any bank branch",
    ],
  },
  {
    _id: "blog-jamb-2026-requirements",
    _type: "blogPost",
    title: "JAMB changes its 2026 requirements",
    slug: { _type: "slug", current: "jamb-2026-requirements" },
    postType: "News",
    category: "documents-news",
    readTime: "6 MIN",
    publishedDate: "MAY 2026",
    excerpt: "What's new for admission this year.",
    image: "/assets/blog-3.svg",
    featured: false,
    lead: "The Joint Admissions and Matriculation Board (JAMB) announced several significant changes to its processes and requirements ahead of the 2026 UTME cycle. Some of the changes affect documents, some affect cut-off scores, and one affects how results are verified. Here is what every prospective student and parent needs to know before registration opens.",
    sections: [
      {
        _key: "sec-1",
        heading: "NIN is now mandatory for registration",
        body: "JAMB has made NIN (National Identification Number) a hard requirement for all 2026 UTME registrations. In previous years, applicants without a NIN could still register using other identification. That route is now closed.\n\nIf you or your ward has not enrolled for NIN, visit the nearest NIMC centre or NIMC-accredited point before JAMB registration opens. The process takes 1–3 days. You will need a birth certificate or attestation letter, your parent or guardian's NIN if you are under 18, and two passport photographs.",
      },
      {
        _key: "sec-2",
        heading: "Cut-off scores and subject combinations",
        body: "JAMB has raised the general minimum score for consideration from 140 to 160 for most universities. Polytechnics remain at 120 and Colleges of Education at 100. Individual institutions can set higher thresholds — and most competitive courses (Medicine, Law, Engineering) require scores of 250 and above in practice.\n\nSubject combination requirements have also been updated for some faculties. Notably, students applying for Computer Science, Data Science, or related programmes at federal universities must now include Mathematics and Physics as compulsory subjects, with a third subject from Economics or Further Mathematics.",
      },
      {
        _key: "sec-3",
        heading: "Result verification goes fully digital",
        body: "Starting 2026, universities will verify JAMB results directly through JAMB's API system rather than accepting printouts or candidates presenting at counters. This means your result is confirmed automatically when you submit your university admission form — you do not need to print and attach the result slip for most institutions.\n\nHowever, JAMB strongly advises keeping a printed copy for personal records, especially if your institution still uses manual processes for some forms. The printout remains valid proof if there are any system issues during admission.",
      },
    ],
    takeaways: [
      "NIN is mandatory for all 2026 UTME registrations — sort this before registration opens",
      "Minimum score for most universities rises from 140 to 160",
      "Computer Science and related fields must now include Physics as a compulsory subject",
      "University result verification is now fully digital — no physical result slip needed for most schools",
    ],
  },
  {
    _id: "blog-mastering-remote-work-tools",
    _type: "blogPost",
    title: "Mastering remote work tools",
    slug: { _type: "slug", current: "mastering-remote-work-tools" },
    postType: "Step-by-step",
    category: "guides",
    readTime: "8 MIN",
    publishedDate: "JUN 2026",
    excerpt: "The tools every remote worker needs in 2026.",
    image: "/assets/blog-1.svg",
    featured: false,
    lead: "Remote work has gone from a pandemic workaround to a permanent feature of professional life in Lagos. Whether you are freelancing, working for a local company, or handling clients abroad, the tools you use determine how professional you appear and how much you get done. Here is a practical breakdown of what actually works.",
    sections: [
      {
        _key: "sec-1",
        heading: "Communication: beyond WhatsApp",
        body: "WhatsApp remains dominant for informal coordination, but international clients and companies expect Slack or Microsoft Teams. Slack is free for small teams and integrates with almost every other tool. Teams is better if your client runs Microsoft 365. Both have mobile apps that work well on Nigerian data connections.\n\nFor video calls, Zoom and Google Meet are the standard. Google Meet requires no download and runs in a browser, which is useful when a client needs to join quickly. Zoom gives more control over recordings and breakout rooms. Loom is worth adding for asynchronous video messages — record a screen walkthrough instead of scheduling a call.",
      },
      {
        _key: "sec-2",
        heading: "Productivity and project management",
        body: "Notion has replaced scattered documents and spreadsheets for many Lagos-based freelancers. It handles notes, wikis, databases, and project boards in one place. The free plan is generous. Trello is simpler if you just need a kanban board — good for visual thinkers who want to see tasks move from To Do to Done.\n\nFor time tracking — particularly if you bill hourly — Toggl Track is the cleanest option. It runs in the background and lets you generate professional reports for clients. Clockify is the free alternative with fewer limitations.",
      },
      {
        _key: "sec-3",
        heading: "Payments and invoicing",
        body: "Getting paid reliably across borders is the real challenge. For international clients, Payoneer and Wise (formerly TransferWise) are the most reliable for receiving USD, GBP, or EUR and converting to naira. Both have become significantly easier to use in Nigeria over the past two years.\n\nFor local invoicing, Wave is free and professional — generate PDF invoices, track payments, and manage basic accounting. Zoho Invoice is a step up if you need automated reminders or recurring billing. Avoid sending plain PDF invoices without an invoice number and payment terms — it looks unprofessional and makes following up harder.",
      },
    ],
    takeaways: [
      "Use Slack or Microsoft Teams for client communication, not just WhatsApp",
      "Google Meet needs no download — best for quick client calls",
      "Toggl Track or Clockify for time tracking if you bill hourly",
      "Wise or Payoneer for receiving international payments reliably",
    ],
  },
  {
    _id: "blog-future-electric-vehicles",
    _type: "blogPost",
    title: "The future of electric vehicles",
    slug: { _type: "slug", current: "future-electric-vehicles" },
    postType: "Insight",
    category: "explainers",
    readTime: "5 MIN",
    publishedDate: "JUN 2026",
    excerpt: "What Nigerian roads will look like in five years.",
    image: "/assets/blog-2.svg",
    featured: false,
    lead: "Nigeria's vehicle fleet runs almost entirely on petrol and diesel, and the infrastructure gaps — unreliable grid power, limited charging points, and import duty complexities — have kept electric vehicles marginal. But the economics are shifting, and Lagos is starting to see real EV activity for the first time. Here is what is actually happening and what it means for the next five years.",
    sections: [
      {
        _key: "sec-1",
        heading: "Where EVs stand today in Lagos",
        body: "As of early 2026, there are fewer than 500 registered electric vehicles on Lagos roads. Most are commercial — ride-hailing operators and logistics companies that can plan routes around known charging points. The economics work for these users because they drive high daily mileages, the fuel savings are significant, and they can charge overnight at depots.\n\nFor individual consumers, the story is harder. The cheapest imported EV — mostly refurbished Nissan Leafs from Europe and Asia — costs ₦8–12 million at current exchange rates. Import duties on EVs remain the same as for petrol vehicles, which removes a major policy incentive used in other markets.",
      },
      {
        _key: "sec-2",
        heading: "Infrastructure is the real bottleneck",
        body: "Public charging infrastructure barely exists. Lagos has fewer than 30 publicly accessible EV charging points, concentrated around Lekki and VI. EKEDC and IKEDC have announced pilot programmes but deployment is slow. Solar-backed private charging — either at home or at commercial facilities — is where most current EV owners solve the problem.\n\nThe good news is that solar plus battery storage has become significantly cheaper over the past three years. An owner who already has a home solar system can add an EV charger for ₦500,000–₦1.2 million. For this subset of the market, running an EV on solar makes real financial sense.",
      },
      {
        _key: "sec-3",
        heading: "What changes in five years",
        body: "The most likely near-term driver is commercial EV adoption at scale — particularly for last-mile logistics, tricycles (keke), and BRT-style buses. LAGBUS and some private operators are already running pilot programmes with Chinese EV manufacturers. If these scale, the charging infrastructure follows, which lowers the barrier for everyone.\n\nPolicy change would accelerate this significantly. Removing or reducing import duties on EVs and charging equipment, or providing incentives for local assembly, would transform the economics overnight. Several proposals are working through the National Assembly, though timelines are unclear.",
      },
    ],
    takeaways: [
      "Fewer than 500 EVs are currently registered in Lagos, mostly commercial",
      "Public charging infrastructure is very limited — concentrated in Lekki and VI",
      "Home solar plus EV charger is the most viable current setup for early adopters",
      "Commercial EV adoption (logistics, keke, BRT) is the most likely near-term growth driver",
    ],
  },
  {
    _id: "blog-chatgpt-new-ai-wave",
    _type: "blogPost",
    title: "ChatGPT and the new AI wave",
    slug: { _type: "slug", current: "chatgpt-new-ai-wave" },
    postType: "Interview",
    category: "explainers",
    readTime: "7 MIN",
    publishedDate: "JUN 2026",
    excerpt: "How AI is changing document processing.",
    image: "/assets/blog-3.svg",
    featured: false,
    lead: "Artificial intelligence tools are increasingly touching the way Nigerians interact with paperwork — from extracting information from documents to helping fill in forms. We spoke to three professionals across law, HR, and government services about what is actually changing and what is still hype.",
    sections: [
      {
        _key: "sec-1",
        heading: "How professionals are using AI tools today",
        body: "For lawyers handling documentation-heavy work — property transactions, company registrations, affidavits — AI tools have become useful for drafting templates and flagging missing clauses. One Lagos property lawyer described using ChatGPT to generate first drafts of tenancy agreements, which are then reviewed and modified. The draft is \"never final,\" she said, but it cuts the starting time significantly.\n\nIn HR, document processing has seen the clearest wins. Scanning uploaded CVs, extracting structured information, and matching candidates to requirements is now handled by AI tools in several Lagos-based companies. What took an HR coordinator hours of manual reading can now be triaged in minutes.",
      },
      {
        _key: "sec-2",
        heading: "Government services: cautious adoption",
        body: "Government adoption is slower and more cautious, as expected. The Nigeria Immigration Service (NIS), JAMB, and NIMC have all experimented with AI-assisted processing internally, but no citizen-facing AI features have launched publicly.\n\nThe most visible change is in document verification. Several states are piloting systems that use optical character recognition (OCR) and basic AI to verify submitted documents automatically — checking that a certificate of origin matches the issuing local government's expected format, for example. These are narrow, rule-based systems more than true AI, but they are a step toward automated processing.",
      },
      {
        _key: "sec-3",
        heading: "What remains genuinely hard",
        body: "The fundamental challenge is Nigerian document diversity. Lagos alone has documents issued across dozens of local governments, agencies, and courts — with no consistent formatting, font, or layout. Training an AI to reliably extract information from this variety of documents is much harder than it is in countries with standardised government forms.\n\nFraud is the other concern. AI tools that can read documents can, theoretically, also help produce convincing fakes. Document-issuing agencies are thinking carefully about how to make their outputs machine-verifiable without creating new attack surfaces.",
      },
    ],
    takeaways: [
      "Lawyers and HR teams are the earliest professional adopters of AI for document work",
      "Government adoption is cautious and mostly back-end, not yet citizen-facing",
      "Nigerian document diversity (inconsistent formats) is a real technical challenge for AI tools",
      "Fraud prevention is a key concern as AI makes document creation easier",
    ],
  },
  {
    _id: "blog-rise-sustainable-fashion",
    _type: "blogPost",
    title: "The rise of sustainable fashion",
    slug: { _type: "slug", current: "rise-sustainable-fashion" },
    postType: "Analysis",
    category: "explainers",
    readTime: "7 MIN",
    publishedDate: "JUL 2026",
    excerpt: "How Lagos designers are going green.",
    image: "/assets/blog-1.svg",
    featured: false,
    lead: "Lagos has long been Africa's fashion capital, and a growing number of its designers are rethinking what that means — moving from fast, export-driven production toward local materials, ethical sourcing, and longer-lasting pieces. The shift is being driven partly by global market pressure and partly by a new generation of Lagos consumers who are asking different questions about what they buy.",
    sections: [
      {
        _key: "sec-1",
        heading: "Local fabrics are having a moment",
        body: "Aso-oke, adire, and ankara have always been present in Lagos fashion, but they were largely associated with traditional occasions. Over the past three years, a new wave of designers has been repositioning these fabrics as premium everyday wear — not costume, but clothing.\n\nThe appeal is economic as well as cultural. Locally woven and printed fabrics are increasingly competitive with imported alternatives after the naira depreciation, and sourcing locally means shorter, more predictable supply chains. Several Lagos-based brands have started working directly with weavers in Iseyin, Ogun State, and Abeokuta — shortening the chain from fabric to finished garment.",
      },
      {
        _key: "sec-2",
        heading: "The secondhand market is growing up",
        body: "Okirika — imported secondhand clothing — has always been part of the Lagos clothing market, but it carried a stigma. That is changing, particularly among younger buyers in their twenties who are openly enthusiastic about it. Instagram accounts dedicated to Lagos thrift finds have hundreds of thousands of followers. Dedicated thrift markets in Yaba and Tejuosho are attracting new customers who would not have considered them a few years ago.\n\nThis shift matters for sustainability because it extends the life of garments, reduces demand for new production, and creates a viable market for quality pieces that would otherwise be discarded.",
      },
      {
        _key: "sec-3",
        heading: "Challenges: cost and certification",
        body: "The honest challenge with sustainable fashion in Lagos is price. Locally made, ethically sourced pieces cost more than mass-market imports, and for a majority of Lagos consumers managing tight budgets, the premium is simply out of reach. The designers driving this shift are largely serving a middle-class and above-average income market.\n\nCertification is another gap. Global sustainability certifications (GOTS, Fair Trade) are expensive to obtain and not widely recognised by Lagos consumers anyway. Most brands operating in this space rely on storytelling — showing their sourcing, their makers, their process — to build trust rather than third-party verification.",
      },
    ],
    takeaways: [
      "Local fabrics like aso-oke and adire are being repositioned as premium everyday wear",
      "Secondhand clothing markets in Yaba and Tejuosho are growing and losing their stigma",
      "Sustainable pieces cost more — the shift is currently concentrated in middle-to-upper income buyers",
      "Most brands rely on storytelling rather than formal certification to signal sustainability",
    ],
  },
  {
    _id: "blog-top-5-smart-home-devices",
    _type: "blogPost",
    title: "Top 5 smart home devices in 2026",
    slug: { _type: "slug", current: "top-5-smart-home-devices" },
    postType: "Review",
    category: "guides",
    readTime: "6 MIN",
    publishedDate: "JUL 2026",
    excerpt: "The gadgets worth your naira.",
    image: "/assets/blog-2.svg",
    featured: false,
    lead: "Smart home devices that make sense in Lagos are not the same ones that make sense in London or New York. Power reliability, inverter systems, and data costs shape which gadgets are actually useful. We tested or surveyed usage of dozens of devices and narrowed it down to five that genuinely improve life in a Lagos home.",
    sections: [
      {
        _key: "sec-1",
        heading: "Inverter and solar monitoring systems",
        body: "If you have a home inverter — and most Lagos homes with steady power needs do — a smart monitoring system is the most immediately useful addition. Devices like the Victron Energy monitoring kit or the local Felicity Solar smart controller let you see battery levels, solar generation, and load consumption from your phone. You stop guessing whether you have enough battery for the night.\n\nSome systems also allow remote switching — turning off specific loads when the battery drops below a threshold. For ₦30,000–₦80,000 depending on the system, the peace of mind alone is worth it.",
      },
      {
        _key: "sec-2",
        heading: "Smart plugs and energy monitors",
        body: "A ₦8,000–₦15,000 smart plug with energy monitoring tells you exactly how much power any appliance is consuming. In a Lagos home where you are carefully managing inverter load, this is genuinely useful. Most work with cheap Wi-Fi and connect to a phone app. Brands available locally include Sonoff and Geeklink, both of which have become easier to find in Computer Village.\n\nBeyond monitoring, smart plugs let you schedule appliances — turn the water pump on at 6am before anyone wakes up, or cut power to the TV at 11pm automatically.",
      },
      {
        _key: "sec-3",
        heading: "Smart cameras with local storage",
        body: "Security cameras have become standard in many Lagos homes, and the smart versions — with phone alerts, motion detection, and cloud or local video storage — have dropped significantly in price. The key consideration for Lagos use is local storage: a camera that saves to a microSD card still works during an internet outage, which matters.\n\nDahua and Hikvision make reliable mid-range cameras (₦20,000–₦50,000) widely available in Lagos. At the budget end, Xiaomi Mijia cameras are often found at Computer Village for ₦10,000–₦15,000 and work well for indoor use. Avoid no-brand cameras with unclear cloud storage terms — your footage may be stored on offshore servers with no clear privacy policy.",
      },
    ],
    takeaways: [
      "Inverter monitoring systems are the most Lagos-relevant smart home addition",
      "Smart plugs with energy monitoring help manage inverter load efficiently",
      "Choose cameras with local (microSD) storage so they work during internet outages",
      "Sonoff, Dahua, Hikvision, and Xiaomi Mijia are all available at Computer Village",
    ],
  },
  {
    _id: "blog-revamping-urban-transport",
    _type: "blogPost",
    title: "Revamping urban transport systems",
    slug: { _type: "slug", current: "revamping-urban-transport" },
    postType: "Case Study",
    category: "explainers",
    readTime: "8 MIN",
    publishedDate: "JUL 2026",
    excerpt: "What Lagos can learn from Nairobi.",
    image: "/assets/blog-3.svg",
    featured: false,
    lead: "Lagos and Nairobi share a lot: rapid population growth, infrastructure strain, a dominant informal transport sector, and a government trying to retrofit modern systems onto cities that grew faster than planning. Nairobi made a significant transport shift over the past decade. Some of it worked, some did not, and the lessons are directly relevant to Lagos.",
    sections: [
      {
        _key: "sec-1",
        heading: "What Nairobi did differently",
        body: "Nairobi's transport transformation centred on three things: formalising matatu (minibus) routes, introducing contactless payment via the BebaPay card, and building dedicated bus lanes on key corridors. The formalisation was the hardest part — matatu operators resisted regulation fiercely until the government made it a condition of licensing.\n\nThe BebaPay system, launched through a partnership with Equity Bank and Google, created a traceable, cashless payment layer across informal transit. Operators liked it because it reduced cash theft. Commuters liked it because it enabled route mapping apps. The data generated by the system also allowed Nairobi to plan with real ridership numbers for the first time.",
      },
      {
        _key: "sec-2",
        heading: "What transferred — and what did not",
        body: "Lagos BRT is already ahead of Nairobi in one respect: dedicated bus lanes have been operating on the Oshodi–Mile 12 and Lagos Island corridors since 2008. The LAGBUS fleet is newer than it looks on paper. But the integration with the informal danfo and okada network has been weak — passengers still face chaotic last-mile connections that the formal BRT system was supposed to reduce.\n\nNairobi's contactless payment lesson has not transferred yet. Lagos' COWRY card, introduced for BRT, works but has not reached informal routes. A unified payment system that works across BRT, danfo, and eventually keke would unlock the data and convenience that made Nairobi's system stick.",
      },
      {
        _key: "sec-3",
        heading: "The infrastructure question",
        body: "The difference that matters most is political will on road space. Nairobi gave up significant road space for bus lanes and enforced it. In Lagos, dedicated lanes are frequently blocked by parked vehicles, market overflow, and commercial activity — and enforcement is inconsistent.\n\nThe broader lesson from Nairobi, Bogotá, and other cities that have made meaningful transit improvements is that technology and infrastructure are secondary to governance. The best BRT system in the world fails if private vehicles are allowed to use the lanes during rush hour. Lagos has the infrastructure; what it needs is the enforcement culture to match.",
      },
    ],
    takeaways: [
      "Nairobi's success was rooted in formalising informal transport, not replacing it",
      "Contactless payment across informal routes unlocked real ridership data for the first time",
      "Lagos BRT infrastructure is solid — the gap is last-mile integration with informal routes",
      "Enforcement of dedicated lanes, not more infrastructure, is the missing piece in Lagos",
    ],
  },
];

// ── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("❌  SANITY_API_WRITE_TOKEN is required. Add it to .env.local.");
    process.exit(1);
  }

  console.log("🌱  Seeding Sanity dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production");

  // Categories first (checklists reference them)
  console.log("\n📂  Upserting categories...");
  for (const cat of categories) {
    await client.createOrReplace(cat);
    console.log("   ✓", cat.label);
  }

  // Checklist
  console.log("\n📋  Upserting checklists...");
  await client.createOrReplace(universityAdmission);
  console.log("   ✓", universityAdmission.title);

  // Blog posts
  console.log("\n📰  Upserting blog posts...");
  for (const post of blogPosts) {
    await client.createOrReplace(post);
    console.log("   ✓", post.title);
  }

  console.log("\n✅  Done! Open /studio to review and manage your content.");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
