import type { UseTableReturn } from "@/hooks/useTable";
import { cn } from "@/lib/utils";

interface TableProps<T> {
  table: UseTableReturn<T>;
  onRowClick?: (row: T) => void;
  striped?: boolean;
  hover?: boolean;
}

export function Table<T>({
  table,
  onRowClick,
  striped = false,
  hover = true,
}: TableProps<T>) {
  const { paginatedData, columns, sortColumn, sortDirection, handleSort } =
    table;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-md bg-white dark:bg-gray-800 font-roboto transition-colors">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() =>
                  column.sortable !== false && handleSort(column.key)
                }
                className="px-4 py-4 text-left font-medium text-sm text-black/60 dark:text-gray-300 uppercase tracking-wide border-b-2 border-black/12 dark:border-gray-700"
              >
                <div
                  className={cn(
                    "flex items-center gap-1",
                    column.sortable !== false
                      ? "cursor-pointer"
                      : "cursor-default"
                  )}
                >
                  {column.header}
                  {column.sortable !== false && sortColumn === column.key && (
                    <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-black/87 dark:text-gray-300"
              >
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            paginatedData.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  // striped - 짝수 행 배경색
                  striped && index % 2 === 1 && "bg-gray-50 dark:bg-gray-800",
                  // hover - 호버 시 배경색
                  hover && "hover:bg-black/4 dark:hover:bg-gray-700",
                  // 마지막 행이 아니면 border-bottom
                  index !== paginatedData.length - 1 &&
                    "border-b border-black/8 dark:border-gray-700",
                  // onRowClick이 있으면 커서 포인터
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-4 text-black/87 dark:text-gray-300"
                  >
                    {column.render
                      ? column.render(row)
                      : String(
                          (row as Record<string, unknown>)[column.key] ?? ""
                        )}
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
