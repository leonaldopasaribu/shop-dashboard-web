import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import productReducer from "./reducers/products-reducer";
import categoriesReducer from "./reducers/category-reducer";
import brandReducer from "./reducers/brand-reducer";
import cartsReducer from "./reducers/carts.reducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoriesReducer,
    brand: brandReducer,
    cart: cartsReducer,
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
