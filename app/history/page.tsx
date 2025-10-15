import { TaskHistory } from "@/components/task-history";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { AppLayout } from "@/components/app-layout";

export default function HistoryPage() {
  return (
    <AppLayout>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-end mb-8 gap-3">
            <UserMenu />
            <ThemeToggle />
          </div>

          {/* Task History Component */}
          <TaskHistory />
        </div>
      </main>
    </AppLayout>
  );
}
