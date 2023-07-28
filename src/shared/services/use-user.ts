import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { markAsError, populateUsers } from "@/store/reducers/user-reducer";

export const useUser = () => {
  const dispatch = useDispatch();

  const { users, isError, errorMessage } = useSelector(
    (state: RootState) => state.user
  );

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async function fetchUsers(): Promise<void> {
    await fetch(`${baseUrl}/users?limit=${100}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(populateUsers(data));
      })
      .catch((error) => {
        dispatch(markAsError(error.message));
      });
  }

  return {
    fetchUsers,
    users,
    isError,
    errorMessage,
  };
};
