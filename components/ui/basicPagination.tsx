import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface BasicPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
}

const BasicPagination: React.FC<BasicPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  disabled = false,
  className = "",
}) => {
  const getPaginationItems = () => {
    const items = [];

    items.push(
      <PaginationItem key={0} onClick={() => onPageChange(0)}>
        <PaginationLink isActive={currentPage === 0}>{1}</PaginationLink>
      </PaginationItem>,
    );

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages - 2, currentPage + 1);

    if (currentPage <= 1) {
      startPage = 1;
      endPage = Math.min(totalPages - 2, 2);
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 3;
      endPage = totalPages - 2;
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i} onClick={() => onPageChange(i)}>
          <PaginationLink isActive={currentPage === i}>{i + 1}</PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages - 2) {
      items.push(
        <PaginationItem key="right-ellipsis">
          <PaginationLink>...</PaginationLink>
        </PaginationItem>,
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem
          key={totalPages - 1}
          onClick={() => onPageChange(totalPages - 1)}
        >
          <PaginationLink isActive={currentPage === totalPages - 1}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <Pagination
      className={cn(
        "flex justify-end",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <PaginationContent>{getPaginationItems()}</PaginationContent>
    </Pagination>
  );
};

export default BasicPagination;
