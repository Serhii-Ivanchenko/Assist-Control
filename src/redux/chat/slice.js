import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isChatOpen: false,
  },
  reducers: {
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
    openChat: (state) => {
      state.isChatOpen = true;
    },
    closeChat: (state) => {
      state.isChatOpen = false;
    },
  },
});

export const { toggleChat, openChat, closeChat } = chatSlice.actions;

export default chatSlice.reducer;