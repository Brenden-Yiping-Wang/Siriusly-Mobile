// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: { name: string | null };
}

const initialState: UserState = {
  user: { name: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string }>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = { name: null };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
