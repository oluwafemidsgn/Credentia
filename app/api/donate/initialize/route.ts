import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const { email, amount } = await request.json();

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "A valid email is required for your receipt." },
        { status: 400 }
      );
    }
    if (!amount || typeof amount !== "number" || amount < 100) {
      return NextResponse.json(
        { error: "Amount must be at least ₦100." },
        { status: 400 }
      );
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      console.error("PAYSTACK_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Payments are not configured yet." },
        { status: 500 }
      );
    }

    // Return the user to the support section after payment; CoffeeTiers reads
    // the reference from the URL and verifies it.
    const origin =
      request.headers.get("origin") ?? new URL(request.url).origin;

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // Paystack expects kobo
        currency: "NGN",
        callback_url: `${origin}/jollof`,
        metadata: {
          custom_fields: [
            {
              display_name: "Purpose",
              variable_name: "purpose",
              value: "Buy us jollof — Credentia",
            },
          ],
        },
      }),
      cache: "no-store",
    });
    const data = await res.json();

    if (!data?.status || !data?.data?.authorization_url) {
      console.error("Paystack initialize failed:", data);
      return NextResponse.json(
        { error: "Couldn't start the payment. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Initialize payment error:", error);
    return NextResponse.json(
      { error: "Couldn't start the payment. Please try again." },
      { status: 500 }
    );
  }
}
