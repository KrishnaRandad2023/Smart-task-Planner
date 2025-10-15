"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function AppLayout({ children, showSidebar = true }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen">
      {showSidebar && <Sidebar />}
      <div
        className={cn(
          "transition-all duration-300",
          showSidebar ? "lg:pl-64" : ""
        )}
      >
        {children}
      </div>
    </div>
  );
}
