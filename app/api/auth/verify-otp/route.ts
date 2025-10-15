import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("taskplanner");

    // Find user with matching email and OTP
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or OTP" },
        { status: 401 }
      );
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return NextResponse.json(
        { success: false, error: "Invalid OTP code" },
        { status: 401 }
      );
    }

    // Check if OTP has expired
    if (new Date() > new Date(user.otpExpiry)) {
      return NextResponse.json(
        { success: false, error: "OTP has expired. Please request a new one." },
        { status: 401 }
      );
    }

    // Clear OTP after successful verification
    await db.collection("users").updateOne(
      { email },
      {
        $unset: { otp: "", otpExpiry: "" },
        $set: { lastLoginAt: new Date() },
      }
    );

    // Create JWT token
    const token = await createToken({
      email: user.email,
      userId: user._id.toString(),
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
        userId: user._id.toString(),
      },
    });

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
