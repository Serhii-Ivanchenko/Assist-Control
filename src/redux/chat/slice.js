import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState.chat,
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
     changeActualPrompt: (state, action) => {
      state.selectedPrompt = action.payload;
    },
    },
  // extraReducers: (builder) =>
  //     builder
  //       .addCase(),
});

export const { toggleChat, openChat, closeChat, changeActualPrompt } = chatSlice.actions;

export default chatSlice.reducer;
