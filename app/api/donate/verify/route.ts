import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = "credentia.online@gmail.com";
const FROM = "Credentia <onboarding@resend.dev>";

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference || typeof reference !== "string") {
      return NextResponse.json(
        { error: "Missing payment reference" },
        { status: 400 }
      );
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      console.error("PAYSTACK_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Payment verification is not configured" },
        { status: 500 }
      );
    }

    // Ask Paystack (the source of truth) whether this transaction succeeded.
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${secret}` },
        cache: "no-store",
      }
    );
    const payload = await verifyRes.json();
    const txn = payload?.data;

    if (!payload?.status || txn?.status !== "success") {
      return NextResponse.json(
        { verified: false, error: "Payment was not successful." },
        { status: 200 }
      );
    }

    const amountNaira = (txn.amount ?? 0) / 100;
    const amountLabel = `₦${amountNaira.toLocaleString("en-NG")}`;
    const customerEmail: string | undefined = txn.customer?.email;
    const ref: string = txn.reference;
    const paidAt = txn.paid_at ? new Date(txn.paid_at) : new Date();
    const dateLabel = paidAt.toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Receipt to the donor. Don't fail verification if the email errors —
    // the payment is already confirmed.
    if (customerEmail) {
      try {
        await resend.emails.send({
          from: FROM,
          to: customerEmail,
          subject: `Thank you for the jollof 🍚 — your Credentia receipt`,
          html: receiptHtml({ amountLabel, ref, dateLabel }),
        });
      } catch (e) {
        console.error("Receipt email failed:", e);
      }
    }

    // Notify the team of a new donation.
    try {
      await resend.emails.send({
        from: FROM,
        to: OWNER_EMAIL,
        subject: `🍚 New jollof donation — ${amountLabel}`,
        html: `
          <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #232323; font-size: 22px; font-weight: 600;">New donation received</h2>
            <div style="background: #f4f4f4; border-radius: 12px; padding: 20px;">
              <p style="margin: 0 0 12px 0;"><strong>Amount:</strong> ${amountLabel}</p>
              <p style="margin: 0 0 12px 0;"><strong>Donor:</strong> ${customerEmail ?? "—"}</p>
              <p style="margin: 0 0 12px 0;"><strong>Reference:</strong> ${ref}</p>
              <p style="margin: 0;"><strong>When:</strong> ${dateLabel}</p>
            </div>
          </div>
        `,
      });
    } catch (e) {
      console.error("Owner notification email failed:", e);
    }

    return NextResponse.json({
      verified: true,
      amount: amountNaira,
      reference: ref,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}

function receiptHtml({
  amountLabel,
  ref,
  dateLabel,
}: {
  amountLabel: string;
  ref: string;
  dateLabel: string;
}) {
  return `
    <div style="font-family: Inter, system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
      <div style="background: #351459; border-radius: 16px; padding: 32px; text-align: center;">
        <p style="font-size: 40px; margin: 0 0 8px 0;">🍚</p>
        <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0 0 8px 0;">
          Thank you for the jollof!
        </h1>
        <p style="color: #ccbaf8; font-size: 15px; line-height: 1.6; margin: 0;">
          Your support keeps Credentia free, independent, and accurate for everyone in Lagos.
        </p>
      </div>

      <div style="background: #f4f4f4; border-radius: 12px; padding: 24px; margin-top: 20px;">
        <p style="margin: 0 0 12px 0; color: #232323;"><strong>Amount:</strong> ${amountLabel}</p>
        <p style="margin: 0 0 12px 0; color: #232323;"><strong>Reference:</strong> ${ref}</p>
        <p style="margin: 0; color: #232323;"><strong>Date:</strong> ${dateLabel}</p>
      </div>

      <p style="color: #9b9b9b; font-size: 13px; line-height: 1.6; margin-top: 24px; text-align: center;">
        This is your receipt for a donation to Credentia (credentia.site).<br/>
        No goods or services were exchanged. Reply to this email if you have any questions.
      </p>
    </div>
  `;
}
