"use client";

import { Pages, useDashboardState } from "@/hooks/dashboard/useDashboardState";
import { useEffect } from "react";

export default function SettingsPage() {
  const { setActivePage } = useDashboardState();
  useEffect(() => {
    // If someone directly access settings page
    setActivePage(Pages.Settings);
  }, []);

  return <div>Settings</div>;
}
