import { motion } from "framer-motion";
import { Shield, Check, X } from "lucide-react";

const roles = [
  {
    name: "Super Admin",
    desc: "Full system access",
    permissions: { dashboard: true, pumps: true, tanks: true, sales: true, shifts: true, inventory: true, expenses: true, reports: true, staff: true, roles: true, settings: true },
  },
  {
    name: "Manager",
    desc: "Station management",
    permissions: { dashboard: true, pumps: true, tanks: true, sales: true, shifts: true, inventory: true, expenses: true, reports: true, staff: false, roles: false, settings: false },
  },
  {
    name: "Attendant",
    desc: "POS and pump operations",
    permissions: { dashboard: true, pumps: false, tanks: false, sales: true, shifts: true, inventory: false, expenses: false, reports: false, staff: false, roles: false, settings: false },
  },
  {
    name: "Accountant",
    desc: "Financial access",
    permissions: { dashboard: true, pumps: false, tanks: false, sales: true, shifts: false, inventory: true, expenses: true, reports: true, staff: false, roles: false, settings: false },
  },
];

const permLabels: Record<string, string> = {
  dashboard: "Dashboard", pumps: "Pumps", tanks: "Tanks", sales: "Sales",
  shifts: "Shifts", inventory: "Inventory", expenses: "Expenses",
  reports: "Reports", staff: "Staff", roles: "Roles", settings: "Settings",
};

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role, i) => (
          <motion.div
            key={role.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-5 card-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{role.name}</h4>
                <p className="text-xs text-muted-foreground">{role.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(role.permissions).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2 text-sm">
                  {val ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-muted-foreground/40" />}
                  <span className={val ? "text-foreground" : "text-muted-foreground/50"}>{permLabels[key]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
