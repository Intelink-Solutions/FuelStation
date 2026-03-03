import { motion } from "framer-motion";
import { Building2, Palette, Bell, Database, Globe, Lock } from "lucide-react";

const sections = [
  { icon: Building2, title: "Station Information", desc: "Name, address, and contact details" },
  { icon: Palette, title: "Appearance", desc: "Theme, logo, and branding" },
  { icon: Bell, title: "Notifications", desc: "Email and SMS alert preferences" },
  { icon: Database, title: "Backup & Data", desc: "Database backup and restore" },
  { icon: Globe, title: "Regional", desc: "Currency, timezone, language" },
  { icon: Lock, title: "Security", desc: "Password policies and 2FA" },
];

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-4">
      {sections.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-card rounded-xl p-5 card-shadow flex items-center gap-4 hover:card-shadow-hover transition-shadow cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <s.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">{s.title}</h4>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
