import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  addItemToArchive,
  getAllArchiveData,
  returnArchiveItem,
  updateArchiveItem,
} from "./operations.js";

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
        state.archiveData.push(action.payload);
      })
      .addCase(addItemToArchive.rejected, handleRejected)

      .addCase(updateArchiveItem.pending, handlePending)
      .addCase(updateArchiveItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const archiveItemToEditIndex = state.archiveData.findIndex(
          (archiveItem) => archiveItem.id === action.payload.archive_id
        );

        // if (
        //   // action.payload.status === 200 &&
        //   archiveItemToEditIndex !== -1
        // ) {
        //   state.archiveData[archiveItemToEditIndex] = {
        //     ...state.archiveData[archiveItemToEditIndex], // Залишаємо старі дані
        //     ...action.meta.arg, // Додаємо дані, які відправляли
        //   };
        // }
        if (
          // action.payload.status === 200 &&
          archiveItemToEditIndex !== -1
        ) {
          state.archiveData[archiveItemToEditIndex].reason_add =
            action.meta.arg.reason_add; // Додаємо дані, які відправляли
        }
      })
      .addCase(updateArchiveItem.rejected, handleRejected)

      .addCase(returnArchiveItem.pending, handlePending)
      .addCase(returnArchiveItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.archiveData = state.archiveData.filter(
          (archiveItem) => archiveItem.archive_id !== action.payload.archive_id
        );
      })
      .addCase(returnArchiveItem.rejected, handleRejected),
});

export default archiveSlice.reducer;
