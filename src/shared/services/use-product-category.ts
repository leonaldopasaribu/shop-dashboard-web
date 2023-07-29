import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";

import {
  markAsError,
  populateCategories,
} from "@/store/reducers/category-reducer";

export const useCategory = () => {
  const dispatch = useDispatch();

  const { categories, isError, errorMessage } = useSelector(
    (state: RootState) => state.category
  );

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async function fetchCategories(): Promise<void> {
    await fetch(`${baseUrl}/products/categories`)
      .then((response) => response.json())
      .then((data: string[]) => {
        dispatch(populateCategories(data));
      })
      .catch((error: ErrorEvent) => {
        dispatch(markAsError(error.message));
      });
  }

  return {
    fetchCategories,
    categories,
    isError,
    errorMessage,
  };
};
