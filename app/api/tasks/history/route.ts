import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    let userId: string;
    try {
      const payload = await verifyToken(token);
      if (!payload || !payload.userId) {
        throw new Error("Invalid token payload");
      }
      userId = payload.userId as string;
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // Get query parameters for pagination
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = parseInt(searchParams.get("skip") || "0");

    // Fetch user's task history from MongoDB
    const client = await clientPromise;
    const db = client.db("taskplanner");
    const collection = db.collection("plans");

    const tasks = await collection
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments({ userId: new ObjectId(userId) });

    return NextResponse.json({
      success: true,
      tasks: tasks.map((task) => ({
        ...task,
        _id: task._id.toString(),
        userId: task.userId.toString(),
      })),
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + tasks.length < total,
      },
    });
  } catch (error: any) {
    console.error("Error fetching task history:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch task history",
      },
      { status: 500 }
    );
  }
}
