"use client";

import React, { useEffect, useState } from "react";

import { ProductsSearch } from "./components/products-search";
import { ProductsTable } from "./components/products-table";

import { LoadingScreen } from "@/shared/components/loading-screen";
import { Pagination } from "@/shared/components/pagination";
import { Button } from "@/shared/components/button";

import { useProduct } from "@/shared/services/use-product";
import { useCalculatePagination } from "@/shared/services/use-pagination";

import { useCategory } from "@/shared/services/use-product-category";
import { useBrands } from "@/shared/services/use-product-brand";
import { Product } from "@/shared/models/product.model";
import { ProductFilter } from "./components/product-filter/product-filter";

export default function Products() {
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isToggleDropdownFilterCategory, setIsToggleDropdownFilterCategory] =
    useState<boolean>(false);
  const [isToggleDropdownFilterBrand, setIsToggleDropdownFilterBrand] =
    useState<boolean>(false);

  const {
    fetchProducts,
    fetchProductByName,
    fetchProductByCategory,
    isLoading,
    products,
    total,
    limit,
  } = useProduct();

  const { fetchCategories, categories } = useCategory();
  const { fetchBrands, brands } = useBrands();

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

  function handleSearch(value: string): void {
    setSearchQuery(value);
  }

  function toggleDropdownFilterCategory(): void {
    setIsToggleDropdownFilterCategory(!isToggleDropdownFilterCategory);
  }

  function toggleDropdownFilterBrand(): void {
    setIsToggleDropdownFilterBrand(!isToggleDropdownFilterBrand);
  }

  function filterProductByCategory(category: string): void {
    fetchProductByCategory(category);

    setIsToggleDropdownFilterCategory(!isToggleDropdownFilterCategory);
  }

  function filterProductByBrand(category: string): void {
    fetchProductByCategory(category);

    setIsToggleDropdownFilterCategory(!isToggleDropdownFilterBrand);
  }

  useEffect(() => {
    fetchProducts(skip);
  }, [skip]);

  useEffect(() => {
    fetchProductByName(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBrands();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <ProductsSearch handleSearch={handleSearch} />
        <ProductFilter
          categories={categories}
          brands={brands}
          isToggleDropdownFilterCategory={isToggleDropdownFilterCategory}
          isToggleDropdownFilterBrand={isToggleDropdownFilterBrand}
          toggleDropdownFilterCategory={toggleDropdownFilterCategory}
          toggleDropdownFilterBrand={toggleDropdownFilterBrand}
          filterProductByCategory={filterProductByCategory}
          filterProductByBrand={filterProductByBrand}
        />
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
