import type { UseTableReturn } from "@/hooks/useTable";
import { PaginationButton } from "./pagination-button";

interface TablePaginationProps<T> {
  table: UseTableReturn<T>;
}

export function TablePagination<T>({ table }: TablePaginationProps<T>) {
  const { currentPage, totalPages, setCurrentPage } = table;

  // 페이지가 1개 이하면 페이지네이션 표시하지 않음
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    setCurrentPage(Math.min(totalPages, currentPage + 1));
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="mt-4 flex gap-2 justify-center">
      <PaginationButton
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className="border border-gray-300"
      >
        이전
      </PaginationButton>
      <span className="px-3 py-1.5 text-gray-800">
        {currentPage} / {totalPages}
      </span>
      <PaginationButton
        onClick={handleNext}
        disabled={!canGoNext}
        className="border border-gray-300"
      >
        다음
      </PaginationButton>
    </div>
  );
}
