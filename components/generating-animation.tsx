"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  Sparkles,
  Brain,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

interface GeneratingAnimationProps {
  goal: string;
  estimatedDuration?: number; // in milliseconds
}

export function GeneratingAnimation({
  goal,
  estimatedDuration = 12000,
}: GeneratingAnimationProps) {
  const [progress, setProgress] = useState(1); // Start at 1% for immediate feedback
  const [currentStep, setCurrentStep] = useState(0);
  const [funFact, setFunFact] = useState(0);

  const steps = [
    { label: "Analyzing your goal...", icon: Brain, progressRange: [0, 20] },
    {
      label: "Breaking down into tasks...",
      icon: Lightbulb,
      progressRange: [20, 45],
    },
    {
      label: "Estimating timeframes...",
      icon: Sparkles,
      progressRange: [45, 70],
    },
    {
      label: "Optimizing task order...",
      icon: CheckCircle2,
      progressRange: [70, 85],
    },
    {
      label: "Finalizing your plan...",
      icon: Sparkles,
      progressRange: [85, 95],
    },
  ];

  const funFacts = [
    "💡 Well-organized tasks increase productivity by up to 25%!",
    "⚡ Breaking goals into smaller tasks makes them 42% more achievable!",
    "🎯 People who write down goals are 33% more successful!",
    "🚀 Proper planning can reduce project time by up to 30%!",
    "✨ Visual task management improves team collaboration by 50%!",
    "📊 Time-blocking increases focus and reduces distractions!",
  ];

  useEffect(() => {
    const startTime = Date.now();
    const UPDATE_INTERVAL = 100; // Update every 100ms

    console.log(
      `Animation started with estimated duration: ${estimatedDuration}ms`
    );

    // Simple, reliable time-based progress
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      // Calculate raw progress as percentage of estimated time
      const rawProgress = (elapsed / estimatedDuration) * 100;

      // Apply gentle easing: slower as it approaches 95%
      let newProgress;
      if (rawProgress < 50) {
        // First half: slightly faster
        newProgress = rawProgress * 1.1;
      } else if (rawProgress < 80) {
        // Middle: normal speed
        newProgress = 55 + (rawProgress - 50) * 0.9;
      } else {
        // Final stretch: slower
        newProgress = 82 + (rawProgress - 80) * 0.65;
      }

      // Cap at 95%
      setProgress(Math.min(Math.floor(newProgress), 95));
    }, UPDATE_INTERVAL);

    // Step progression based on progress percentage
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        // Find which step we should be on based on progress
        const targetStep = steps.findIndex((step, index) => {
          if (index === steps.length - 1) return true;
          return progress < step.progressRange[1];
        });

        // Smoothly transition to target step
        if (targetStep > prev && targetStep < steps.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 2500);

    // Rotate fun facts
    const factInterval = setInterval(() => {
      setFunFact((prev) => (prev + 1) % funFacts.length);
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearInterval(factInterval);
    };
  }, [estimatedDuration]);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-[90%] max-w-2xl border-2 shadow-2xl animate-in fade-in zoom-in duration-300">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 mb-4 animate-pulse">
              <Sparkles className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Creating Your Task Plan
            </h2>
            <p className="text-muted-foreground text-sm line-clamp-2">{goal}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Progress
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {Math.floor(progress)}%
              </span>
            </div>
            <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
              </div>
            </div>
            {progress >= 90 && (
              <p className="text-xs text-center text-muted-foreground mt-2 animate-pulse">
                Almost there! Finalizing your personalized plan...
              </p>
            )}
          </div>

          {/* Current Step */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800"
                      : isCompleted
                      ? "bg-green-50 dark:bg-green-900/10 opacity-60"
                      : "opacity-30"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive
                        ? "bg-blue-600 dark:bg-blue-500"
                        : isCompleted
                        ? "bg-green-600 dark:bg-green-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    {isActive ? (
                      <Loader2 className="h-4 w-4 text-white animate-spin" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    ) : (
                      <StepIcon className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      isActive
                        ? "text-blue-900 dark:text-blue-100"
                        : isCompleted
                        ? "text-green-900 dark:text-green-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fun Fact */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <p className="text-xs text-center text-muted-foreground transition-all duration-500">
              <span className="font-semibold">Did you know?</span>{" "}
              {funFacts[funFact]}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
