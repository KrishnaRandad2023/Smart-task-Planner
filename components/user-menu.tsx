"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, History, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthModal } from "./auth-modal";

export function UserMenu() {
  const { user, loading, login, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  // Check if auth cookie exists (user might be logged in but state not updated)
  const hasAuthCookie =
    typeof document !== "undefined" && document.cookie.includes("auth-token=");

  // Don't show loading spinner forever - show login button after 3 seconds
  if (loading) {
    setTimeout(() => {
      if (loading) {
        console.warn("Auth loading taking too long, check API connection");
      }
    }, 3000);

    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  // If no user but has auth cookie, try to refresh auth state
  if (!user && hasAuthCookie && !loading) {
    console.log("UserMenu: Has auth cookie but no user, refreshing auth state");
    login(); // Trigger auth state refresh

    // Show loading while refreshing
    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (!user) {
    return (
      <>
        <Button
          onClick={() => setShowAuthModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          size="sm"
        >
          <User className="mr-2 h-4 w-4" />
          Login
        </Button>
        <AuthModal
          open={showAuthModal}
          onOpenChange={setShowAuthModal}
          onAuthSuccess={async () => {
            setShowAuthModal(false);
            await login(); // Refresh auth state
          }}
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <span className="hidden md:inline-block">{user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <User className="mr-2 h-4 w-4" />
          <span>{user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/history")}>
          <History className="mr-2 h-4 w-4" />
          <span>Task History</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="text-red-600 dark:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
