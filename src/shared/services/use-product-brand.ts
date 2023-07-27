import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";

import { markAsError, populateBrands } from "@/store/reducers/brand-reducer";

export const useBrands = () => {
  const { brands, isError, errorMessage } = useSelector(
    (state: RootState) => state.brand
  );

  const dispatch = useDispatch();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async function fetchBrands(): Promise<void> {
    await fetch(`${baseUrl}/products`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(populateBrands(data));
      })
      .catch((error) => {
        dispatch(markAsError(error.message));
      });
  }

  return {
    fetchBrands,
    brands,
    isError,
    errorMessage,
  };
};
