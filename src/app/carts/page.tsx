"use client";

import { useEffect, useState } from "react";

import { CartsTable } from "./components/carts-table";

import { LoadingScreen } from "@/shared/components/loading-screen";
import { Pagination } from "@/shared/components/pagination";

import { useCart } from "@/shared/services/use-cart";
import { useUser } from "@/shared/services/use-user";
import { useCalculatePagination } from "@/shared/services/use-pagination";

export default function Carts() {
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);

  const { fetchCarts, carts, isLoading, total, limit } = useCart();
  const { fetchUsers, users } = useUser();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Carts</h1>
      <div className="overflow-auto max-w-[334px] sm:max-w-full">
        <CartsTable carts={carts} users={users} />
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
