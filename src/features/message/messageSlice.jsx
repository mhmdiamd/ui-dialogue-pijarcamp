import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    contactInfo: undefined,
    messages: undefined,
    chatId: undefined,
  },
  reducers: {
    setCurrentChat: (state, { payload }) => {
      state.contactInfo = payload.contactInfo;
      state.messages = payload.messages;
      state.chatId = payload.chatId;
    },

  },
});

export const { setCurrentChat } = messageSlice.actions;
export default messageSlice.reducer;