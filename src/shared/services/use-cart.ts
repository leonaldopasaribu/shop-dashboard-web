import { useDispatch, useSelector } from "react-redux";

import { FETCH_LIMIT } from "../constants/limit.constant";

import { RootState } from "@/store";
import {
  markAsError,
  markAsLoading,
  populateCarts,
} from "@/store/reducers/carts.reducer";

export const useCart = () => {
  const { carts, isLoading, isError, errorMessage, total, limit } = useSelector(
    (state: RootState) => state.cart
  );

  const dispatch = useDispatch();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async function fetchCarts(skip: number): Promise<void> {
    dispatch(markAsLoading());

    await fetch(`${baseUrl}/carts?limit=${FETCH_LIMIT}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(populateCarts(data));
      })
      .catch((error) => {
        dispatch(markAsError(error.message));
      });
  }

  return {
    fetchCarts,
    isLoading,
    carts,
    isError,
    errorMessage,
    total,
    limit,
  };
};
