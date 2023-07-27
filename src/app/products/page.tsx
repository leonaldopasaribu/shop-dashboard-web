"use client";

import React, { useEffect, useState } from "react";

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
import { SearchInput } from "@/shared/components/search-input";

import { useProduct } from "@/hooks/products.hook";
import { useCalculatePagination } from "@/hooks/pagination.hook";

import { formatCurrency } from "@/shared/utils/format-currency";

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
      <div>
        <SearchInput placeholder="Search Product" onSearch={handleSearch} />
      </div>

      <Table className="w-full mt-3">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="capitalize">
              <TableCell>{product.id}</TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
