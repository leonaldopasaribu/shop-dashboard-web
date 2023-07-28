"use client";

import { useEffect, useState } from "react";

import { CartsTable } from "./components/carts-table";

import { LoadingScreen } from "@/shared/components/loading-screen";
import { Pagination } from "@/shared/components/pagination";

import { useCart } from "@/shared/services/use-cart";
import { useCalculatePagination } from "@/shared/services/use-pagination";

export default function Carts() {
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);

  const { fetchCarts, carts, isLoading, total, limit } = useCart();

  const paginationData = {
    totalProducts: total,
    limit: limit,
  };

  const { currentPage, totalPage } = useCalculatePagination(
    paginationData,
    page
  );

  function handlePreviousPage(): void {
    setPage(page - 1);
    setSkip(skip - limit);
  }

  function handleNextPage(): void {
    setPage(page + 1);
    setSkip(skip + limit);
  }

  useEffect(() => {
    fetchCarts(skip);
  }, [skip]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div>
        <CartsTable carts={carts} />
      </div>

      <div className="mt-3">
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
}
