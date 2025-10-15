import { TaskPlanner } from "@/components/task-planner";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { AppLayout } from "@/components/app-layout";

export default function Home() {
  return (
    <AppLayout>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header with Theme Toggle and User Menu */}
          <div className="flex items-center justify-end mb-8 gap-3">
            <UserMenu />
            <ThemeToggle />
          </div>

          {/* Subtitle */}
          <div className="text-center mb-10">
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Transform your goals into actionable tasks with AI-powered
              planning. Break down complex projects into manageable steps.
            </p>
          </div>

          {/* Main Content */}
          <TaskPlanner />
        </div>

        {/* Background Decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </main>
    </AppLayout>
  );
}
