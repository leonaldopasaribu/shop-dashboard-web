"use client";

import React, { useEffect, useState } from "react";

import { ProductsSearch } from "./components/products-search";
import { ProductsTable } from "./components/products-table";

import { LoadingScreen } from "@/shared/components/loading-screen";
import { Pagination } from "@/shared/components/pagination";
import { ProductFilter } from "./components/products-filter/product-filter";

import { useProduct } from "@/shared/services/use-product";
import { useCalculatePagination } from "@/shared/services/use-pagination";

import { useCategory } from "@/shared/services/use-product-category";
import { useBrands } from "@/shared/services/use-product-brand";

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
    fetchProductByBrand,
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

  function filterProductByBrand(brand: string): void {
    fetchProductByBrand(brand);

    setIsToggleDropdownFilterBrand(!isToggleDropdownFilterBrand);
  }

  useEffect(() => {
    fetchProducts(skip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  useEffect(() => {
    fetchProductByName(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 ">Products</h1>
      <div className="flex flex-col gap-3 justify-between lg:flex-row">
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
      <div className="overflow-auto max-w-[334px] sm:max-w-full">
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
