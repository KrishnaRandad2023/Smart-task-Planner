import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { generateOTP } from "@/lib/auth";
import { sendOTPEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("taskplanner");
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store or update OTP in database
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          email,
          otp,
          otpExpiry,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    // Send OTP via email
    const emailResult = await sendOTPEmail(email, otp);

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: "Failed to send OTP email. Please check your email configuration." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
