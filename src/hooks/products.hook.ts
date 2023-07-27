import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";

import {
  markAsError,
  markAsLoading,
  populateData,
} from "@/store/reducers/products-reducer";

export const useProduct = () => {
  const { products, isLoading, isError, errorMessage } = useSelector(
    (state: RootState) => state.product
  );

  const dispatch = useDispatch();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async function fetchProducts(): Promise<void> {
    dispatch(markAsLoading());

    await fetch(`${baseUrl}/products`)
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
    isLoading,
    products,
    isError,
    errorMessage,
  };
};
