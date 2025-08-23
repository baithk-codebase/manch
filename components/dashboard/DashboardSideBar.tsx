"use client";

import {
  PageName,
  Pages,
  useDashboardState,
} from "@/hooks/dashboard/useDashboardState";
import { useUser, useClerk } from "@clerk/nextjs";
import { Home, Podcast, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardSideBar() {
  const router = useRouter();
  const { activePage } = useDashboardState();
  const { user } = useUser();
  const { signOut } = useClerk();

  const getIcon = (pageName: PageName) => {
    switch (pageName) {
      case "Podcasts":
        return <Podcast className="w-5 h-5" />;
      case "Settings":
        return <Settings className="w-5 h-5" />;
      default:
        return <Home className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-72 relative h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 shadow-xl">
      {/* Header - Baithk Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">Manch</h1>
            <p className="text-slate-400 text-sm">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="mb-4">
          <h2 className="text-slate-400 text-xs font-medium uppercase tracking-wider px-3 mb-2">
            Navigation
          </h2>
        </div>

        <ul className="space-y-2">
          {Object.values(Pages).map((page) => (
            <li key={page.name}>
              <button
                onClick={() => {
                  router.push(page.path);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activePage === page
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white hover:shadow-md"
                }`}
              >
                <div
                  className={`transition-all duration-200 ${
                    activePage === page
                      ? "text-white"
                      : "text-slate-400 group-hover:text-blue-400"
                  }`}
                >
                  {getIcon(page.name)}
                </div>
                <span className="font-medium">{page.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 px-3">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
              <span className="text-slate-300 text-sm font-medium">
                {user?.firstName?.slice(0, 1)}
              </span>
            </div>
            <div>
              <p className="text-slate-300 text-sm font-medium">
                {user?.firstName}
              </p>
              <p className="text-slate-500 text-xs">Online</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="p-2 text-slate-400 hover:text-red-400 transition-colors duration-200"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
