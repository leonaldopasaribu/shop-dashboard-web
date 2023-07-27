import { useDispatch, useSelector } from "react-redux";

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

    await fetch(`${baseUrl}/products?limit=10&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(populateData(data));
      })
      .catch((error) => {
        dispatch(markAsError(error.message));
      });
  }

  async function fetchProductByName(name: string): Promise<void> {
    dispatch(markAsLoading());

    await fetch(`${baseUrl}/products/search?q=${name}`)
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
