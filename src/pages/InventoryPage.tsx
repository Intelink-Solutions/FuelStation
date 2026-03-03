import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Package } from "lucide-react";
import ModalForm from "@/components/shared/ModalForm";
import { InputField, SelectField } from "@/components/shared/FormField";
import { toast } from "sonner";

const products = [
  { id: 1, name: "Engine Oil 5W-30", category: "Lubricants", stock: 45, price: "₦8,500", low: false },
  { id: 2, name: "Brake Fluid DOT 4", category: "Lubricants", stock: 3, price: "₦3,200", low: true },
  { id: 3, name: "ATF Fluid", category: "Lubricants", stock: 28, price: "₦6,500", low: false },
  { id: 4, name: "Bottled Water (Pack)", category: "Store", stock: 120, price: "₦2,500", low: false },
  { id: 5, name: "Coolant 1L", category: "Lubricants", stock: 5, price: "₦4,800", low: true },
  { id: 6, name: "Air Freshener", category: "Store", stock: 67, price: "₦1,500", low: false },
  { id: 7, name: "Gear Oil 80W-90", category: "Lubricants", stock: 2, price: "₦7,200", low: true },
  { id: 8, name: "Snacks (Assorted)", category: "Store", stock: 200, price: "₦500", low: false },
];

export default function InventoryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", stock: "", price: "" });

  const handleSubmit = () => {
    if (!form.name || !form.category) { toast.error("Fill required fields"); return; }
    toast.success("Product added");
    setModalOpen(false);
    setForm({ name: "", category: "", stock: "", price: "" });
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm text-muted-foreground">{products.length} products · {products.filter(p => p.low).length} low stock</p>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2 accent-gradient text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-md shadow-primary/30 sm:w-auto w-full">
          <Plus className="w-4 h-4" /> Add Product
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="kpi-card"
          >
            <div className="w-11 h-11 rounded-xl bg-secondary/70 flex items-center justify-center mb-3 border border-border/60">
              <Package className="w-6 h-6 text-muted-foreground" />
            </div>
            <h4 className="font-semibold text-sm">{p.name}</h4>
            <p className="text-xs text-muted-foreground mb-3">{p.category}</p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold">{p.price}</span>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <span className="text-xs text-muted-foreground">Qty: {p.stock}</span>
                {p.low && <span className="status-badge status-inactive">Low</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} title="Add Product" onSubmit={handleSubmit}>
        <InputField label="Product Name" value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Engine Oil" />
        <SelectField label="Category" value={form.category} onChange={(e: any) => setForm({ ...form, category: e.target.value })} options={[{ value: "Lubricants", label: "Lubricants" }, { value: "Store", label: "Store" }]} />
        <InputField label="Stock Quantity" type="number" value={form.stock} onChange={(e: any) => setForm({ ...form, stock: e.target.value })} />
        <InputField label="Unit Price (₦)" type="number" value={form.price} onChange={(e: any) => setForm({ ...form, price: e.target.value })} />
      </ModalForm>
    </div>
  );
}
