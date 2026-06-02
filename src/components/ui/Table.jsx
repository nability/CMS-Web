// src/components/ui/Table.jsx
import clsx from "clsx";

/**
 * Komponen table yang konsisten dan responsive.
 *
 * Penggunaan:
 * <Table
 *   columns={[
 *     { key: "title", label: "Judul", className: "min-w-[200px]" },
 *     { key: "status", label: "Status", render: (row) => <Badge variant={row.status} /> },
 *   ]}
 *   data={rows}
 *   keyField="id"
 *   emptyText="Tidak ada data"
 *   loading={isLoading}
 * />
 */
export function Table({ columns, data = [], keyField = "id", emptyText = "Tidak ada data.", loading = false, onRowClick, className }) {
  return (
    <div className={clsx("overflow-x-auto rounded-xl border border-gray-100", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  "px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap",
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 bg-white">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Memuat data...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-16 text-center text-gray-400 text-sm">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row[keyField]}
                onClick={() => onRowClick?.(row)}
                className={clsx(
                  "transition-colors duration-100",
                  onRowClick ? "cursor-pointer hover:bg-orange-50/40" : "hover:bg-gray-50/60"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={clsx("px-5 py-3.5 text-gray-700", col.cellClassName)}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
