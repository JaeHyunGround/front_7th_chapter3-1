/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PaginationButton } from "../ui/pagination-button";

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

// 🚨 Bad Practice: UI 컴포넌트가 도메인 타입을 알고 있음
interface TableProps {
  columns?: Column[];
  data?: any[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: any) => void;

  // 🚨 도메인 관심사 추가
  entityType?: "user" | "post";
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection =
      sortColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return newDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return newDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setTableData(sorted);
  };

  const filteredData =
    searchable && searchTerm
      ? tableData.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : tableData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const tableClasses = [
    "table",
    striped && "table-striped",
    bordered && "table-bordered",
    hover && "table-hover",
  ]
    .filter(Boolean)
    .join(" ");

  const actualColumns =
    columns ||
    (tableData[0]
      ? Object.keys(tableData[0]).map((key) => ({
          key,
          header: key,
          width: undefined,
        }))
      : []);

  // 🚨 Bad Practice: Table 컴포넌트가 도메인별 렌더링 로직을 알고 있음
  const renderCell = (row: any, columnKey: string) => {
    const value = row[columnKey];

    // 도메인별 특수 렌더링
    if (entityType === "user") {
      if (columnKey === "role") {
        // User role을 variant로 매핑
        const roleConfig: Record<
          string,
          { variant: "red" | "orange" | "blue" | "gray"; label: string }
        > = {
          admin: { variant: "red", label: "관리자" },
          moderator: { variant: "orange", label: "운영자" },
          user: { variant: "blue", label: "사용자" },
          guest: { variant: "gray", label: "게스트" },
        };
        const config = roleConfig[value] || {
          variant: "gray" as const,
          label: value,
        };
        return <Badge variant={config.variant}>{config.label}</Badge>;
      }
      if (columnKey === "status") {
        // User status를 variant와 label로 매핑
        const statusConfig: Record<
          string,
          { variant: "green" | "gray" | "red"; label: string }
        > = {
          active: { variant: "green", label: "Active" },
          inactive: { variant: "gray", label: "Inactive" },
          suspended: { variant: "red", label: "Suspended" },
        };
        const config = statusConfig[value] || {
          variant: "gray" as const,
          label: value,
        };
        return <Badge variant={config.variant}>{config.label}</Badge>;
      }
      if (columnKey === "lastLogin") {
        return value || "-";
      }
      if (columnKey === "actions") {
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button size="sm" variant="blue" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="red" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    if (entityType === "post") {
      if (columnKey === "category") {
        // Category를 variant로 매핑
        const categoryConfig: Record<
          string,
          "blue" | "red" | "green" | "orange" | "gray"
        > = {
          development: "blue",
          design: "blue",
          accessibility: "red",
        };
        const variant = categoryConfig[value] || "gray";
        return (
          <Badge variant={variant} shape="pill">
            {value}
          </Badge>
        );
      }
      if (columnKey === "status") {
        // Post status를 variant와 label로 매핑
        const statusConfig: Record<
          string,
          { variant: "green" | "orange" | "gray"; label: string }
        > = {
          published: { variant: "green", label: "게시됨" },
          draft: { variant: "orange", label: "임시저장" },
          archived: { variant: "gray", label: "보관됨" },
        };
        const config = statusConfig[value] || {
          variant: "gray" as const,
          label: value,
        };
        return <Badge variant={config.variant}>{config.label}</Badge>;
      }
      if (columnKey === "views") {
        return value?.toLocaleString() || "0";
      }
      if (columnKey === "actions") {
        return (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button size="sm" variant="blue" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {row.status === "draft" && (
              <Button
                size="sm"
                variant="green"
                onClick={() => onPublish?.(row.id)}
              >
                게시
              </Button>
            )}
            {row.status === "published" && (
              <Button
                size="sm"
                variant="gray"
                onClick={() => onArchive?.(row.id)}
              >
                보관
              </Button>
            )}
            {row.status === "archived" && (
              <Button
                size="sm"
                variant="blue"
                onClick={() => onRestore?.(row.id)}
              >
                복원
              </Button>
            )}
            <Button size="sm" variant="red" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    // React Element면 그대로 렌더링
    if (React.isValidElement(value)) {
      return value;
    }

    return value;
  };

  return (
    <div className="table-container">
      {searchable && (
        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "300px",
            }}
          />
        </div>
      )}

      <table className={tableClasses}>
        <thead>
          <tr>
            {actualColumns.map((column) => (
              <th
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: sortable ? "pointer" : "default",
                  }}
                >
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
            >
              {actualColumns.map((column) => (
                <td key={column.key}>
                  {entityType ? renderCell(row, column.key) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <PaginationButton
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            이전
          </PaginationButton>
          <span style={{ padding: "6px 12px" }}>
            {currentPage} / {totalPages}
          </span>
          <PaginationButton
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </PaginationButton>
        </div>
      )}
    </div>
  );
};
