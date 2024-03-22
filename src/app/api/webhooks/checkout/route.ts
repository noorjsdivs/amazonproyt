import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const fullfillOrder = async (session: any) => {
  console.log("session", session);
  NextResponse.json({
    message: "Payment done",
    status: true,
    method: session.status,
    data: session,
  });
};

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event | null = null;
  try {
    event = stripe.webhooks.constructEvent(payload, signature!, webhookSecret);

    if (event?.type === "payment_intent.succeeded") {
      const session = event.data.object;
      return fullfillOrder(session)
        .then(() => NextResponse.json({ status: 200 }))
        .catch((err) =>
          NextResponse.json({ error: err?.message }, { status: 500 })
        );
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }

  return NextResponse.json({ received: true });
}
