"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Calendar,
  Network,
  ListTodo,
} from "lucide-react";
import type { Task, TaskPlan } from "@/types";
import { format } from "date-fns";
import { TimelineGraph } from "@/components/timeline-graph";

interface TaskListProps {
  taskPlan: TaskPlan;
}

export function TaskList({ taskPlan }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(taskPlan.tasks);

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "pending"
                  ? "in-progress"
                  : task.status === "in-progress"
                  ? "completed"
                  : "pending",
            }
          : task
      )
    );
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="space-y-6">
      <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800 border-b">
          <CardTitle className="text-2xl">Task Plan Overview</CardTitle>
          <CardDescription>
            <div className="space-y-3 mt-3">
              <p className="text-base font-semibold text-foreground">
                {taskPlan.goal}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-700/50">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">
                    Total Duration: {taskPlan.totalEstimatedDuration}
                  </span>
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-700/50">
                  <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-medium">
                    Created: {format(new Date(taskPlan.createdAt), "PPP")}
                  </span>
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-700/50">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="font-medium">
                    Progress: {completedTasks}/{tasks.length} tasks
                  </span>
                </span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Graph */}
      <TimelineGraph taskPlan={taskPlan} tasks={tasks} />

      <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800 border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ListTodo className="h-6 w-6" />
            Tasks ({tasks.length})
          </CardTitle>
          <CardDescription className="text-base">
            Click on tasks to view details and update status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {tasks.map((task, index) => (
              <AccordionItem key={task.id} value={task.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTaskStatus(task.id);
                      }}
                      className="hover:opacity-70 transition-opacity"
                    >
                      {getStatusIcon(task.status)}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">
                          {index + 1}. {task.title}
                        </span>
                        <Badge
                          variant={getPriorityColor(task.priority)}
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4 pl-8">
                    <div>
                      <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Description
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">
                          Estimated Duration:
                        </span>{" "}
                        <span className="text-muted-foreground">
                          {task.estimatedDuration}
                        </span>
                      </div>
                      {task.deadline && (
                        <div>
                          <span className="font-semibold">Deadline:</span>{" "}
                          <span className="text-muted-foreground">
                            {task.deadline}
                          </span>
                        </div>
                      )}
                    </div>

                    {task.dependencies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <Network className="h-4 w-4" />
                          Dependencies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {task.dependencies.map((depId) => {
                            const depTask = tasks.find((t) => t.id === depId);
                            return depTask ? (
                              <Badge
                                key={depId}
                                variant="outline"
                                className="text-xs"
                              >
                                {depTask.title}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <Button
                        size="sm"
                        onClick={() => toggleTaskStatus(task.id)}
                        variant={
                          task.status === "completed" ? "outline" : "default"
                        }
                      >
                        {task.status === "pending" && "Start Task"}
                        {task.status === "in-progress" && "Mark as Completed"}
                        {task.status === "completed" && "Reset to Pending"}
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
