import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const plan = await collection.findOne({ _id: new ObjectId(params.id) });

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          error: "Plan not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      plan: plan,
    });
  } catch (error: any) {
    console.error("Error fetching plan:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch plan",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Plan not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting plan:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete plan",
      },
      { status: 500 }
    );
  }
}
