import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "../../../lib/escapeHtml";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Generous caps — real submissions fit comfortably; abuse doesn't.
const LIMITS = {
  name: 100,
  email: 200,
  phone: 30,
  title: 150,
  category: 60,
  documents: 5000,
  steps: 5000,
  notes: 2000,
} as const;

type Fields = Record<keyof typeof LIMITS, string>;

function field(body: Record<string, unknown>, key: keyof typeof LIMITS): string {
  const v = body[key];
  return typeof v === "string" ? v.trim().slice(0, LIMITS[key]) : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot — hidden field real users never fill. Pretend success for bots.
    if (typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ success: true });
    }

    const f: Fields = {
      name: field(body, "name"),
      email: field(body, "email"),
      phone: field(body, "phone"),
      title: field(body, "title"),
      category: field(body, "category"),
      documents: field(body, "documents"),
      steps: field(body, "steps"),
      notes: field(body, "notes"),
    };

    if (!f.name || !f.email || !f.title || !f.documents) {
      return NextResponse.json(
        { error: "Please fill in your name, email, the checklist title, and the documents needed." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(f.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const e = Object.fromEntries(
      Object.entries(f).map(([k, v]) => [k, escapeHtml(v)])
    ) as Fields;

    await resend.emails.send({
      from: "Credentia Contribution <onboarding@resend.dev>",
      to: "info.dotbranding@gmail.com",
      subject: `Checklist contribution: ${f.title} — ${f.name}`,
      replyTo: f.email,
      html: `
        <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #232323; font-size: 24px; font-weight: 600; margin-bottom: 16px;">
            New checklist contribution
          </h2>

          <div style="background: #f4f4f4; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #232323;">Checklist:</strong> ${e.title}</p>
            <p style="margin: 0;"><strong style="color: #232323;">Category:</strong> ${e.category || "—"}</p>
          </div>

          <div style="background: #f4f4f4; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #232323;">Documents needed:</strong></p>
            <p style="margin: 0; white-space: pre-wrap; color: #505050; line-height: 1.6;">${e.documents}</p>
          </div>

          ${e.steps ? `
          <div style="background: #f4f4f4; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #232323;">Process / steps:</strong></p>
            <p style="margin: 0; white-space: pre-wrap; color: #505050; line-height: 1.6;">${e.steps}</p>
          </div>` : ""}

          ${e.notes ? `
          <div style="background: #f4f4f4; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #232323;">Extra notes:</strong></p>
            <p style="margin: 0; white-space: pre-wrap; color: #505050; line-height: 1.6;">${e.notes}</p>
          </div>` : ""}

          <div style="background: #351459; border-radius: 12px; padding: 20px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #ccbaf8;">Credit the contributor:</strong></p>
            <p style="margin: 0 0 12px 0; color: #ffffff;"><strong>Name:</strong> ${e.name}</p>
            <p style="margin: 0 0 12px 0; color: #ffffff;"><strong>Email:</strong> ${e.email}</p>
            <p style="margin: 0; color: #ffffff;"><strong>Phone:</strong> ${e.phone || "—"}</p>
          </div>

          <p style="color: #9b9b9b; font-size: 14px; margin-top: 24px;">
            Sent from credentia.site/contribute — verify before publishing.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contribute form error:", error);
    return NextResponse.json(
      { error: "Failed to send your contribution. Please try again." },
      { status: 500 }
    );
  }
}
