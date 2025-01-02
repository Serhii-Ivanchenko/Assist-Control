export const selectArchiveData = (state) => {
  console.log("State data:", state.archive.archiveData);
  return state.archive.archiveData;
};
export const selectReasons = (state) => state.archive.reasons;

export const selectLoading = (state) => state.archive.isLoading;

export const selectError = (state) => state.archive.error;