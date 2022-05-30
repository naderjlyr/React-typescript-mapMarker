import { useState, useEffect } from "react";
import PropTypes from "prop-types";

type IUsePagination = {
  current: number;
  display: any[];
  pages: number;
  next: () => void;
  previous: () => void;
  first: () => void;
  last: () => void;
  set: (num: number) => void;
};

type UsePaginationProps = {
  items: any[];
  size: number;
};

type PaginationFnProps = {
  total: number;
  current: number;
  size: number;
};

export const paginate = ({ total, current, size }: PaginationFnProps) => {
  let pages = Math.ceil(total / size);

  if (current < 1) {
    current = 1;
  } else if (current > pages) {
    current = pages;
  }

  let start = (current - 1) * size;
  let end = Math.min(start + size - 1, total - 1);

  return {
    start,
    end,
  };
};

const usePagination = ({
  items,
  size = 10,
}: UsePaginationProps): IUsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayItems, setDisplayItems] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(items.length / size)
  );

  useEffect(() => {
    setTotalPages(Math.ceil(items.length / size));
    const { start, end } = paginate({
      total: items.length,
      current: currentPage,
      size,
    });
    const display = items.slice(start, end + 1);

    setDisplayItems(display);
  }, [currentPage, items, size]);

  return {
    current: currentPage,
    display: displayItems,
    pages: totalPages,
    next: () => setCurrentPage(currentPage + 1),
    previous: () => setCurrentPage(currentPage - 1),
    first: () => setCurrentPage(1),
    last: () => setCurrentPage(Math.ceil(items.length / size)),
    set: (num: number) => setCurrentPage(num),
  };
};

usePagination.PropTypes = {
  size: PropTypes.number,
  items: PropTypes.array,
};

usePagination.defaultProps = {
  size: 10,
  items: [],
};

export default usePagination;
