export const selectAllServices = (state) => state.service.services;

// export const selectService = (state) => state.service.data;

export const selectLoading = (state) => state.service.isLoading;

export const selectError = (state) => state.service.error;

export const selectedServiceInSettingsId = (state) => state.service.selectedServiceInSettingsId;