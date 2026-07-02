import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "../../../lib/escapeHtml";

const resend = new Resend(process.env.RESEND_API_KEY);

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = clean(body.name, 100);
    const email = clean(body.email, 200);
    const subject = clean(body.subject, 100);
    const message = clean(body.message, 5000);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Escape before interpolating into email HTML.
    const eName = escapeHtml(name);
    const eEmail = escapeHtml(email);
    const eSubject = escapeHtml(subject);
    const eMessage = escapeHtml(message);

    await resend.emails.send({
      from: "Credentia Contact <onboarding@resend.dev>",
      to: "info.dotbranding@gmail.com",
      subject: `Contact: ${subject} — ${name}`,
      html: `
        <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #232323; font-size: 24px; font-weight: 600; margin-bottom: 16px;">
            New contact form submission
          </h2>
          
          <div style="background: #f4f4f4; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #232323;">Name:</strong> ${eName}</p>
            <p style="margin: 0 0 12px 0;"><strong style="color: #232323;">Email:</strong> ${eEmail}</p>
            <p style="margin: 0;"><strong style="color: #232323;">Subject:</strong> ${eSubject}</p>
          </div>

          <div style="background: #f4f4f4; border-radius: 12px; padding: 20px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #232323;">Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap; color: #505050; line-height: 1.6;">${eMessage}</p>
          </div>

          <p style="color: #9b9b9b; font-size: 14px; margin-top: 24px;">
            Sent from credentia.site contact form
          </p>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}