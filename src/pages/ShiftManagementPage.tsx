import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Clock, CheckCircle2 } from "lucide-react";
import DataTable from "@/components/shared/DataTable";
import ModalForm from "@/components/shared/ModalForm";
import { InputField, SelectField } from "@/components/shared/FormField";
import { toast } from "sonner";

const shifts = [
  { id: 1, shift: "Morning", attendant: "John Obi", pump: "Pump 1", openMeter: "145,100.0", closeMeter: "145,230.5", litres: "130.5", status: "Closed" },
  { id: 2, shift: "Morning", attendant: "Ada Nwosu", pump: "Pump 3", openMeter: "67,300.0", closeMeter: "67,450.8", litres: "150.8", status: "Closed" },
  { id: 3, shift: "Afternoon", attendant: "Emeka Eze", pump: "Pump 2", openMeter: "98,000.0", closeMeter: "—", litres: "—", status: "Active" },
  { id: 4, shift: "Afternoon", attendant: "Fatima Bello", pump: "Pump 5", openMeter: "23,500.0", closeMeter: "—", litres: "—", status: "Active" },
];

const columns = [
  { key: "shift", label: "Shift" },
  { key: "attendant", label: "Attendant" },
  { key: "pump", label: "Pump" },
  { key: "openMeter", label: "Open Meter" },
  { key: "closeMeter", label: "Close Meter" },
  { key: "litres", label: "Litres Sold" },
  { key: "status", label: "Status", render: (v: string) => (
    <span className={`status-badge ${v === "Active" ? "status-active" : "status-maintenance"}`}>
      {v === "Active" ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />} {v}
    </span>
  )},
];

export default function ShiftManagementPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ shift: "", attendant: "", pump: "", openMeter: "" });

  const handleSubmit = () => {
    if (!form.shift || !form.attendant || !form.pump) { toast.error("Fill all fields"); return; }
    toast.success("Shift created successfully");
    setModalOpen(false);
    setForm({ shift: "", attendant: "", pump: "", openMeter: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{shifts.filter(s => s.status === "Active").length} active shifts</p>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Create Shift
        </motion.button>
      </div>
      <DataTable columns={columns} data={shifts} />
      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} title="Create New Shift" onSubmit={handleSubmit}>
        <SelectField label="Shift" value={form.shift} onChange={(e: any) => setForm({ ...form, shift: e.target.value })} options={[{ value: "Morning", label: "Morning (6AM-2PM)" }, { value: "Afternoon", label: "Afternoon (2PM-10PM)" }, { value: "Night", label: "Night (10PM-6AM)" }]} />
        <SelectField label="Attendant" value={form.attendant} onChange={(e: any) => setForm({ ...form, attendant: e.target.value })} options={[{ value: "John Obi", label: "John Obi" }, { value: "Ada Nwosu", label: "Ada Nwosu" }, { value: "Emeka Eze", label: "Emeka Eze" }, { value: "Fatima Bello", label: "Fatima Bello" }]} />
        <SelectField label="Pump" value={form.pump} onChange={(e: any) => setForm({ ...form, pump: e.target.value })} options={[{ value: "Pump 1", label: "Pump 1 - PMS" }, { value: "Pump 2", label: "Pump 2 - PMS" }, { value: "Pump 3", label: "Pump 3 - AGO" }, { value: "Pump 5", label: "Pump 5 - DPK" }]} />
        <InputField label="Opening Meter Reading" type="number" value={form.openMeter} onChange={(e: any) => setForm({ ...form, openMeter: e.target.value })} placeholder="0.0" />
      </ModalForm>
    </div>
  );
}
