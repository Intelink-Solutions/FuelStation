import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import DataTable from "@/components/shared/DataTable";
import ModalForm from "@/components/shared/ModalForm";
import { InputField, SelectField } from "@/components/shared/FormField";
import { toast } from "sonner";

const expensesData = [
  { id: 1, date: "2026-03-02", category: "Maintenance", description: "Pump 4 nozzle repair", amount: "₦45,000", approvedBy: "Manager" },
  { id: 2, date: "2026-03-02", category: "Utilities", description: "Generator diesel", amount: "₦120,000", approvedBy: "Admin" },
  { id: 3, date: "2026-03-01", category: "Salaries", description: "Casual staff wages", amount: "₦85,000", approvedBy: "Admin" },
  { id: 4, date: "2026-03-01", category: "Supplies", description: "Receipt paper rolls", amount: "₦12,000", approvedBy: "Manager" },
  { id: 5, date: "2026-02-28", category: "Maintenance", description: "Tank inspection", amount: "₦65,000", approvedBy: "Admin" },
];

const columns = [
  { key: "date", label: "Date" },
  { key: "category", label: "Category", render: (v: string) => <span className="status-badge status-active">{v}</span> },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount", render: (v: string) => <span className="font-semibold">{v}</span> },
  { key: "approvedBy", label: "Approved By" },
  { key: "id", label: "Actions", render: () => (
    <div className="flex gap-1 justify-end">
      <button className="p-2 rounded-lg hover:bg-secondary transition-colors"><Edit className="w-4 h-4 text-muted-foreground" /></button>
      <button className="p-2 rounded-lg hover:bg-secondary transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
    </div>
  )},
];

export default function ExpensesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ category: "", description: "", amount: "" });

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm text-muted-foreground">{expensesData.length} expense records</p>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2 accent-gradient text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-md shadow-primary/30 sm:w-auto w-full">
          <Plus className="w-4 h-4" /> Add Expense
        </motion.button>
      </div>
      <DataTable columns={columns} data={expensesData} />
      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} title="Add Expense" onSubmit={() => { toast.success("Expense added"); setModalOpen(false); }}>
        <SelectField label="Category" value={form.category} onChange={(e: any) => setForm({ ...form, category: e.target.value })} options={[{ value: "Maintenance", label: "Maintenance" }, { value: "Utilities", label: "Utilities" }, { value: "Salaries", label: "Salaries" }, { value: "Supplies", label: "Supplies" }]} />
        <InputField label="Description" value={form.description} onChange={(e: any) => setForm({ ...form, description: e.target.value })} placeholder="What was the expense for?" />
        <InputField label="Amount (₦)" type="number" value={form.amount} onChange={(e: any) => setForm({ ...form, amount: e.target.value })} />
      </ModalForm>
    </div>
  );
}
