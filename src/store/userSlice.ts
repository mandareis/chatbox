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
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export default userSlice.reducer;
