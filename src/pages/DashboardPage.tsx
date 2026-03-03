import { motion } from "framer-motion";
import { DollarSign, Droplets, Database, Fuel, Receipt, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import KPICard from "@/components/shared/KPICard";
import DataTable from "@/components/shared/DataTable";

const weeklyData = [
  { day: "Mon", sales: 245000 },
  { day: "Tue", sales: 312000 },
  { day: "Wed", sales: 278000 },
  { day: "Thu", sales: 390000 },
  { day: "Fri", sales: 425000 },
  { day: "Sat", sales: 510000 },
  { day: "Sun", sales: 380000 },
];

const fuelData = [
  { name: "Petrol (PMS)", value: 45, color: "hsl(144, 85%, 36%)" },
  { name: "Diesel (AGO)", value: 35, color: "hsl(0, 84%, 52%)" },
  { name: "Kerosene (DPK)", value: 20, color: "hsl(0, 0%, 12%)" },
];

const recentTx = [
  { id: "TXN-001", time: "14:32", pump: "Pump 1", fuel: "PMS", litres: "45.2L", amount: "₦31,640", method: "Cash" },
  { id: "TXN-002", time: "14:18", pump: "Pump 3", fuel: "AGO", litres: "120.0L", amount: "₦96,000", method: "POS" },
  { id: "TXN-003", time: "13:55", pump: "Pump 2", fuel: "PMS", litres: "30.5L", amount: "₦21,350", method: "Mobile" },
  { id: "TXN-004", time: "13:40", pump: "Pump 4", fuel: "DPK", litres: "25.0L", amount: "₦12,500", method: "Cash" },
  { id: "TXN-005", time: "13:22", pump: "Pump 1", fuel: "PMS", litres: "50.0L", amount: "₦35,000", method: "Credit" },
];

const lowStockTanks = [
  { tank: "Tank A (PMS)", current: 3200, capacity: 33000, pct: 9.7 },
  { tank: "Tank C (DPK)", current: 4800, capacity: 25000, pct: 19.2 },
];

const txColumns = [
  { key: "id", label: "Txn ID" },
  { key: "time", label: "Time" },
  { key: "pump", label: "Pump" },
  { key: "fuel", label: "Fuel" },
  { key: "litres", label: "Litres" },
  { key: "amount", label: "Amount" },
  { key: "method", label: "Payment", render: (v: string) => (
    <span className="status-badge status-active">{v}</span>
  )},
];

export default function DashboardPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        <KPICard title="Total Sales Today" value={1542000} prefix="₦" icon={DollarSign} color="blue" trend="+12.5% vs yesterday" trendUp delay={0} />
        <KPICard title="Total Litres Sold" value={8450} suffix=" L" icon={Droplets} color="orange" trend="+8.3% vs yesterday" trendUp delay={0.1} />
        <KPICard title="Current Tank Stock" value={45200} suffix=" L" icon={Database} color="green" trend="3 tanks low" delay={0.2} />
        <KPICard title="Active Pumps" value={6} suffix=" / 8" icon={Fuel} color="purple" trend="2 in maintenance" delay={0.3} />
        <KPICard title="Expenses Today" value={285000} prefix="₦" icon={Receipt} color="red" trend="-5.2% vs yesterday" trendUp={false} delay={0.4} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-card rounded-xl p-3 sm:p-5 card-shadow border border-border/70"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Sales Overview</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₦${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, "Sales"]} contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
              <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl p-3 sm:p-5 card-shadow border border-border/70"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Fuel Type Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={fuelData} cx="50%" cy="45%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                {fuelData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => [`${v}%`, ""]} contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Transactions + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">Recent Transactions</h3>
          <DataTable columns={txColumns} data={recentTx} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <h3 className="text-sm font-semibold text-foreground mb-1">⚠️ Low Tank Stock Alerts</h3>
          {lowStockTanks.map((t) => (
            <div key={t.tank} className="bg-card rounded-xl p-4 card-shadow border-l-4 border-destructive">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-semibold">{t.tank}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 mb-1">
                <div className="bg-destructive h-2 rounded-full transition-all" style={{ width: `${t.pct}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">{t.current.toLocaleString()}L / {t.capacity.toLocaleString()}L ({t.pct}%)</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
