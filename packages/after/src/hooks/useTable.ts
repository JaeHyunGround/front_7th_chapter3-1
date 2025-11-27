import { useState, useMemo, useEffect } from "react";

export type SortDirection = "asc" | "desc" | null;

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface UseTableOptions<T> {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  searchable?: boolean;
}

export interface UseTableReturn<T> {
  // Data
  paginatedData: T[];
  columns: Column<T>[];

  // Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Sorting
  sortColumn: string | null;
  sortDirection: SortDirection;
  handleSort: (columnKey: string) => void;

  // Pagination
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;

  // Helpers
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

export function useTable<T>({
  data,
  columns,
  itemsPerPage = 10,
  searchable = true,
}: UseTableOptions<T>): UseTableReturn<T> {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 검색 필터링
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm.trim()) {
      return data;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return data.filter((row) =>
      Object.values(row as Record<string, unknown>).some((value) =>
        String(value).toLowerCase().includes(lowerSearchTerm)
      )
    );
  }, [data, searchTerm, searchable]);

  // 정렬
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      const aValue = (a as Record<string, unknown>)[sortColumn];
      const bValue = (b as Record<string, unknown>)[sortColumn];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // 페이지네이션
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedData.length);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // 정렬 핸들러
  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      // 같은 컬럼 클릭: asc -> desc -> null 순환
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      // 새로운 컬럼 클릭: asc부터 시작
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  // 검색어나 정렬이 변경되면 첫 페이지로
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortColumn, sortDirection]);

  return {
    // Data
    paginatedData,
    columns,

    // Search
    searchTerm,
    setSearchTerm,

    // Sorting
    sortColumn,
    sortDirection,
    handleSort,

    // Pagination
    currentPage,
    totalPages,
    setCurrentPage,
    itemsPerPage,

    // Helpers
    totalItems: sortedData.length,
    startIndex,
    endIndex,
  };
}
