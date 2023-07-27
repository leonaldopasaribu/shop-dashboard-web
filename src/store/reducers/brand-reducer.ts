import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product } from "@/shared/models/product.model";
import { FetchResponseProducts } from "@/shared/models/response.model";

interface BrandState {
  brands: string[];
  isError: boolean;
  errorMessage: string;
}

function getBrandByProducts(products: Product[]): string[] {
  const uniqueBrandsSet = new Set(products.map((product) => product.brand));

  const uniqueBrands: string[] = Array.from(uniqueBrandsSet);

  return uniqueBrands;
}

const initialState: BrandState = {
  brands: [],
  isError: false,
  errorMessage: "",
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    populateBrands(
      state,
      action: PayloadAction<FetchResponseProducts<Product[]>>
    ) {
      state.brands = getBrandByProducts(action.payload.products);
      state.isError = false;
    },
    markAsError(state, action: PayloadAction<string>) {
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { populateBrands, markAsError } = brandSlice.actions;

export default brandSlice.reducer;
