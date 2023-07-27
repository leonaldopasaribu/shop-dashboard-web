"use client";

import React, { useEffect, useState } from "react";

import { ProductsSearch } from "./components/products-search";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table";
import { LoadingScreen } from "@/shared/components/loading-screen";
import { Pagination } from "@/shared/components/pagination";

import { formatCurrency } from "@/shared/utils/format-currency";

import { useProduct } from "@/shared/services/products.hook";
import { useCalculatePagination } from "@/shared/services/pagination.hook";
import { ProductsTable } from "./components/products-table";

export default function Products() {
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    fetchProducts,
    fetchProductByName,
    isLoading,
    products,
    total,
    limit,
  } = useProduct();

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

  const handleSearch = (value: string): void => {
    setSearchQuery(value);
  };

  useEffect(() => {
    fetchProducts(skip);
  }, [skip]);

  useEffect(() => {
    fetchProductByName(searchQuery);
  }, [searchQuery]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="flex">
        <ProductsSearch handleSearch={handleSearch} />
      </div>

      <div className="flex">
        <ProductsTable products={products} />
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
