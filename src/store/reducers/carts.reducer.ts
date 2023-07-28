import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Cart } from "@/shared/models/cart.model";
import { FetchResponseCarts } from "@/shared/models/response.model";

import { FETCH_LIMIT } from "@/shared/constants/limit.constant";

interface ProductState {
  carts: Cart[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  limit: number;
  skip: number;
  total: number;
}

const initialState: ProductState = {
  isLoading: false,
  carts: [],
  isError: false,
  errorMessage: "",
  limit: FETCH_LIMIT,
  skip: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    markAsLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    populateCarts(state, action: PayloadAction<FetchResponseCarts<Cart[]>>) {
      state.carts = action.payload.carts;
      state.isLoading = false;
      state.isError = false;
      state.limit = action.payload.limit;
      state.skip = action.payload.skip;
      state.total = action.payload.total;
    },
    markAsError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { markAsLoading, populateCarts, markAsError } = cartSlice.actions;

export default cartSlice.reducer;
