interface PaginationData {
  totalProducts: number;
  limit: number;
}

export function useCalculatePagination(
  paginationData: PaginationData,
  currentPage: number
) {
  const { totalProducts, limit } = paginationData;

  const totalPage = Math.ceil(totalProducts / limit);

  currentPage = Math.max(1, Math.min(currentPage, totalPage));

  return {
    currentPage,
    totalPage,
  };
}
