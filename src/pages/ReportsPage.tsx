import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Printer, Filter } from "lucide-react";
import { SelectField, InputField } from "@/components/shared/FormField";
import DataTable from "@/components/shared/DataTable";
import { toast } from "sonner";

const reportData = [
  { date: "2026-03-02", fuel: "PMS", litres: "2,450", amount: "₦1,715,000", shift: "Morning", method: "Cash" },
  { date: "2026-03-02", fuel: "AGO", litres: "1,800", amount: "₦1,440,000", shift: "Morning", method: "POS" },
  { date: "2026-03-02", fuel: "PMS", litres: "1,200", amount: "₦840,000", shift: "Afternoon", method: "Cash" },
  { date: "2026-03-01", fuel: "DPK", litres: "500", amount: "₦250,000", shift: "Morning", method: "Mobile" },
  { date: "2026-03-01", fuel: "PMS", litres: "3,100", amount: "₦2,170,000", shift: "Afternoon", method: "Cash" },
  { date: "2026-03-01", fuel: "AGO", litres: "2,200", amount: "₦1,760,000", shift: "Night", method: "Credit" },
];

const columns = [
  { key: "date", label: "Date" },
  { key: "fuel", label: "Fuel Type" },
  { key: "litres", label: "Litres" },
  { key: "amount", label: "Amount", render: (v: string) => <span className="font-semibold">{v}</span> },
  { key: "shift", label: "Shift" },
  { key: "method", label: "Payment" },
];

export default function ReportsPage() {
  const [filters, setFilters] = useState({ from: "", to: "", fuel: "", shift: "", method: "" });

  return (
    <div className="space-y-4 sm:space-y-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-4 sm:p-5 card-shadow border border-border/70">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Filters</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <InputField label="From" type="date" value={filters.from} onChange={(e: any) => setFilters({ ...filters, from: e.target.value })} />
          <InputField label="To" type="date" value={filters.to} onChange={(e: any) => setFilters({ ...filters, to: e.target.value })} />
          <SelectField label="Fuel Type" value={filters.fuel} onChange={(e: any) => setFilters({ ...filters, fuel: e.target.value })} options={[{ value: "PMS", label: "PMS" }, { value: "AGO", label: "AGO" }, { value: "DPK", label: "DPK" }]} />
          <SelectField label="Shift" value={filters.shift} onChange={(e: any) => setFilters({ ...filters, shift: e.target.value })} options={[{ value: "Morning", label: "Morning" }, { value: "Afternoon", label: "Afternoon" }, { value: "Night", label: "Night" }]} />
          <SelectField label="Payment" value={filters.method} onChange={(e: any) => setFilters({ ...filters, method: e.target.value })} options={[{ value: "Cash", label: "Cash" }, { value: "POS", label: "POS" }, { value: "Mobile", label: "Mobile" }, { value: "Credit", label: "Credit" }]} />
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-2">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => toast.success("PDF exported")} className="flex items-center justify-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity sm:w-auto w-full">
          <FileText className="w-4 h-4" /> Export PDF
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => toast.success("Excel exported")} className="flex items-center justify-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity sm:w-auto w-full">
          <Download className="w-4 h-4" /> Export Excel
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => window.print()} className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors sm:w-auto w-full">
          <Printer className="w-4 h-4" /> Print
        </motion.button>
      </div>

      <DataTable columns={columns} data={reportData} />
    </div>
  );
}
