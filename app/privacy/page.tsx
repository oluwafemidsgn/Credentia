import Link from "next/link";
import type { Metadata } from "next";
import {
  LegalShell,
  Section,
  SubHeading,
  P,
  Bullets,
  Note,
  Callout,
  DataTable,
} from "../components/LegalShell";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Privacy policy — Credentia",
  description:
    "How Credentia collects, uses, and protects the small amount of data needed to run a free public document directory, in line with the NDPR and Nigeria Data Protection Act 2023.",
};

const toc = [
  { id: "who-we-are", label: "1. Who we are" },
  { id: "what-we-collect", label: "2. What we collect and why" },
  { id: "cookies", label: "3. Cookies & third parties" },
  { id: "sharing", label: "4. Who we share data with" },
  { id: "your-rights", label: "5. Your rights" },
  { id: "retention", label: "6. How long we keep data" },
  { id: "children", label: "7. Children's privacy" },
  { id: "changes", label: "8. Changes to this policy" },
  { id: "contact", label: "9. Contact & complaints" },
];

const EMAIL = "info.dotbranding@gmail.com";

export default function PrivacyPolicy() {
  return (
    <LegalShell
      eyebrow="Privacy"
      title="Privacy policy"
      lastUpdated="June 2026"
      toc={toc}
      intro={
        <>
          <p>
            Credentia is a free public directory. You don&apos;t need to create an account to
            use it. We don&apos;t ask for your name to search a checklist. We try to collect as
            little data as possible to make the site work and keep it useful.
          </p>
          <p>
            This policy explains what we do collect, why we collect it, and what we do with it.
            It is written to comply with the{" "}
            <strong className="font-medium text-[#232323]">
              Nigeria Data Protection Regulation (NDPR)
            </strong>{" "}
            and the{" "}
            <strong className="font-medium text-[#232323]">
              Nigeria Data Protection Act 2023
            </strong>
            .
          </p>
        </>
      }
    >
      <Section id="who-we-are" number={1} title="Who we are">
        <P>
          Credentia is operated by the Credentia team, based in Lagos, Nigeria. We are the{" "}
          <strong className="font-medium text-[#232323]">data controller</strong> for the
          purposes of this policy.
        </P>
        <P>
          Contact:{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-[#351459] underline decoration-[#ccbaf8] underline-offset-4 hover:text-[#ccbaf8] transition-colors break-all"
          >
            {EMAIL}
          </a>
        </P>
      </Section>

      <Section id="what-we-collect" number={2} title="What we collect and why">
        <SubHeading>2a. When you search or browse the site</SubHeading>
        <P>
          Our hosting and analytics infrastructure collects standard, anonymised data about how
          the site is used. This includes:
        </P>
        <Bullets
          items={[
            "Pages visited and checklists viewed",
            "Search terms entered",
            "Time spent on pages",
            "Approximate location (city or state level — not your precise address)",
            "Browser type and device type",
            "Referring website (how you arrived at Credentia)",
          ]}
        />
        <Note label="Why">
          This helps us understand which checklists are most needed, which searches return no
          results (telling us what to build next), and how to improve the experience for everyone.
        </Note>
        <Note label="Legal basis">
          Legitimate interests — understanding usage helps us serve you better and keep the
          directory accurate.
        </Note>

        <SubHeading>2b. When you flag an issue</SubHeading>
        <P>
          If you use the &ldquo;Flag an issue&rdquo; feature on a checklist, we collect:
        </P>
        <Bullets
          items={[
            "The specific correction or concern you submit",
            "The checklist or entry it relates to",
            "Your name and email address, if you choose to provide them for follow-up",
          ]}
        />
        <Note label="Why">
          To review and action corrections to checklist entries. This is the feedback loop that
          keeps the directory accurate.
        </Note>
        <Note label="Legal basis">
          Legitimate interests — processing flags is how we maintain the accuracy you rely on.
        </Note>
        <P>Your name and email are optional. You can submit a flag without them.</P>

        <SubHeading>2c. When you contact us</SubHeading>
        <P>
          If you send us a message through the contact page, we collect your name, email address,
          and the contents of your message.
        </P>
        <Note label="Why">To respond to your enquiry.</Note>
        <Note label="Legal basis">
          Legitimate interests — responding to messages you&apos;ve sent us.
        </Note>

        <SubHeading>2d. If you support us financially</SubHeading>
        <P>
          If you make a voluntary contribution through our support page, your payment is handled by
          a third-party payment processor (Paystack or a similar service). We receive confirmation
          that a contribution was made and the amount. We do not store your card details — those
          remain with the payment processor under their own privacy policy.
        </P>
        <Note label="Why">To record the contribution for accounting purposes.</Note>
        <Note label="Legal basis">
          Contractual necessity — processing the transaction you initiated.
        </Note>
      </Section>

      <Section id="cookies" number={3} title="Cookies and third-party services">
        <P>
          We use a small number of third-party services to operate the site. Some of these set
          cookies on your device.
        </P>
        <DataTable
          head={["Service", "What it does", "Cookie type"]}
          rows={[
            [
              "Analytics (Google or Vercel Analytics)",
              "Tracks aggregate, anonymised site usage",
              "Analytics cookie",
            ],
            [
              "Google AdSense",
              "Displays advertising to support the site",
              "Advertising cookie — personalised",
            ],
            [
              "Supabase",
              "Stores flag submissions and backend data",
              "Functional (server-side only)",
            ],
            [
              "Sanity",
              "Manages our content (checklists, blog posts)",
              "No user-facing cookies",
            ],
          ]}
        />
        <Callout>
          <strong className="font-medium text-[#232323]">On advertising cookies:</strong> If we
          display Google AdSense ads, Google may use cookies to show you relevant ads based on your
          browsing history across the web. You can manage this at{" "}
          <a
            href="https://google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#351459] underline decoration-[#ccbaf8] underline-offset-2 hover:text-[#ccbaf8] transition-colors"
          >
            google.com/settings/ads
          </a>{" "}
          or opt out entirely using the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#351459] underline decoration-[#ccbaf8] underline-offset-2 hover:text-[#ccbaf8] transition-colors"
          >
            Google opt-out plugin
          </a>
          .
        </Callout>
        <Callout>
          <strong className="font-medium text-[#232323]">On analytics cookies:</strong> You can
          prevent analytics tracking by enabling &ldquo;Do Not Track&rdquo; in your browser, using
          a browser extension like uBlock Origin, or adjusting your cookie preferences if we have a
          cookie consent banner.
        </Callout>
        <P>
          We do not use cookies for any purpose beyond what the services above require to function.
        </P>
      </Section>

      <Section id="sharing" number={4} title="Who we share your data with">
        <P>
          We share data only with the third-party services listed in Section 3, and only to the
          extent necessary for those services to operate. Specifically:
        </P>
        <Bullets
          items={[
            <>
              <strong className="font-medium text-[#232323]">Google:</strong> Analytics and
              advertising data
            </>,
            <>
              <strong className="font-medium text-[#232323]">Supabase:</strong> Flag submissions
              and backend functionality
            </>,
            <>
              <strong className="font-medium text-[#232323]">Sanity:</strong> Content management
              (no personal user data is stored here)
            </>,
            <>
              <strong className="font-medium text-[#232323]">Paystack (or similar):</strong>{" "}
              Payment processing for voluntary contributions
            </>,
          ]}
        />
        <P>
          <strong className="font-medium text-[#232323]">We do not:</strong>
        </P>
        <Bullets
          items={[
            "Sell your personal data to any party",
            "Share your data with agents, advertisers (beyond Google's standard mechanisms), or marketing lists",
            "Transfer your data outside of Nigeria except where the services above require it (e.g. Google and Supabase infrastructure may be hosted outside Nigeria — we only use providers that comply with applicable data protection standards)",
          ]}
        />
      </Section>

      <Section
        id="your-rights"
        number={5}
        title="Your rights under the NDPR and Nigeria Data Protection Act 2023"
      >
        <P>Under Nigerian data protection law, you have the right to:</P>
        <Bullets
          items={[
            <>
              <strong className="font-medium text-[#232323]">Access:</strong> Know what personal
              data we hold about you
            </>,
            <>
              <strong className="font-medium text-[#232323]">Correction:</strong> Request that
              inaccurate data is corrected
            </>,
            <>
              <strong className="font-medium text-[#232323]">Deletion:</strong> Request that your
              personal data is deleted (the &ldquo;right to be forgotten&rdquo;)
            </>,
            <>
              <strong className="font-medium text-[#232323]">Objection:</strong> Object to
              processing based on legitimate interests
            </>,
            <>
              <strong className="font-medium text-[#232323]">Restriction:</strong> Ask us to limit
              how we use your data in certain circumstances
            </>,
            <>
              <strong className="font-medium text-[#232323]">Portability:</strong> Receive your
              data in a portable format where technically feasible
            </>,
            <>
              <strong className="font-medium text-[#232323]">Lodge a complaint:</strong> With the
              Nigeria Data Protection Commission (NDPC) at{" "}
              <a
                href="https://ndpc.gov.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#351459] underline decoration-[#ccbaf8] underline-offset-2 hover:text-[#ccbaf8] transition-colors"
              >
                ndpc.gov.ng
              </a>{" "}
              if you believe your rights have been violated
            </>,
          ]}
        />
        <P>
          To exercise any of these rights, contact us at{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-[#351459] underline decoration-[#ccbaf8] underline-offset-4 hover:text-[#ccbaf8] transition-colors break-all"
          >
            {EMAIL}
          </a>
          . We will respond within 30 days.
        </P>
      </Section>

      <Section id="retention" number={6} title="How long we keep your data">
        <DataTable
          head={["Type of data", "How long we keep it"]}
          rows={[
            [
              "Analytics data",
              "As per the analytics provider's own policy (typically up to 26 months for Google Analytics)",
            ],
            [
              "Flag submissions",
              "Until the issue is resolved, plus a reasonable period for audit",
            ],
            ["Contact messages", "Until the enquiry is resolved, then deleted"],
            [
              "Financial contribution records",
              "As required by Nigerian accounting and tax regulations (typically 7 years)",
            ],
          ]}
        />
      </Section>

      <Section id="children" number={7} title="Children's privacy">
        <P>
          Credentia is a general public service and may be used by students who are under 18. We do
          not knowingly collect personal data from children under 13. If you are a parent or
          guardian and believe your child has submitted personal data to us, please contact us and
          we will delete it.
        </P>
      </Section>

      <Section id="changes" number={8} title="Changes to this policy">
        <P>
          We will update the &ldquo;last updated&rdquo; date at the top of this page if this policy
          changes materially. We will not begin collecting new categories of personal data without
          updating this page first.
        </P>
      </Section>

      <Section id="contact" number={9} title="Contact and complaints">
        <P>For privacy questions or to exercise your rights:</P>
        <Callout>
          <span className="flex flex-col gap-2">
            <span>
              <strong className="font-medium text-[#232323]">Email:</strong>{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="font-medium text-[#351459] underline decoration-[#ccbaf8] underline-offset-4 hover:text-[#ccbaf8] transition-colors break-all"
              >
                {EMAIL}
              </a>
            </span>
            <span>
              <strong className="font-medium text-[#232323]">Contact page:</strong>{" "}
              <Link
                href="/contact"
                className="font-medium text-[#351459] underline decoration-[#ccbaf8] underline-offset-4 hover:text-[#ccbaf8] transition-colors"
              >
                credentia.site/contact
              </Link>
            </span>
          </span>
        </Callout>
        <P>
          If you are not satisfied with how we handle a privacy concern, you may also lodge a
          complaint directly with the Nigeria Data Protection Commission (NDPC) at{" "}
          <a
            href="https://ndpc.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#351459] underline decoration-[#ccbaf8] underline-offset-2 hover:text-[#ccbaf8] transition-colors"
          >
            ndpc.gov.ng
          </a>
          .
        </P>
      </Section>

      <Callout>
        <em className="text-[#505050]">
          Credentia is free to use and built to stay on your side — that includes how we handle the
          small amount of data we collect to keep it running.
        </em>
      </Callout>
    </LegalShell>
  );
}
