"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Calendar,
  Clock,
  Target,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { TaskPlan } from "@/types";
import { TimelineGraph } from "./timeline-graph";

interface TaskHistoryItem extends TaskPlan {
  _id: string;
  userId: string;
}

export function TaskHistory() {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState<TaskHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [authError, setAuthError] = useState(false);
  const { toast } = useToast();

  const fetchTaskHistory = useCallback(async () => {
    setLoading(true);
    setAuthError(false);

    try {
      const response = await fetch("/api/tasks/history?limit=20");
      const data = await response.json();

      if (response.ok && data.success) {
        setTasks(data.tasks);
      } else if (response.status === 401) {
        // Auth error - user not logged in
        setAuthError(true);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to load task history",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      toast({
        title: "Error",
        description: "Failed to load task history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    // Check if user has auth cookie even if user state not loaded yet
    const hasAuthCookie = document.cookie.includes("auth-token=");

    console.log("TaskHistory - Auth Check:", {
      hasUser: !!user,
      hasAuthCookie,
      authLoading,
    });

    // Fetch history if user exists OR auth cookie exists (cookie-based auth)
    if (user || hasAuthCookie) {
      fetchTaskHistory();
    } else if (!authLoading) {
      // Only show error if auth is done loading and no auth found
      setAuthError(true);
      setLoading(false);
    }
  }, [user, authLoading, fetchTaskHistory]);

  const toggleExpand = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (authError) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card className="border-2 shadow-xl">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Calendar className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Authentication Required
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Please log in to view your task history
            </p>
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Target className="mr-2 h-4 w-4" />
              Go to Home & Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card className="border-2 shadow-xl">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Calendar className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Task History Yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              Start by creating your first task plan on the home page
            </p>
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Target className="mr-2 h-4 w-4" />
              Create Task Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Task History
          </h2>
          <p className="text-muted-foreground mt-1">
            View all your previously generated task plans
          </p>
        </div>
        <Button variant="outline" onClick={fetchTaskHistory} disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((taskPlan) => (
          <Card
            key={taskPlan._id}
            className="border-2 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm bg-white/90 dark:bg-slate-900/90"
          >
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 border-b">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    {taskPlan.goal}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {taskPlan.totalEstimatedDuration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(taskPlan.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                    <span className="text-sm">
                      {taskPlan.tasks.length} tasks
                    </span>
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(taskPlan._id)}
                  className="ml-2"
                >
                  {expandedTasks.has(taskPlan._id) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedTasks.has(taskPlan._id) && (
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-lg">Task Breakdown</h4>
                  <div className="space-y-3">
                    {taskPlan.tasks.map((task, index) => (
                      <div
                        key={task.id}
                        className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-base">
                                {index + 1}. {task.title}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  task.priority === "high"
                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                    : task.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                }`}
                              >
                                {task.priority}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  task.status === "completed"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : task.status === "in-progress"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                    : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                                }`}
                              >
                                {task.status}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {task.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>📅 {task.deadline}</span>
                              <span>⏱️ {task.estimatedDuration}</span>
                              {task.dependencies &&
                                task.dependencies.length > 0 && (
                                  <span>
                                    🔗 {task.dependencies.length} dependencies
                                  </span>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3 text-lg">Timeline View</h4>
                  <TimelineGraph taskPlan={taskPlan} tasks={taskPlan.tasks} />
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
