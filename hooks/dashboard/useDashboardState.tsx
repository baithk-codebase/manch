"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type Theme = "light" | "dark";

export type PageName = "Podcasts" | "Settings";

type PageType = {
  name: PageName;
  path: string;
};
export const Pages: Record<string, PageType> = {
  Podcasts: {
    name: "Podcasts",
    path: "/dashboard/",
  },
  Settings: {
    name: "Settings",
    path: "/dashboard/settings",
  },
};

interface DashboardContextType {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardStateProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<PageType>(Pages.Podcasts);
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <DashboardContext.Provider
      value={{ activePage, setActivePage, theme, toggleTheme }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardState() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error(
      "useDashboardState must be used inside DashboardStateProvider"
    );
  }
  return ctx;
}
