import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, email, phone, handle } = body;

    // Validate absolute minimum requirement fields
    if (!businessName || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required onboarding details." },
        { status: 400 },
      );
    }

    // Standardize Kenyan phone numbers for precise API/WhatsApp routing
    // e.g., "0712345678" or "254712345678" -> "254712345678"
    let cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "254" + cleanPhone.substring(1);
    } else if (cleanPhone.startsWith("7") || cleanPhone.startsWith("1")) {
      cleanPhone = "254" + cleanPhone;
    }

    // Construct an elegant prefilled greeting text for when you open the WhatsApp link
    const prefilledMessage = `Hey! This is Gabriel from ClearRack. I noticed you just claimed your custom link layout configurations for *${businessName}* (${handle}.boutique). Let's schedule a brief 5-minute discovery run right here to map your M-Pesa automated drop integrations.`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(prefilledMessage)}`;

    // Configure SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Scannable, modern email notification layout
    const emailHtml = `
      <div style="font-family: sans-serif; padding: 24px; color: #1c1917; max-width: 600px; border: 1px solid #e7e5e4; border-radius: 12px;">
        <h2 style="color: #ea580c; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; font-size: 18px; font-weight: 900;">
          ClearRack Pipeline Alert
        </h2>
        <p style="font-size: 14px; color: #78716c; margin-top: 0; margin-bottom: 24px; font-weight: 500;">
          A high-intent merchant has requested a custom boutique instance link layout.
        </p>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 12px 0; font-weight: bold; color: #44403c; width: 140px;">Boutique Name:</td>
            <td style="padding: 12px 0; color: #1c1917; font-weight: 600;">${businessName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 12px 0; font-weight: bold; color: #44403c;">Email Address:</td>
            <td style="padding: 12px 0; color: #1c1917;">${email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 12px 0; font-weight: bold; color: #44403c;">Requested Link:</td>
            <td style="padding: 12px 0; color: #ea580c; font-weight: bold;">${handle}.boutique</td>
          </tr>
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 12px 0; font-weight: bold; color: #44403c;">Phone Contact:</td>
            <td style="padding: 12px 0; color: #1c1917;">${phone}</td>
          </tr>
        </table>

        <div style="margin-top: 28px;">
          <a href="${whatsappUrl}" style="display: inline-block; background-color: #1c1917; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; padding: 14px 24px; border-radius: 8px;">
            Initiate WhatsApp Outreach ⚡
          </a>
        </div>
        
        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e7e5e4; font-size: 11px; color: #a8a29e; text-align: center; font-weight: 500;">
          ClearRack Ingestion Engine • Automated Lead Router
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"ClearRack Leads" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL,
      subject: `🔥 New Merchant Lead: ${businessName}`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Lead logged and notification dispatched.",
    });
  } catch (error) {
    console.error("Lead submission system error:", error);
    return NextResponse.json(
      { error: "Internal processing malfunction." },
      { status: 500 },
    );
  }
}
