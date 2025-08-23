"use client";
import { DashboardSideBar } from "@/components/dashboard/DashboardSideBar";
import { DashboardStateProvider } from "@/hooks/dashboard/useDashboardState";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/auth");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <DashboardStateProvider>
      <div className="flex h-screen">
        <DashboardSideBar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </DashboardStateProvider>
  );
}
