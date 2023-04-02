import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    activeUsers: null,
  },
  reducers: {
    setActiveUsers: (state, { payload }) => {
      state.activeUsers = payload.activeUsers;
    },
  },
});

export const { setActiveUsers } = userSlice.actions;
export default userSlice.reducer;