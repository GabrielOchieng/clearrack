import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { storeName, slug, email, phone } = body;

    // 1. Core Sanity Validation
    if (!storeName || !slug || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required onboarding parameters." },
        { status: 400 },
      );
    }

    // 2. Format and Clean the Handle String
    const sanitizedSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");

    // 3. Database Check: Guard against duplicate boutique address paths
    const existingStore = await prisma.store.findUnique({
      where: { slug: sanitizedSlug },
    });

    if (existingStore) {
      return NextResponse.json(
        {
          error:
            "This boutique address is already claimed by another merchant.",
        },
        { status: 400 },
      );
    }

    // 4. Create or Fetch the Merchant Account & Store Tenant Layout Rows
    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase().trim() },
      update: {},
      create: {
        email: email.toLowerCase().trim(),
        name: storeName.trim() + " Owner",
        role: "MERCHANT",
      },
    });

    const newStore = await prisma.store.create({
      data: {
        name: storeName.trim(),
        slug: sanitizedSlug,
        bannerColor: "#f97316", // Defaults to platform orange accent
        ownerId: user.id,
      },
    });

    // 5. Fire-and-Forget Email Notification Handshake to your existing /api/leads path
    // We construct the absolute application address using the incoming request origin metadata
    const { origin } = new URL(request.url);

    try {
      // We purposefully await this to ensure the email system registers the lead successfully
      const leadResponse = await fetch(`${origin}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: storeName.trim(),
          email: email.toLowerCase().trim(),
          phone: phone.trim(),
          handle: sanitizedSlug,
        }),
      });

      if (!leadResponse.ok) {
        console.warn(
          "Database updated successfully, but email dispatch endpoint flagged a warning response log.",
        );
      }
    } catch (emailError) {
      // We trap email errors inside a local block so that if your mailing server goes down or times out,
      // it doesn't break the client's store registration checkout flow.
      console.error(
        "Non-blocking failure transmitting to email handler engine:",
        emailError,
      );
    }

    // 6. Return Clean Success payload back to the browser form layout
    return NextResponse.json({
      success: true,
      message: "Store system generated and admin notification dispatched.",
      store: newStore,
    });
  } catch (error: any) {
    console.error("Workspace provision pipeline error log:", error);
    return NextResponse.json(
      { error: "Internal Database processing framework error." },
      { status: 500 },
    );
  }
}
