import { useDispatch, useSelector } from "react-redux";

import { FETCH_LIMIT } from "../constants/limit.constant";

import { RootState } from "@/store";

import {
  markAsError,
  markAsLoading,
  populateData,
} from "@/store/reducers/products-reducer";

export const useProduct = () => {
  const { products, isLoading, isError, errorMessage, total, limit } =
    useSelector((state: RootState) => state.product);

  const dispatch = useDispatch();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async function fetchProducts(skip: number): Promise<void> {
    dispatch(markAsLoading());

    await fetch(`${baseUrl}/products?limit=${FETCH_LIMIT}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(populateData(data));
      })
      .catch((error) => {
        dispatch(markAsError(error.message));
      });
  }

  async function fetchProductByName(name: string): Promise<void> {
    await fetch(`${baseUrl}/products/search?q=${name}&limit=${FETCH_LIMIT}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(populateData(data));
      })
      .catch((error) => {
        dispatch(markAsError(error.message));
      });
  }

  return {
    fetchProducts,
    fetchProductByName,
    isLoading,
    products,
    isError,
    errorMessage,
    total,
    limit,
  };
};
