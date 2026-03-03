import { motion } from "framer-motion";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function DataTable({ columns, data, onRowClick }: DataTableProps) {
  return (
    <div className="bg-card rounded-xl card-shadow overflow-hidden border border-border/70">
      <div className="sm:hidden p-3 space-y-3">
        {data.map((row, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onRowClick?.(row)}
            className="w-full text-left rounded-lg border border-border bg-secondary/30 p-3 hover:bg-secondary/50 transition-colors"
          >
            <div className="space-y-2">
              {columns.map((col) => (
                <div key={col.key} className="flex items-start justify-between gap-3">
                  <span className="text-xs font-semibold text-muted-foreground">{col.label}</span>
                  <span className="text-xs text-right font-medium text-foreground">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </span>
                </div>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="hidden sm:block overflow-x-auto hide-scrollbar">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-3 lg:px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onRowClick?.(row)}
                className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-3 lg:px-4 py-3 whitespace-nowrap">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
