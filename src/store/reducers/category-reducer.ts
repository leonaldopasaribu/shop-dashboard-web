import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  categories: string[];
  isError: boolean;
  errorMessage: string;
}

const initialState: CategoryState = {
  categories: [],
  isError: false,
  errorMessage: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    populateCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
      state.isError = false;
    },
    markAsError(state, action: PayloadAction<string>) {
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { populateCategories, markAsError } = categorySlice.actions;

export default categorySlice.reducer;
