import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import { addItemToArchive, getAllArchiveData } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const archiveSlice = createSlice({
  name: "archive",
  initialState: initialState.archive,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllArchiveData.pending, handlePending)
      .addCase(getAllArchiveData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.archiveData = action.payload;
      })
      .addCase(getAllArchiveData.rejected, handleRejected)
      .addCase(addItemToArchive.pending, handlePending)
      .addCase(addItemToArchive.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.archiveData.push(action.payload);
      })
      .addCase(addItemToArchive.rejected, handleRejected),
});

export default archiveSlice.reducer;
