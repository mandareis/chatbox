import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
};

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: (window as any)._bootstrap_data,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export const { setUser, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export default userSlice.reducer;
