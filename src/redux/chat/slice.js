import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import { createTemplate, getTemplates } from "./operations.js";

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
  extraReducers: (builder) =>
    builder

      .addCase(getTemplates.pending, handlePending)
      .addCase(getTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates = action.payload;
      })
      .addCase(getTemplates.rejected, handleRejected)

      .addCase(createTemplate.pending, handlePending)
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        // const categoryToAddTemplateIndex = state.templates.findIndex(
        //   (category) => category.category_id === action.payload.category_id
        // );
        // state.templates[categoryToAddTemplateIndex].push(action.meta.arg);
        state.templates.push(action.meta.arg);
      })
      .addCase(createTemplate.rejected, handleRejected),
});

export const { toggleChat, openChat, closeChat, changeActualPrompt } = chatSlice.actions;

export default chatSlice.reducer;
