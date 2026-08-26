import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "../../../lib/escapeHtml";
import { getResourceDownload, saveResourceLead } from "../../../lib/sanity/queries";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot — bots fill hidden fields. Pretend success without doing work.
    if (typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ error: "Something went wrong." }, { status: 400 });
    }

    const email = clean(body.email, 200).toLowerCase();
    const slug = clean(body.slug, 200);

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!slug) {
      return NextResponse.json({ error: "Missing resource." }, { status: 400 });
    }

    // Resolve the real download destination server-side (the client never sees
    // it until we've stored the email).
    const resource = await getResourceDownload(slug);
    if (!resource) {
      return NextResponse.json({ error: "That resource could not be found." }, { status: 404 });
    }

    // Store the lead. This is the durable record — viewable in Sanity Studio.
    const createdAt = new Date().toISOString();
    await saveResourceLead({
      email,
      resourceSlug: slug,
      resourceTitle: resource.title,
      createdAt,
    });

    // Notify by email too (best-effort — never block the download on this).
    if (process.env.RESEND_API_KEY) {
      resend.emails
        .send({
          from: "Credentia Resources <onboarding@resend.dev>",
          to: "info.dotbranding@gmail.com",
          subject: `Resource download: ${resource.title}`,
          html: `
            <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color:#232323; font-size:22px; font-weight:600; margin-bottom:16px;">New resource download</h2>
              <div style="background:#f4f4f4; border-radius:12px; padding:20px;">
                <p style="margin:0 0 12px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p style="margin:0 0 12px 0;"><strong>Resource:</strong> ${escapeHtml(resource.title)}</p>
                <p style="margin:0;"><strong>When:</strong> ${escapeHtml(createdAt)}</p>
              </div>
              <p style="color:#9b9b9b; font-size:14px; margin-top:24px;">Sent from credentia.site/resources</p>
            </div>
          `,
        })
        .catch((e) => console.error("Resource lead email failed:", e));
    }

    return NextResponse.json({ url: resource.url, title: resource.title });
  } catch (error) {
    console.error("Resource lead error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
