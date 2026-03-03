import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Fuel, Database, DollarSign, Clock,
  Package, Receipt, BarChart3, Users, Shield, Settings,
  LogOut, ChevronLeft, Menu, Droplets, Sun, Moon,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Fuel, label: "Pump Management", path: "/pumps" },
  { icon: Database, label: "Tank Management", path: "/tanks" },
  { icon: DollarSign, label: "Sales", path: "/sales" },
  { icon: Clock, label: "Shift Management", path: "/shifts" },
  { icon: Package, label: "Inventory", path: "/inventory" },
  { icon: Receipt, label: "Expenses", path: "/expenses" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Users, label: "Staff Management", path: "/staff" },
  { icon: Shield, label: "User Roles", path: "/roles" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface AppSidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}

export default function AppSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen, darkMode, setDarkMode }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar-bg bg-gradient-to-b from-sidebar-bg via-sidebar-bg to-primary/10">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 sm:px-5 h-16 border-b border-sidebar-border/90">
        <div className="w-9 h-9 rounded-lg accent-gradient flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/25">
          <Droplets className="w-5 h-5 text-primary-foreground animate-pulse" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-sidebar-active-fg whitespace-nowrap bg-gradient-to-r from-white to-primary-foreground/85 bg-clip-text"
          >
            FuelStation
          </motion.span>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto hide-scrollbar">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNav(item.path)}
              className={`sidebar-item group w-full ${active ? "active" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:rotate-3" />
              {!collapsed && <span>{item.label}</span>}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-1 border-t border-sidebar-border pt-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="sidebar-item w-full"
        >
          {darkMode ? <Sun className="w-5 h-5 flex-shrink-0" /> : <Moon className="w-5 h-5 flex-shrink-0" />}
          {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        <button className="sidebar-item w-full text-red-400 hover:text-red-300">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0 transition-all duration-300 z-30"
        style={{ width: collapsed ? "72px" : "280px" }}
      >
        {sidebarContent}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-screen w-[86vw] max-w-[280px] z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
