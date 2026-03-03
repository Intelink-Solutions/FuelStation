import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import TopBar from "./TopBar";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/pumps": "Pump Management",
  "/tanks": "Tank Management",
  "/sales": "Sales",
  "/shifts": "Shift Management",
  "/inventory": "Inventory",
  "/expenses": "Expenses",
  "/reports": "Reports",
  "/staff": "Staff Management",
  "/roles": "User Roles & Permissions",
  "/settings": "Settings",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const title = pageTitles[location.pathname] || "FuelStation";

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setMobileOpen(true)} title={title} />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto hide-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
