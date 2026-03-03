import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, User } from "lucide-react";
import DataTable from "@/components/shared/DataTable";
import ModalForm from "@/components/shared/ModalForm";
import { InputField, SelectField } from "@/components/shared/FormField";
import { toast } from "sonner";

const staff = [
  { id: 1, name: "Chukwudi Okafor", role: "Admin", email: "chukwudi@fsms.com", phone: "08012345678", status: "Active" },
  { id: 2, name: "Amina Mohammed", role: "Manager", email: "amina@fsms.com", phone: "08023456789", status: "Active" },
  { id: 3, name: "John Obi", role: "Attendant", email: "john@fsms.com", phone: "08034567890", status: "Active" },
  { id: 4, name: "Ada Nwosu", role: "Attendant", email: "ada@fsms.com", phone: "08045678901", status: "Active" },
  { id: 5, name: "Emeka Eze", role: "Attendant", email: "emeka@fsms.com", phone: "08056789012", status: "On Leave" },
  { id: 6, name: "Fatima Bello", role: "Accountant", email: "fatima@fsms.com", phone: "08067890123", status: "Active" },
];

const roleColors: Record<string, string> = {
  Admin: "bg-primary/10 text-primary",
  Manager: "bg-accent/10 text-accent",
  Attendant: "bg-success/10 text-success",
  Accountant: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
};

const columns = [
  { key: "name", label: "Name", render: (v: string) => (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
        <User className="w-4 h-4 text-muted-foreground" />
      </div>
      <span className="font-medium">{v}</span>
    </div>
  )},
  { key: "role", label: "Role", render: (v: string) => <span className={`status-badge ${roleColors[v] || ""}`}>{v}</span> },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status", render: (v: string) => <span className={`status-badge ${v === "Active" ? "status-active" : "status-maintenance"}`}>{v}</span> },
  { key: "id", label: "Actions", render: () => (
    <div className="flex gap-1">
      <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Edit className="w-4 h-4 text-muted-foreground" /></button>
      <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
    </div>
  )},
];

export default function StaffManagementPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", email: "", phone: "" });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{staff.length} staff members</p>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Staff
        </motion.button>
      </div>
      <DataTable columns={columns} data={staff} />
      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} title="Add Staff Member" onSubmit={() => { if (!form.name || !form.role) { toast.error("Fill required fields"); return; } toast.success("Staff added"); setModalOpen(false); }}>
        <InputField label="Full Name" value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jane Doe" />
        <SelectField label="Role" value={form.role} onChange={(e: any) => setForm({ ...form, role: e.target.value })} options={[{ value: "Admin", label: "Admin" }, { value: "Manager", label: "Manager" }, { value: "Attendant", label: "Attendant" }, { value: "Accountant", label: "Accountant" }]} />
        <InputField label="Email" type="email" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} placeholder="email@fsms.com" />
        <InputField label="Phone" value={form.phone} onChange={(e: any) => setForm({ ...form, phone: e.target.value })} placeholder="08012345678" />
      </ModalForm>
    </div>
  );
}
