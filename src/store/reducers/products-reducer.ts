import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product } from "@/shared/models/product.model";
import { FetchResponseProducts } from "@/shared/models/response.model";
import { FETCH_LIMIT } from "@/shared/constants/limit.constant";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  limit: number;
  skip: number;
  total: number;
}

const initialState: ProductState = {
  isLoading: false,
  products: [],
  isError: false,
  errorMessage: "",
  limit: FETCH_LIMIT,
  skip: 0,
  total: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    markAsLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    populateData(
      state,
      action: PayloadAction<FetchResponseProducts<Product[]>>
    ) {
      state.products = action.payload.products;
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

export const { markAsLoading, populateData, markAsError } =
  productSlice.actions;

export default productSlice.reducer;
