import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import PumpManagementPage from "./pages/PumpManagementPage";
import TankManagementPage from "./pages/TankManagementPage";
import SalesPage from "./pages/SalesPage";
import ShiftManagementPage from "./pages/ShiftManagementPage";
import InventoryPage from "./pages/InventoryPage";
import ExpensesPage from "./pages/ExpensesPage";
import ReportsPage from "./pages/ReportsPage";
import StaffManagementPage from "./pages/StaffManagementPage";
import RolesPage from "./pages/RolesPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout><></></DashboardLayout>}>
          </Route>
          <Route path="/" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/pumps" element={<DashboardLayout><PumpManagementPage /></DashboardLayout>} />
          <Route path="/tanks" element={<DashboardLayout><TankManagementPage /></DashboardLayout>} />
          <Route path="/sales" element={<DashboardLayout><SalesPage /></DashboardLayout>} />
          <Route path="/shifts" element={<DashboardLayout><ShiftManagementPage /></DashboardLayout>} />
          <Route path="/inventory" element={<DashboardLayout><InventoryPage /></DashboardLayout>} />
          <Route path="/expenses" element={<DashboardLayout><ExpensesPage /></DashboardLayout>} />
          <Route path="/reports" element={<DashboardLayout><ReportsPage /></DashboardLayout>} />
          <Route path="/staff" element={<DashboardLayout><StaffManagementPage /></DashboardLayout>} />
          <Route path="/roles" element={<DashboardLayout><RolesPage /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
