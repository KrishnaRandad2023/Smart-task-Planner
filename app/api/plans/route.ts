import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          success: false,
          error: "Database is not configured",
        },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db("taskplanner");
    const collection = db.collection("plans");

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = parseInt(searchParams.get("skip") || "0");

    // Fetch plans sorted by creation date (newest first)
    const plans = await collection
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count
    const total = await collection.countDocuments({});

    return NextResponse.json({
      success: true,
      plans: plans,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + limit < total,
      },
    });
  } catch (error: any) {
    console.error("Error fetching plans:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch plans",
      },
      { status: 500 }
    );
  }
}
