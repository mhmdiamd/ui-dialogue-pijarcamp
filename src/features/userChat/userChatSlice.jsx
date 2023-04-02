import { createSlice } from "@reduxjs/toolkit";

const userChatSlice = createSlice({
  name: "userChat",
  initialState: {
    currentContact: null,
  },
  reducers: {
    setCurrentContact: (state, { payload }) => {
      console.log(payload.currentContact)
      state.currentContact = payload.currentContact ? payload.currentContact : state.currentContact;
    },
  },
});

export const { setCurrentContact } = userChatSlice.actions;
export default userChatSlice.reducer;