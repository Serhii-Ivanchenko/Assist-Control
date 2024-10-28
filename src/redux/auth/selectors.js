export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectLoading = (state) => state.auth.isLoading;

export const selectUser = (state) => state.auth.userData;

export const selectAuth = (state) => state.auth;

export const selectApiKey = (state) => state.auth.apiKey;

export const selectError = (state) => state.auth.error;

export const selectSelectedServiceId = (state) => state.auth.userData.selectedServiceId;

