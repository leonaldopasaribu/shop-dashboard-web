"use client";

import React, { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table";
import { Loading } from "@/shared/components/loading";

import { useProduct } from "@/hooks/products.hook";
import { Pagination } from "@/shared/components/pagination";

export default function Products() {
  const { fetchProducts, isLoading, products } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, []);

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

      <div>
        <Pagination />
      </div>
    </div>
  );
}
