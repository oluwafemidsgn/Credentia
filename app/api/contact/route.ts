import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

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

    await resend.emails.send({
      from: "Credentia Contact <onboarding@resend.dev>",
      to: "credentia.online@gmail.com",
      subject: `Contact: ${subject} — ${name}`,
      html: `
        <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #232323; font-size: 24px; font-weight: 600; margin-bottom: 16px;">
            New contact form submission
          </h2>
          
          <div style="background: #f4f4f4; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #232323;">Name:</strong> ${name}</p>
            <p style="margin: 0 0 12px 0;"><strong style="color: #232323;">Email:</strong> ${email}</p>
            <p style="margin: 0;"><strong style="color: #232323;">Subject:</strong> ${subject}</p>
          </div>

          <div style="background: #f4f4f4; border-radius: 12px; padding: 20px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #232323;">Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap; color: #505050; line-height: 1.6;">${message}</p>
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