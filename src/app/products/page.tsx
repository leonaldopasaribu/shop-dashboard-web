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
import { Loading } from "@/shared/components/loading";
import { Pagination } from "@/shared/components/pagination";

import { useProduct } from "@/hooks/products.hook";
import { useCalculatePagination } from "@/hooks/pagination.hook";
import { LIMIT } from "@/shared/constants/limit.constant";

export default function Products() {
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);

  const { fetchProducts, isLoading, products, total, limit } = useProduct();

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
    fetchProducts(skip);
  }, [skip]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Table className="w-full">
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
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-2">
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
