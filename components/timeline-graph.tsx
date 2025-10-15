"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Task, TaskPlan } from "@/types";
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  TrendingUp,
  Info,
} from "lucide-react";
import {
  format,
  addDays,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from "date-fns";
import { cn } from "@/lib/utils";

interface TimelineGraphProps {
  taskPlan: TaskPlan;
  tasks: Task[];
}

export function TimelineGraph({ taskPlan, tasks }: TimelineGraphProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const { timelineData, dateRange, allDays } = useMemo(() => {
    const startDate = new Date(taskPlan.createdAt);
    const tasksWithDates = tasks.map((task, index) => {
      let taskStartDay = 0;
      if (task.dependencies && task.dependencies.length > 0) {
        task.dependencies.forEach((depId) => {
          const depIndex = tasks.findIndex((t) => t.id === depId);
          if (depIndex !== -1) {
            taskStartDay = Math.max(taskStartDay, depIndex + 1);
          }
        });
      } else {
        taskStartDay = index;
      }

      const durationMatch = task.estimatedDuration.match(/(\d+)/);
      const durationDays = durationMatch ? parseInt(durationMatch[1]) : 1;

      return {
        ...task,
        startDay: taskStartDay,
        durationDays,
        startDate: addDays(startDate, taskStartDay),
        endDate: addDays(startDate, taskStartDay + durationDays - 1),
      };
    });

    const maxEndDate = new Date(
      Math.max(...tasksWithDates.map((t) => t.endDate.getTime()))
    );

    const allDays = eachDayOfInterval({
      start: startDate,
      end: maxEndDate,
    });

    return {
      timelineData: tasksWithDates,
      dateRange: { start: startDate, end: maxEndDate },
      allDays,
    };
  }, [tasks, taskPlan.createdAt]);

  // Group days into weeks for header
  const weeks = useMemo(() => {
    const weekMap = new Map<string, Date[]>();

    allDays.forEach((day) => {
      const weekStart = startOfWeek(day, { weekStartsOn: 1 }); // Monday start
      const weekKey = format(weekStart, "yyyy-MM-dd");

      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, []);
      }
      weekMap.get(weekKey)!.push(day);
    });

    return Array.from(weekMap.entries()).map(([key, days]) => ({
      weekStart: new Date(key),
      days: days.filter((d) => d >= dateRange.start && d <= dateRange.end),
    }));
  }, [allDays, dateRange]);

  // Diverse color palette for each task
  const taskColors = [
    {
      bg: "bg-blue-500 dark:bg-blue-600",
      border: "border-blue-600 dark:border-blue-700",
      text: "text-blue-700 dark:text-blue-300",
    },
    {
      bg: "bg-purple-500 dark:bg-purple-600",
      border: "border-purple-600 dark:border-purple-700",
      text: "text-purple-700 dark:text-purple-300",
    },
    {
      bg: "bg-pink-500 dark:bg-pink-600",
      border: "border-pink-600 dark:border-pink-700",
      text: "text-pink-700 dark:text-pink-300",
    },
    {
      bg: "bg-rose-500 dark:bg-rose-600",
      border: "border-rose-600 dark:border-rose-700",
      text: "text-rose-700 dark:text-rose-300",
    },
    {
      bg: "bg-orange-500 dark:bg-orange-600",
      border: "border-orange-600 dark:border-orange-700",
      text: "text-orange-700 dark:text-orange-300",
    },
    {
      bg: "bg-amber-500 dark:bg-amber-600",
      border: "border-amber-600 dark:border-amber-700",
      text: "text-amber-700 dark:text-amber-300",
    },
    {
      bg: "bg-lime-500 dark:bg-lime-600",
      border: "border-lime-600 dark:border-lime-700",
      text: "text-lime-700 dark:text-lime-300",
    },
    {
      bg: "bg-emerald-500 dark:bg-emerald-600",
      border: "border-emerald-600 dark:border-emerald-700",
      text: "text-emerald-700 dark:text-emerald-300",
    },
    {
      bg: "bg-teal-500 dark:bg-teal-600",
      border: "border-teal-600 dark:border-teal-700",
      text: "text-teal-700 dark:text-teal-300",
    },
    {
      bg: "bg-cyan-500 dark:bg-cyan-600",
      border: "border-cyan-600 dark:border-cyan-700",
      text: "text-cyan-700 dark:text-cyan-300",
    },
    {
      bg: "bg-sky-500 dark:bg-sky-600",
      border: "border-sky-600 dark:border-sky-700",
      text: "text-sky-700 dark:text-sky-300",
    },
    {
      bg: "bg-indigo-500 dark:bg-indigo-600",
      border: "border-indigo-600 dark:border-indigo-700",
      text: "text-indigo-700 dark:text-indigo-300",
    },
    {
      bg: "bg-violet-500 dark:bg-violet-600",
      border: "border-violet-600 dark:border-violet-700",
      text: "text-violet-700 dark:text-violet-300",
    },
    {
      bg: "bg-fuchsia-500 dark:bg-fuchsia-600",
      border: "border-fuchsia-600 dark:border-fuchsia-700",
      text: "text-fuchsia-700 dark:text-fuchsia-300",
    },
  ];

  const getTaskColor = (taskIndex: number) => {
    return taskColors[taskIndex % taskColors.length];
  };

  const getPriorityBadgeColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700";
      case "low":
        return "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        );
      case "in-progress":
        return (
          <PlayCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        );
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const isTaskOnDay = (task: (typeof timelineData)[0], day: Date) => {
    return day >= task.startDate && day <= task.endDate;
  };

  const isTaskStart = (task: (typeof timelineData)[0], day: Date) => {
    return isSameDay(day, task.startDate);
  };

  const isTaskEnd = (task: (typeof timelineData)[0], day: Date) => {
    return isSameDay(day, task.endDate);
  };

  const today = new Date();

  return (
    <Card className="overflow-hidden border-2 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              Project Gantt Chart
            </CardTitle>
            <CardDescription className="mt-2 text-base">
              Professional timeline view • Click tasks to expand details
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-700/50 border">
              <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="font-medium">
                {format(dateRange.start, "MMM dd")} -{" "}
                {format(dateRange.end, "MMM dd")}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-700/50 border">
              <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="font-medium">{tasks.length} Tasks</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Gantt Chart Table */}
            <div className="bg-white dark:bg-slate-900">
              {/* Header Row */}
              <div className="sticky top-0 z-20 bg-slate-50 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
                <div className="flex">
                  {/* Task Info Column */}
                  <div className="w-80 flex-shrink-0 border-r-2 border-slate-200 dark:border-slate-700">
                    <div className="p-4 font-semibold text-sm text-slate-700 dark:text-slate-300">
                      Task Name
                    </div>
                  </div>

                  {/* Timeline Header */}
                  <div className="flex-1 min-w-0">
                    {/* Month/Week Row */}
                    <div className="flex border-b border-slate-200 dark:border-slate-700">
                      {weeks.map((week, weekIndex) => (
                        <div
                          key={weekIndex}
                          className="border-r border-slate-200 dark:border-slate-700"
                          style={{ width: `${week.days.length * 40}px` }}
                        >
                          <div className="p-2 text-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                            Week {weekIndex + 1} •{" "}
                            {format(week.weekStart, "MMM dd")}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Days Row */}
                    <div className="flex">
                      {allDays.map((day, dayIndex) => {
                        const isToday = isSameDay(day, today);
                        const isWeekend =
                          day.getDay() === 0 || day.getDay() === 6;

                        return (
                          <div
                            key={dayIndex}
                            className={cn(
                              "w-10 p-2 border-r border-slate-200 dark:border-slate-700 text-center",
                              isWeekend && "bg-slate-100 dark:bg-slate-800",
                              isToday && "bg-blue-100 dark:bg-blue-900/30"
                            )}
                          >
                            <div
                              className={cn(
                                "text-xs font-medium",
                                isToday
                                  ? "text-blue-600 dark:text-blue-400 font-bold"
                                  : "text-slate-500 dark:text-slate-400"
                              )}
                            >
                              {format(day, "dd")}
                            </div>
                            <div
                              className={cn(
                                "text-[10px]",
                                isToday
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-slate-400"
                              )}
                            >
                              {format(day, "EEE")[0]}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Task Rows */}
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {timelineData.map((task, taskIndex) => {
                  const isExpanded = expandedTask === task.id;
                  const isSelected = selectedTask === task.id;

                  return (
                    <div
                      key={task.id}
                      className={cn(
                        "flex hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
                        isSelected && "bg-blue-50 dark:bg-blue-900/20"
                      )}
                    >
                      {/* Task Info Column */}
                      <div className="w-80 flex-shrink-0 border-r border-slate-200 dark:border-slate-700 p-4">
                        <button
                          onClick={() => {
                            setExpandedTask(isExpanded ? null : task.id);
                            setSelectedTask(task.id);
                          }}
                          className="w-full text-left group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex items-center gap-2">
                              {task.description && (
                                <div className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                  {isExpanded ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </div>
                              )}
                              <div
                                className={cn(
                                  "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm",
                                  getTaskColor(taskIndex).bg
                                )}
                              >
                                {taskIndex + 1}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div
                                className={cn(
                                  "font-medium text-sm group-hover:underline line-clamp-2",
                                  getTaskColor(taskIndex).text
                                )}
                              >
                                {task.title}
                              </div>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                {getStatusIcon(task.status)}
                                <Badge
                                  className={cn(
                                    "text-xs border",
                                    getPriorityBadgeColor(task.priority)
                                  )}
                                >
                                  {task.priority}
                                </Badge>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {task.estimatedDuration}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Details */}
                          {isExpanded && (
                            <div className="mt-3 pl-8 text-xs text-slate-600 dark:text-slate-400 space-y-1 animate-in fade-in-0 slide-in-from-top-1">
                              <p className="line-clamp-3">{task.description}</p>
                              {task.dependencies &&
                                task.dependencies.length > 0 && (
                                  <div className="flex items-start gap-1 text-[11px]">
                                    <span className="text-slate-500">
                                      Depends on:
                                    </span>
                                    <span className="text-slate-600 dark:text-slate-400">
                                      Task{" "}
                                      {tasks.findIndex(
                                        (t) => t.id === task.dependencies![0]
                                      ) + 1}
                                    </span>
                                  </div>
                                )}
                            </div>
                          )}
                        </button>
                      </div>

                      {/* Timeline Bars */}
                      <div className="flex-1 min-w-0 relative">
                        <div className="flex h-full">
                          {allDays.map((day, dayIndex) => {
                            const isOnTask = isTaskOnDay(task, day);
                            const isStart = isTaskStart(task, day);
                            const isEnd = isTaskEnd(task, day);
                            const isWeekend =
                              day.getDay() === 0 || day.getDay() === 6;
                            const isToday = isSameDay(day, today);

                            return (
                              <div
                                key={dayIndex}
                                className={cn(
                                  "w-10 border-r border-slate-200 dark:border-slate-700 relative",
                                  isWeekend &&
                                    "bg-slate-50 dark:bg-slate-800/50",
                                  isToday && "bg-blue-50 dark:bg-blue-900/20"
                                )}
                              >
                                {isOnTask && (
                                  <div
                                    className={cn(
                                      "absolute inset-y-2 inset-x-1 border-2",
                                      getTaskColor(taskIndex).bg,
                                      getTaskColor(taskIndex).border,
                                      "shadow-md transition-all",
                                      task.status === "completed" &&
                                        "opacity-50 grayscale",
                                      task.status === "in-progress" &&
                                        "ring-2 ring-offset-1 ring-blue-400 dark:ring-blue-500",
                                      isStart && "rounded-l-lg",
                                      isEnd && "rounded-r-lg",
                                      !isStart && !isEnd && "rounded-none"
                                    )}
                                  >
                                    {isStart && (
                                      <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold drop-shadow-sm">
                                        {task.durationDays}d
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Today Marker */}
                                {isToday && (
                                  <div className="absolute inset-x-0 top-0 bottom-0 border-l-2 border-blue-500 dark:border-blue-400 z-10" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t space-y-3">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Each task has a unique color
              </span>
              <div className="flex items-center gap-1">
                {taskColors.slice(0, 8).map((color, idx) => (
                  <div
                    key={idx}
                    className={cn("w-4 h-4 rounded shadow-sm", color.bg)}
                  />
                ))}
                <span className="text-xs text-slate-500 ml-1">...</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Status:
              </span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Completed (faded)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4 text-blue-600" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  In Progress (glowing)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Pending
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-4 bg-blue-500" />
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Today&apos;s date
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
