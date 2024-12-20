import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

// Get warehouses
export const getWarehouses = createAsyncThunk(
  "warehouse/getWarehouses",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/v1/companies/tree`, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getWarehouses", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Crete Warehouse
export const createWarehouse = createAsyncThunk(
  "warehouse/createWarehouse",
  async (warehouseName, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(
        `/v1/warehouses/`,
        warehouseName,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("createWarehouse", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update warehouse name
export const updateWarehouseName = createAsyncThunk(
  "warehouse/updateWarehouseName",
  async (warehouseDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { warehouseId, ...warehouseName } = warehouseDataToUpdate;
      const response = await axiosInstance.patch(
        `/v1/warehouses/${warehouseId}`,
        warehouseName,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateWarehouseName", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Save warehouse as a prompt
export const saveWarehouse = createAsyncThunk(
  "warehouse/saveWarehouse",
  async (promptName, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(`/v1/import/warehouses/`, promptName, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("saveWarehouse", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get prompts (Load from prompts)
export const getPrompts = createAsyncThunk(
  "warehouse/getPrompts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/v1/import/warehouses/`, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getPrompts", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create section
export const createSection = createAsyncThunk(
  "warehouse/createSection",
  async (createSectionData, thunkAPI) => {
    const state = thunkAPI.getState();
      const serviceId = state.auth.userData.selectedServiceId;
      
      const {warehouseId, ...sectionNumber} = createSectionData;
    try {
      const response = await axiosInstance.post(
        `/v1/section/`,
        sectionNumber,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("createSection", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update section name
export const updateSectionName = createAsyncThunk(
  "warehouse/updateSectionName",
  async (sectionDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { sectionId, ...sectionName } = sectionDataToUpdate;
      const response = await axiosInstance.patch(
        `/v1/section/${sectionId}`,
        sectionName,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateSectionName", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete section
export const deleteSection = createAsyncThunk(
  "warehouse/deleteSection",
  async (sectionId, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.delete(`/v1/section/${sectionId}`, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("deleteSection", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create racks
export const createRacks = createAsyncThunk(
  "warehouse/createRacks",
  async (createRacksData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;

    const { sectionId, ...racksNumber } = createRacksData;
    try {
      const response = await axiosInstance.post(`/v1/racks/`, racksNumber, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("createRacks", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update rack name
export const updateRackName = createAsyncThunk(
  "warehouse/updateRackName",
  async (rackDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { rackId, ...rackName } = rackDataToUpdate;
      const response = await axiosInstance.patch(
        `/v1/racks/${rackId}`,
        rackName,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateRackName", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete rack
export const deleteRack = createAsyncThunk(
  "warehouse/deleteRack",
  async (rackId, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.delete(`/v1/racks/${rackId}`, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("deleteRack", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create shelves
export const createShelves = createAsyncThunk(
  "warehouse/createShelves",
  async (createShelfData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;

    const { rackId, ...shelvesNumber } = createShelfData;
    try {
      const response = await axiosInstance.post(`/v1/shelves/`, shelvesNumber, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("createShelves", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update shelf name
export const updateShelfName = createAsyncThunk(
  "warehouse/updateShelfName",
  async (shelfDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { shelfId, ...shelfName } = shelfDataToUpdate;
      const response = await axiosInstance.patch(
        `/v1/shelves/${shelfId}`,
        shelfName,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateShelfName", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete shelves
export const deleteShelf = createAsyncThunk(
  "warehouse/deleteShelf",
  async (shelfId, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.delete(`/v1/shelves/${shelfId}`, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("deleteShelf", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create places
export const createPlaces = createAsyncThunk(
  "warehouse/createPlaces",
  async (createPlacesData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;

    const { shelfId, ...placesNumber } = createPlacesData;
    try {
      const response = await axiosInstance.post(`/v1/places/`, placesNumber, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("createPlaces", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update place name
export const updatePlaceName = createAsyncThunk(
  "warehouse/updatePlaceName",
  async (placeDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { placeId, ...placeName } = placeDataToUpdate;
      const response = await axiosInstance.patch(
        `/v1/places/${placeId}`,
        placeName,
        {
          headers: {
            "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updatePlaceName", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete place
export const deletePlace = createAsyncThunk(
  "warehouse/deletePlace",
  async (placeId, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.delete(`/v1/places/${placeId}`, {
        headers: {
          "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("deletePlace", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);