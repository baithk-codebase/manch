"use client";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();

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
