import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "@/shared/models/user.model";
import { FetchResponseUsers } from "@/shared/models/response.model";

interface UserState {
  users: User[];
  isError: boolean;
  errorMessage: string;
}

const initialState: UserState = {
  users: [],
  isError: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    populateUsers(state, action: PayloadAction<FetchResponseUsers<User[]>>) {
      state.users = action.payload.users;
      state.isError = false;
    },
    markAsError(state, action: PayloadAction<string>) {
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { populateUsers, markAsError } = userSlice.actions;

export default userSlice.reducer;
