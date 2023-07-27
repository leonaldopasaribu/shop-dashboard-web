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

  function fetchProducts(): void {
    dispatch(markAsLoading());
    fetch("https://dummyjson.com/products")
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
