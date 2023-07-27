import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import productReducer from "./reducers/products-reducer";
import categoriesReducer from "./reducers/category-reducer";
import brandReducer from "./reducers/brand-reducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    category:categoriesReducer,
    brand:brandReducer,
  },
});

export type AppDispatch = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type ReduxDispatch = typeof store.dispatch;
