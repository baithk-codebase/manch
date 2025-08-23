"use client";
import { Pages, useDashboardState } from "@/hooks/dashboard/useDashboardState";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user } = useUser();

  const { setActivePage } = useDashboardState();
  useEffect(() => {
    // If someone directly access dashboard page
    setActivePage(Pages.Podcasts);
  }, []);

  return (
    <div className="h-auto bg-background flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-foreground">
        Welcome to your Dashboard
      </h1>
      <p className="text-lg text-muted-foreground mb-2">
        Hello, {user?.firstName || user?.username || "User"}!
      </p>
      <p className="text-muted-foreground">
        This is your dashboard. More features coming soon.
      </p>
    </div>
  );
}
