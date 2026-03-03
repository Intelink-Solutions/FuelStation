import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CreditCard, Banknote, Smartphone, Receipt } from "lucide-react";
import { SelectField, InputField } from "@/components/shared/FormField";
import { toast } from "sonner";

const pumps = [
  { value: "pump1", label: "Pump 1 - PMS" },
  { value: "pump2", label: "Pump 2 - PMS" },
  { value: "pump3", label: "Pump 3 - AGO" },
  { value: "pump5", label: "Pump 5 - DPK" },
];

const priceMap: Record<string, number> = { pump1: 700, pump2: 700, pump3: 800, pump5: 500 };

const methods = [
  { id: "cash", label: "Cash", icon: Banknote },
  { id: "pos", label: "POS", icon: CreditCard },
  { id: "mobile", label: "Mobile Money", icon: Smartphone },
  { id: "credit", label: "Credit", icon: Receipt },
];

export default function SalesPage() {
  const [pump, setPump] = useState("");
  const [openMeter, setOpenMeter] = useState("");
  const [closeMeter, setCloseMeter] = useState("");
  const [method, setMethod] = useState("cash");

  const price = priceMap[pump] || 0;
  const litres = useMemo(() => {
    const o = parseFloat(openMeter);
    const c = parseFloat(closeMeter);
    return !isNaN(o) && !isNaN(c) && c > o ? c - o : 0;
  }, [openMeter, closeMeter]);
  const total = litres * price;

  const handleSale = () => {
    if (!pump || litres <= 0) { toast.error("Enter valid meter readings"); return; }
    toast.success(`Sale of ₦${total.toLocaleString()} recorded!`);
    setPump(""); setOpenMeter(""); setCloseMeter("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-4 sm:p-6 card-shadow border border-border/70 space-y-5">
        <h3 className="text-lg font-semibold">New Sale</h3>
        <SelectField label="Select Pump" value={pump} onChange={(e: any) => setPump(e.target.value)} options={pumps} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <InputField label="Opening Meter" type="number" value={openMeter} onChange={(e: any) => setOpenMeter(e.target.value)} placeholder="0.0" />
          <InputField label="Closing Meter" type="number" value={closeMeter} onChange={(e: any) => setCloseMeter(e.target.value)} placeholder="0.0" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 bg-secondary/50 rounded-xl p-3 sm:p-4 border border-border/60">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Litres</p>
            <p className="text-lg font-bold text-primary">{litres.toFixed(1)} L</p>
          </div>
          <div className="text-center sm:border-x border-border sm:px-2">
            <p className="text-xs text-muted-foreground">Price/L</p>
            <p className="text-lg font-bold">₦{price}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold text-accent">₦{total.toLocaleString()}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium hover:-translate-y-0.5 ${method === m.id ? "border-primary bg-primary/10 text-primary shadow-md shadow-primary/15" : "border-border hover:border-muted-foreground/30"}`}
              >
                <m.icon className="w-5 h-5" />
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSale} className="flex-1 py-2.5 accent-gradient text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md shadow-primary/30">
            Complete Sale
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => toast.info("Receipt generated!")} className="px-4 py-2.5 border border-border rounded-lg font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2">
            <Receipt className="w-4 h-4" /> Receipt
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
