import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product } from "@/shared/models/product.model";
import { FetchResponseProducts } from "@/shared/models/response.model";

interface BrandState {
  brands: string[];
  data: any;
  isError: boolean;
  errorMessage: string;
}

function getBrandByProducts(products: Product[]): string[] {
  const uniqueBrandsSet = new Set(products.map((product) => product.brand));

  const uniqueBrands: string[] = Array.from(uniqueBrandsSet);

  return uniqueBrands;
}

function convertToTotal(
  products: Product[]
): { name: string; total: number }[] {
  const categoryTotals: { [category: string]: number } = {};

  products.forEach((product) => {
    const { category } = product;
    categoryTotals[category] = (categoryTotals[category] || 0) + 1;
  });

  return Object.entries(categoryTotals).map(([name, total]) => ({
    name,
    total,
  }));
}

const initialState: BrandState = {
  brands: [],
  data: [],
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
      state.data = convertToTotal(action.payload.products);
    },
    markAsError(state, action: PayloadAction<string>) {
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { populateBrands, markAsError } = brandSlice.actions;

export default brandSlice.reducer;
