import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import DataTable from "@/components/shared/DataTable";
import ModalForm from "@/components/shared/ModalForm";
import { InputField, SelectField } from "@/components/shared/FormField";
import { toast } from "sonner";

const initialPumps = [
  { id: 1, name: "Pump 1", fuel: "PMS (Petrol)", meter: "145,230.5", status: "Active" },
  { id: 2, name: "Pump 2", fuel: "PMS (Petrol)", meter: "98,112.3", status: "Active" },
  { id: 3, name: "Pump 3", fuel: "AGO (Diesel)", meter: "67,450.8", status: "Active" },
  { id: 4, name: "Pump 4", fuel: "AGO (Diesel)", meter: "52,890.1", status: "Maintenance" },
  { id: 5, name: "Pump 5", fuel: "DPK (Kerosene)", meter: "23,670.4", status: "Active" },
  { id: 6, name: "Pump 6", fuel: "PMS (Petrol)", meter: "189,340.7", status: "Active" },
  { id: 7, name: "Pump 7", fuel: "AGO (Diesel)", meter: "34,120.9", status: "Inactive" },
  { id: 8, name: "Pump 8", fuel: "PMS (Petrol)", meter: "76,890.2", status: "Active" },
];

export default function PumpManagementPage() {
  const [pumps, setPumps] = useState(initialPumps);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", fuel: "", meter: "" });

  const columns = [
    { key: "name", label: "Pump Name" },
    { key: "fuel", label: "Fuel Type" },
    { key: "meter", label: "Current Meter" },
    { key: "status", label: "Status", render: (v: string) => (
      <span className={`status-badge ${v === "Active" ? "status-active" : v === "Maintenance" ? "status-maintenance" : "status-inactive"}`}>{v}</span>
    )},
    { key: "id", label: "Actions", render: (_: any, row: any) => (
      <div className="flex gap-1">
        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="View"><Eye className="w-4 h-4 text-primary" /></button>
        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Edit"><Edit className="w-4 h-4 text-muted-foreground" /></button>
        <button onClick={() => { setPumps(pumps.filter(p => p.id !== row.id)); toast.success("Pump deleted"); }} className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Delete"><Trash2 className="w-4 h-4 text-destructive" /></button>
      </div>
    )},
  ];

  const handleSubmit = () => {
    if (!form.name || !form.fuel) { toast.error("Please fill all required fields"); return; }
    setPumps([...pumps, { id: Date.now(), name: form.name, fuel: form.fuel, meter: form.meter || "0", status: "Active" }]);
    toast.success("Pump added successfully");
    setForm({ name: "", fuel: "", meter: "" });
    setModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{pumps.length} pumps configured</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Pump
        </motion.button>
      </div>
      <DataTable columns={columns} data={pumps} />
      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} title="Add New Pump" onSubmit={handleSubmit}>
        <InputField label="Pump Name" value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Pump 9" />
        <SelectField label="Fuel Type" value={form.fuel} onChange={(e: any) => setForm({ ...form, fuel: e.target.value })} options={[
          { value: "PMS (Petrol)", label: "PMS (Petrol)" },
          { value: "AGO (Diesel)", label: "AGO (Diesel)" },
          { value: "DPK (Kerosene)", label: "DPK (Kerosene)" },
        ]} />
        <InputField label="Initial Meter Reading" type="number" value={form.meter} onChange={(e: any) => setForm({ ...form, meter: e.target.value })} placeholder="0.0" />
      </ModalForm>
    </div>
  );
}
