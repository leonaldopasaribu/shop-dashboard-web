import { useDispatch, useSelector } from "react-redux";

import { FETCH_LIMIT } from "../constants/limit.constant";

import { FetchResponseCarts } from "../models/response.model";
import { Cart } from "../models/cart.model";

import { RootState } from "@/store";
import {
  markAsError,
  markAsLoading,
  populateCarts,
} from "@/store/reducers/carts.reducer";

export const useCart = () => {
  const dispatch = useDispatch();

  const { carts, isLoading, isError, errorMessage, total, limit } = useSelector(
    (state: RootState) => state.cart
  );

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async function fetchCarts(skip: number): Promise<void> {
    dispatch(markAsLoading());

    await fetch(`${baseUrl}/carts?limit=${FETCH_LIMIT}&skip=${skip}`)
      .then((response) => response.json())
      .then((data: FetchResponseCarts<Cart[]>) => {
        dispatch(populateCarts(data));
      })
      .catch((error: ErrorEvent) => {
        dispatch(markAsError(error.message));
      });
  }

  async function fetchCartByUserId(userId: number): Promise<void> {
    dispatch(markAsLoading());

    await fetch(`${baseUrl}/carts/user/${userId}`)
      .then((response) => response.json())
      .then((data: FetchResponseCarts<Cart[]>) => {
        dispatch(populateCarts(data));
      })
      .catch((error: ErrorEvent) => {
        dispatch(markAsError(error.message));
      });
  }

  return {
    fetchCarts,
    fetchCartByUserId,
    isLoading,
    carts,
    isError,
    errorMessage,
    total,
    limit,
  };
};
