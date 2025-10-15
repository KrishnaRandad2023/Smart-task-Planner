"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskList } from "@/components/task-list";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import type { TaskPlan } from "@/types";
import { useAuth } from "@/contexts/auth-context";
import { AuthModal } from "./auth-modal";
import { GeneratingAnimation } from "./generating-animation";

export function TaskPlanner() {
  const [goal, setGoal] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [taskPlan, setTaskPlan] = useState<TaskPlan | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [estimatedDuration, setEstimatedDuration] = useState(12000); // Default 12s
  const isGeneratingAfterAuth = useRef(false);
  const generationStartTime = useRef<number>(0);
  const { toast } = useToast();
  const { user, login } = useAuth();

  const handleGeneratePlan = async () => {
    if (!goal.trim()) {
      toast({
        title: "Goal Required",
        description: "Please enter a goal to generate a task plan.",
        variant: "destructive",
      });
      return;
    }

    // Check if user is authenticated
    // Priority order:
    // 1. User is already loaded in state
    // 2. Auth cookie exists (user is logged in but state not updated yet)
    // 3. Bypass flag for post-login generation
    const hasAuthCookie = document.cookie.includes("auth-token=");

    console.log("Generate Plan - Debug Info:", {
      hasUser: !!user,
      hasAuthCookie,
      bypassFlag: isGeneratingAfterAuth.current,
    });

    // Only show auth modal if NO authentication evidence exists
    if (!user && !hasAuthCookie && !isGeneratingAfterAuth.current) {
      console.log("Opening auth modal - user not authenticated");
      setShowAuthModal(true);
      return;
    }

    // Clear previous task plan before generating new one
    setTaskPlan(null);

    setIsLoading(true);
    generationStartTime.current = Date.now();

    // Load average generation time from localStorage for better estimation
    const storedAvgTime = localStorage.getItem("avgGenerationTime");
    if (storedAvgTime) {
      setEstimatedDuration(parseInt(storedAvgTime));
    }

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          timeframe: timeframe || undefined,
          additionalContext: additionalContext || undefined,
        }),
      });

      const data = await response.json();

      if (data.success && data.plan) {
        // Calculate actual generation time
        const actualDuration = Date.now() - generationStartTime.current;

        // Update running average (weighted: 70% old, 30% new)
        const oldAvg = estimatedDuration;
        const newAvg = Math.round(oldAvg * 0.7 + actualDuration * 0.3);
        setEstimatedDuration(newAvg);
        localStorage.setItem("avgGenerationTime", newAvg.toString());

        console.log(
          `Generation took ${actualDuration}ms, new estimate: ${newAvg}ms`
        );

        console.log("New task plan received:", {
          goal: data.plan.goal,
          taskCount: data.plan.tasks.length,
          duration: data.plan.totalEstimatedDuration,
          createdAt: data.plan.createdAt,
        });

        setTaskPlan(data.plan);
        toast({
          title: "Success!",
          description: "Your task plan has been generated.",
        });

        // Keep the bypass flag set as long as user has auth cookie
        // This allows subsequent generations without re-checking
        if (document.cookie.includes("auth-token=")) {
          isGeneratingAfterAuth.current = true;
        }
      } else {
        // Check for auth error
        if (response.status === 401) {
          // Reset bypass flag on auth error
          isGeneratingAfterAuth.current = false;

          toast({
            title: "Authentication Required",
            description: "Please login to generate task plans.",
            variant: "destructive",
          });
          setShowAuthModal(true);
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to generate task plan.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGoal("");
    setTimeframe("");
    setAdditionalContext("");
    setTaskPlan(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Enter Your Goal
          </CardTitle>
          <CardDescription className="text-base">
            Describe what you want to achieve, and AI will break it down into
            actionable tasks with a visual timeline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <label htmlFor="goal" className="block text-sm font-medium mb-2">
              Goal <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="goal"
              placeholder="e.g., Launch a product in 2 weeks, Learn React in 3 months, Plan a wedding..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={3}
              className="resize-none"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="timeframe"
                className="block text-sm font-medium mb-2"
              >
                Timeframe (Optional)
              </label>
              <Textarea
                id="timeframe"
                placeholder="e.g., 2 weeks, 3 months, 6 weeks..."
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                rows={2}
                className="resize-none"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="context"
                className="block text-sm font-medium mb-2"
              >
                Additional Context (Optional)
              </label>
              <Textarea
                id="context"
                placeholder="Any constraints, resources, or preferences..."
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                rows={2}
                className="resize-none"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleGeneratePlan}
              disabled={isLoading || !goal.trim()}
              className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Task Plan
                </>
              )}
            </Button>
            {taskPlan && (
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
                className="h-12 border-2"
              >
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {taskPlan && <TaskList taskPlan={taskPlan} />}

      {/* Loading Animation */}
      {isLoading && (
        <GeneratingAnimation
          goal={goal}
          estimatedDuration={estimatedDuration}
        />
      )}

      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onAuthSuccess={async () => {
          console.log("Auth success - setting bypass flag");

          // Set bypass flag to allow immediate generation without waiting for auth state
          isGeneratingAfterAuth.current = true;

          // Close modal
          setShowAuthModal(false);

          // Update auth state in background
          login();

          // Generate plan automatically after successful login
          // Small delay to ensure cookie is set
          setTimeout(() => {
            if (goal.trim()) {
              handleGeneratePlan();
            }
          }, 500);
        }}
      />
    </div>
  );
}
