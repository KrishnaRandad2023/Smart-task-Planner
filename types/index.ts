export interface Task {
  id: string;
  title: string;
  description: string;
  estimatedDuration: string;
  priority: "high" | "medium" | "low";
  dependencies: string[];
  deadline?: string;
  status: "pending" | "in-progress" | "completed";
}

export interface TaskPlan {
  goal: string;
  totalEstimatedDuration: string;
  tasks: Task[];
  createdAt: string;
}

export interface GeneratePlanRequest {
  goal: string;
  timeframe?: string;
  additionalContext?: string;
}

export interface GeneratePlanResponse {
  success: boolean;
  plan?: TaskPlan;
  error?: string;
}
