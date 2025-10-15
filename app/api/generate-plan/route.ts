import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GeneratePlanRequest, TaskPlan } from "@/types";
import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
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

    const body: GeneratePlanRequest = await request.json();
    const { goal, timeframe, additionalContext } = body;

    if (!goal || goal.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Goal is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "Gemini API key is not configured. Please set GEMINI_API_KEY in your environment variables.",
        },
        { status: 500 }
      );
    }

    const prompt = buildPrompt(goal, timeframe, additionalContext);

    // Get Gemini model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
      },
    });

    const result = await model.generateContent(prompt);
    let responseContent = result.response.text();
    
    if (!responseContent) {
      throw new Error("No response from Gemini");
    }

    // Clean the response - remove markdown code blocks if present
    responseContent = responseContent.trim();
    if (responseContent.startsWith("```json")) {
      responseContent = responseContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (responseContent.startsWith("```")) {
      responseContent = responseContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const parsedPlan = JSON.parse(responseContent.trim());
    
    // Validate and structure the response
    const taskPlan: TaskPlan = {
      goal: goal,
      totalEstimatedDuration: parsedPlan.totalEstimatedDuration || "Unknown",
      tasks: parsedPlan.tasks || [],
      createdAt: new Date().toISOString(),
    };

    // Save to MongoDB if URI is configured
    if (process.env.MONGODB_URI) {
      try {
        const client = await clientPromise;
        const db = client.db("taskplanner");
        const collection = db.collection("plans");
        
        await collection.insertOne({
          ...taskPlan,
          userId: new ObjectId(userId),
          createdAt: new Date(),
        });
      } catch (dbError) {
        console.error("MongoDB error (non-fatal):", dbError);
        // Continue even if database save fails
      }
    }

    return NextResponse.json({
      success: true,
      plan: taskPlan,
    });
  } catch (error: any) {
    console.error("Error generating task plan:", error);
    
    // Provide more helpful error messages
    let errorMessage = error.message || "Failed to generate task plan";
    
    if (error.message?.includes("JSON.parse")) {
      errorMessage = "Failed to parse AI response. The AI returned invalid data. Please try again.";
    } else if (error.message?.includes("API key")) {
      errorMessage = "Invalid or missing Gemini API key. Please check your configuration.";
    } else if (error.message?.includes("quota") || error.message?.includes("429")) {
      errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

function buildPrompt(
  goal: string,
  timeframe?: string,
  additionalContext?: string
): string {
  return `You are an expert project manager and task planner. Break down the following goal into actionable tasks with suggested deadlines and dependencies.

**Goal:** ${goal}
${timeframe ? `**Timeframe:** ${timeframe}` : ""}
${additionalContext ? `**Additional Context:** ${additionalContext}` : ""}

Please provide a comprehensive task breakdown in the following JSON format:

{
  "totalEstimatedDuration": "X weeks/days",
  "tasks": [
    {
      "id": "task-1",
      "title": "Task title",
      "description": "Detailed description of what needs to be done",
      "estimatedDuration": "X hours/days",
      "priority": "high|medium|low",
      "dependencies": ["task-id-of-prerequisite"],
      "deadline": "Relative deadline (e.g., Day 1, Week 1, etc.)",
      "status": "pending"
    }
  ]
}

Guidelines:
1. Create 5-15 tasks depending on complexity
2. Each task should be specific and actionable
3. Include realistic time estimates
4. Identify task dependencies (tasks that must be completed before others)
5. Assign priorities based on importance and urgency
6. Provide relative deadlines based on the timeframe
7. Order tasks logically based on dependencies
8. Ensure tasks are concrete and measurable

Return ONLY the JSON object, no additional text.
`.trim();
}
