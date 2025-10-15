import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.email) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    // Add timeout for MongoDB operations
    const client = await Promise.race([
      clientPromise,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("MongoDB connection timeout")), 5000)
      ),
    ]);
    
    const db = client.db("taskplanner");
    
    const user = await Promise.race([
      db.collection("users").findOne(
        { email: payload.email },
        { projection: { otp: 0, otpExpiry: 0 } }
      ),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("MongoDB query timeout")), 3000)
      ),
    ]);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        userId: user._id.toString(),
      },
    });
  } catch (error: any) {
    console.error("Get user error:", error);
    
    // Return specific error for timeout
    if (error.message?.includes("timeout")) {
      return NextResponse.json(
        { success: false, error: "Database connection timeout" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to get user info" },
      { status: 500 }
    );
  }
}
