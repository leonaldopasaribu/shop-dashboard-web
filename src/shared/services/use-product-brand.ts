import { useDispatch, useSelector } from "react-redux";

import { Product } from "../models/product.model";
import { FetchResponseProducts } from "../models/response.model";

import { RootState } from "@/store";

import { markAsError, populateBrands } from "@/store/reducers/brand-reducer";

export const useBrands = () => {
  const dispatch = useDispatch();

  const { brands, isError, errorMessage, data } = useSelector(
    (state: RootState) => state.brand
  );

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async function fetchBrands(): Promise<void> {
    await fetch(`${baseUrl}/products`)
      .then((response) => response.json())
      .then((data: FetchResponseProducts<Product[]>) => {
        dispatch(populateBrands(data));
      })
      .catch((error: ErrorEvent) => {
        dispatch(markAsError(error.message));
      });
  }

  return {
    fetchBrands,
    brands,
    isError,
    errorMessage,
    data,
  };
};
