import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Plus, Truck } from "lucide-react";
import ModalForm from "@/components/shared/ModalForm";
import { InputField, SelectField } from "@/components/shared/FormField";
import { toast } from "sonner";

const tanks = [
  { id: 1, name: "Tank A", fuel: "PMS (Petrol)", capacity: 33000, current: 3200 },
  { id: 2, name: "Tank B", fuel: "AGO (Diesel)", capacity: 33000, current: 22500 },
  { id: 3, name: "Tank C", fuel: "DPK (Kerosene)", capacity: 25000, current: 4800 },
  { id: 4, name: "Tank D", fuel: "PMS (Petrol)", capacity: 33000, current: 28700 },
];

export default function TankManagementPage() {
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [form, setForm] = useState({ tank: "", qty: "", supplier: "", date: "" });

  const handleDelivery = () => {
    if (!form.tank || !form.qty) { toast.error("Fill required fields"); return; }
    toast.success(`Delivery of ${Number(form.qty).toLocaleString()}L recorded`);
    setForm({ tank: "", qty: "", supplier: "", date: "" });
    setDeliveryOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{tanks.length} tanks configured</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setDeliveryOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Truck className="w-4 h-4" /> Record Delivery
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {tanks.map((tank, i) => {
          const pct = Math.round((tank.current / tank.capacity) * 100);
          const low = pct < 20;
          return (
            <motion.div
              key={tank.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card rounded-xl p-5 card-shadow ${low ? "border-l-4 border-destructive" : ""}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${low ? "bg-destructive/10" : "bg-primary/10"}`}>
                  <Database className={`w-5 h-5 ${low ? "text-destructive" : "text-primary"}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{tank.name}</h4>
                  <p className="text-xs text-muted-foreground">{tank.fuel}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Stock Level</span>
                  <span className={`font-semibold ${low ? "text-destructive" : "text-foreground"}`}>{pct}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-2.5 rounded-full ${low ? "bg-destructive" : "bg-primary"}`}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{tank.current.toLocaleString()}L</span>
                  <span>{tank.capacity.toLocaleString()}L</span>
                </div>
                {low && <p className="text-xs text-destructive font-medium mt-1">⚠️ Low Stock</p>}
              </div>
            </motion.div>
          );
        })}
      </div>

      <ModalForm open={deliveryOpen} onClose={() => setDeliveryOpen(false)} title="Record Fuel Delivery" onSubmit={handleDelivery}>
        <SelectField label="Tank" value={form.tank} onChange={(e: any) => setForm({ ...form, tank: e.target.value })} options={tanks.map(t => ({ value: t.name, label: `${t.name} - ${t.fuel}` }))} />
        <InputField label="Quantity Delivered (Litres)" type="number" value={form.qty} onChange={(e: any) => setForm({ ...form, qty: e.target.value })} placeholder="e.g. 33000" />
        <InputField label="Supplier" value={form.supplier} onChange={(e: any) => setForm({ ...form, supplier: e.target.value })} placeholder="e.g. NNPC" />
        <InputField label="Date" type="date" value={form.date} onChange={(e: any) => setForm({ ...form, date: e.target.value })} />
      </ModalForm>
    </div>
  );
}
