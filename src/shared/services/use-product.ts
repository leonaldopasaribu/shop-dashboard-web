import { useDispatch, useSelector } from "react-redux";

import { FETCH_LIMIT } from "../constants/limit.constant";

import { FetchResponseProducts } from "../models/response.model";
import { Product } from "../models/product.model";

import { RootState } from "@/store";

import {
  markAsError,
  markAsLoading,
  populateProducts,
} from "@/store/reducers/products-reducer";

export const useProduct = () => {
  const dispatch = useDispatch();

  const { products, isLoading, isError, errorMessage, total, limit } =
    useSelector((state: RootState) => state.product);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async function fetchProducts(skip: number): Promise<void> {
    dispatch(markAsLoading());

    await fetch(`${baseUrl}/products?limit=${FETCH_LIMIT}&skip=${skip}`)
      .then((response) => response.json())
      .then((data: FetchResponseProducts<Product[]>) => {
        dispatch(populateProducts(data));
      })
      .catch((error: ErrorEvent) => {
        dispatch(markAsError(error.message));
      });
  }

  async function fetchProductByName(name: string): Promise<void> {
    await fetch(`${baseUrl}/products/search?q=${name}&limit=${FETCH_LIMIT}`)
      .then((response) => response.json())
      .then((data: FetchResponseProducts<Product[]>) => {
        dispatch(populateProducts(data));
      })
      .catch((error: ErrorEvent) => {
        dispatch(markAsError(error.message));
      });
  }

  async function fetchProductByCategory(category: string): Promise<void> {
    dispatch(markAsLoading());

    await fetch(`${baseUrl}/products/category/${category}`)
      .then((response) => response.json())
      .then((data: FetchResponseProducts<Product[]>) => {
        dispatch(populateProducts(data));
      })
      .catch((error: ErrorEvent) => {
        dispatch(markAsError(error.message));
      });
  }

  async function fetchProductByBrand(brand: string): Promise<void> {
    dispatch(markAsLoading());

    await fetch(`${baseUrl}/products`)
      .then((response) => response.json())
      .then((data: FetchResponseProducts<Product[]>) => {
        const filteredProducts = data.products.filter(
          (product: { brand: string }) => product.brand === brand
        );

        const productsByBrand = {
          limit: data.limit,
          products: filteredProducts,
          skip: data.skip,
          total: data.total,
        };

        dispatch(populateProducts(productsByBrand));
      })
      .catch((error: ErrorEvent) => {
        dispatch(markAsError(error.message));
      });
  }

  return {
    fetchProducts,
    fetchProductByName,
    fetchProductByCategory,
    fetchProductByBrand,
    isLoading,
    products,
    isError,
    errorMessage,
    total,
    limit,
  };
};
