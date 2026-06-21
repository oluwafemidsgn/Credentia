import Link from "next/link";
import type { Metadata } from "next";
import {
  LegalShell,
  Section,
  P,
  Bullets,
  Callout,
} from "../components/LegalShell";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Terms of use | Credentia",
  description:
    "The terms that apply to your use of Credentia, a free public document directory for Lagos and Nigeria. Not a government office, legal service, or documentation agent.",
};

const toc = [
  { id: "what-is", label: "1. What Credentia is" },
  { id: "accuracy", label: "2. Accuracy of information" },
  { id: "no-advice", label: "3. No professional advice" },
  { id: "liability", label: "4. Limitation of liability" },
  { id: "how-to-use", label: "5. How you may use it" },
  { id: "flag", label: "6. The Flag an issue feature" },
  { id: "links", label: "7. Third-party links" },
  { id: "ip", label: "8. Intellectual property" },
  { id: "support", label: "9. Supporting Credentia" },
  { id: "agents", label: "10. Agents & third parties" },
  { id: "modifications", label: "11. Modifications to terms" },
  { id: "law", label: "12. Governing law" },
  { id: "contact", label: "13. Contact" },
];

const EMAIL = "credentia.online@gmail.com";

export default function TermsOfUse() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Terms of use"
      lastUpdated="June 20, 2026"
      toc={toc}
      intro={
        <p>
          These terms apply to your use of Credentia and the Credentia website (credentia.site). By
          using the site, you&apos;re agreeing to them. If you disagree with any part, please
          don&apos;t use the site.
        </p>
      }
    >
      <Section id="what-is" number={1} title="What Credentia is">
        <P>
          Credentia is a free public directory. It tells you what documents you&apos;ll likely need
          for common life steps in Lagos and Nigeria: what to bring, why each one matters, and
          where to go to get it.
        </P>
        <P>
          It is not a government website, not a legal service, and not a licensed documentation
          agent. We don&apos;t process applications, file forms on your behalf, or have any
          official relationship with the agencies, offices, or institutions we reference. We write
          the information down. You take it from there.
        </P>
        <P>
          Using Credentia does not create a professional, advisory, or contractual relationship
          between you and us.
        </P>
      </Section>

      <Section id="accuracy" number={2} title="The accuracy of information on this site">
        <P>
          We work hard to keep every checklist correct, current, and genuinely useful. But we have
          to be honest with you: we cannot guarantee it.
        </P>
        <P>
          Document requirements change. Offices move. Fees increase. Government agencies revise
          their processes, sometimes without public notice. Information that was accurate when we
          last reviewed it may no longer be accurate by the time you read it.
        </P>
        <P>
          This is why every checklist on Credentia shows a{" "}
          <strong className="font-medium text-[#232323]">&ldquo;last updated&rdquo; date</strong>{" "}
          and carries a{" "}
          <strong className="font-medium text-[#232323]">&ldquo;Flag an issue&rdquo;</strong>{" "}
          button. We depend on users who have been through a process to tell us when something has
          changed. That community feedback loop is how this directory stays alive and truthful. We
          review every flag before we make any update.
        </P>
        <Callout>
          <strong className="font-medium text-[#232323]">
            Before you act on any information from Credentia, please verify it directly with the
            relevant official source
          </strong>
          : the government office, the agency&apos;s official website, or the institution itself.
          Especially for anything involving fees, physical addresses, processing times, or
          eligibility requirements.
        </Callout>
        <P>
          Credentia is a starting point. It is not a substitute for checking with the source.
        </P>
      </Section>

      <Section id="no-advice" number={3} title="No professional or official advice">
        <P>
          Nothing on Credentia is legal advice, immigration advice, financial advice, or any other
          form of professional or official advice. We are a reference directory. The information we
          publish is intended to help you understand what you will likely need. It does not
          replace guidance from a qualified professional for your specific situation.
        </P>
        <P>
          If your situation involves legal proceedings, formal immigration, a major property
          transaction, a business registration, or any process where getting it wrong has serious
          consequences: please consult a qualified professional in addition to using this site.
        </P>
      </Section>

      <Section id="liability" number={4} title="Limitation of liability">
        <P>
          <strong className="font-medium text-[#232323]">
            Credentia and its founders accept no liability
          </strong>{" "}
          for any loss, cost, damage, inconvenience, or harm, of any kind, arising from:
        </P>
        <Bullets
          items={[
            "Acting on information that turned out to be outdated, incomplete, or incorrect",
            "A wasted trip, missed appointment, or rejected application because a requirement had changed",
            "Relying on a “where to go” address, phone number, or link that was no longer current",
            "Any decision made based on what you read on this site",
          ]}
        />
        <P>
          The information on this site is provided{" "}
          <strong className="font-medium text-[#232323]">as is</strong>, without any warranty,
          express or implied, of accuracy, completeness, fitness for a particular purpose, or
          timeliness. To the fullest extent permitted by Nigerian law, we disclaim all such
          warranties.
        </P>
        <P>This limitation applies even if we had been informed that such a loss was possible.</P>
        <P>
          If you are navigating a high-stakes process (a visa application, a property purchase, a
          legal matter, a formal employment requirement), please verify every requirement with the
          relevant official source before you act.
        </P>
      </Section>

      <Section id="how-to-use" number={5} title="How you may use this site">
        <P>
          You may use Credentia for your own personal, non-commercial use. Specifically, you may:
        </P>
        <Bullets
          items={[
            "Search, read, and use checklist information for your own purposes",
            "Share links to specific checklists with others",
            "Use the “Flag an issue” feature to contribute corrections to the directory",
          ]}
        />
        <P>You may not:</P>
        <Bullets
          items={[
            "Reproduce, republish, sell, or redistribute significant portions of Credentia's written content as your own product or service",
            "Systematically scrape or copy the site for commercial purposes",
            "Present Credentia content as official government guidance or as a substitute for official sources",
            "Use the site in any way that is unlawful, misleading, or harmful to other users",
          ]}
        />
      </Section>

      <Section id="flag" number={6} title="The &ldquo;Flag an issue&rdquo; feature">
        <P>
          When you flag incorrect or outdated information, you are helping us and everyone who comes
          after you. We are genuinely grateful for that.
        </P>
        <P>A few things to know about how it works:</P>
        <Bullets
          items={[
            "All flags are reviewed by our team before any change is made. We verify before we update.",
            "Submitting a flag does not guarantee that the entry will be updated immediately, or at all. We may find the information is still current, or that we need more time to verify.",
            "We may reach out to you if we need more detail about what you reported.",
            "We are not liable for the period between when something changes in the real world and when it is reflected on this site.",
          ]}
        />
        <P>
          Please use the flag feature only for factual corrections to a specific checklist entry.
          For general feedback or other enquiries, please use the contact page.
        </P>
      </Section>

      <Section id="links" number={7} title="Third-party links and sources">
        <P>
          Every &ldquo;where to go&rdquo; entry on Credentia links to an official government
          website, a real physical office address, or another authoritative public source.
        </P>
        <P>
          We are not responsible for the content, accuracy, availability, or privacy practices of
          those external sites or offices. Government websites go down, redirect, or update without
          notice. If you find that a link is broken or an address appears wrong, please flag it.
        </P>
      </Section>

      <Section id="ip" number={8} title="Intellectual property">
        <P>
          The written content on Credentia, the checklist entries, descriptions, blog posts, and
          editorial copy, is owned by Credentia. The underlying factual information (what documents
          a process requires) is public knowledge that no one can own. But the way it has been
          researched, organised, written, and structured is ours.
        </P>
        <P>
          You are welcome to share links to anything on the site. Please do not reproduce our
          content wholesale and republish it as your own, particularly for commercial purposes or
          without attribution.
        </P>
      </Section>

      <Section id="support" number={9} title="Supporting Credentia">
        <P>
          Credentia is free, and we intend to keep it that way. If you choose to support us through
          our voluntary contribution page:
        </P>
        <Bullets
          items={[
            "All contributions are voluntary, gratuitous, and non-refundable",
            "A contribution does not entitle you to specific content, a premium service, priority support, or any commercial licence",
            "Payments are processed by a third-party provider (Paystack or a similar service), whose own terms and conditions apply to the transaction itself",
          ]}
        />
      </Section>

      <Section id="agents" number={10} title="Disclaimer about agent and third-party services">
        <P>
          Some people may offer to use Credentia on your behalf, or to assist you with
          documentation processes for a fee. Credentia has no association with such individuals or
          services. We do not authorise, endorse, or partner with any paid agent or intermediary.
          Any arrangement you enter into with a third party is entirely between you and them.
        </P>
      </Section>

      <Section id="modifications" number={11} title="Modifications to these terms">
        <P>
          We may update these terms from time to time. When we do, the &ldquo;last updated&rdquo;
          date at the top of this page will change. If you continue to use Credentia after an
          update, you are agreeing to the revised terms.
        </P>
        <P>
          We recommend checking back occasionally, especially if you use the site regularly.
        </P>
      </Section>

      <Section id="law" number={12} title="Governing law and jurisdiction">
        <P>
          These terms are governed by the laws of the Federal Republic of Nigeria. Any dispute
          arising out of or in connection with these terms or your use of Credentia will be subject
          to the exclusive jurisdiction of Nigerian courts.
        </P>
      </Section>

      <Section id="contact" number={13} title="Contact">
        <P>
          Questions about these terms or how we operate? Reach us at{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-[#351459] underline decoration-[#ccbaf8] underline-offset-4 hover:text-[#ccbaf8] transition-colors break-all"
          >
            {EMAIL}
          </a>{" "}
          or via the{" "}
          <Link
            href="/contact"
            className="font-medium text-[#351459] underline decoration-[#ccbaf8] underline-offset-4 hover:text-[#ccbaf8] transition-colors"
          >
            contact page
          </Link>{" "}
          on the site.
        </P>
        <P>
          For factual corrections to a specific checklist, please use the{" "}
          <strong className="font-medium text-[#232323]">
            &ldquo;Flag an issue&rdquo;
          </strong>{" "}
          button on the relevant page. It reaches us faster and goes directly into our review
          queue.
        </P>
      </Section>

      <Callout>
        <em className="text-[#505050]">
          Credentia is a free directory. It is not a government office, a legal service, or a
          documentation agent. Know what you need, then verify it before you go.
        </em>
      </Callout>
    </LegalShell>
  );
}
