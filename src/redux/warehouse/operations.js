import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";


export const getAllWarehousesWithDetails = createAsyncThunk(
  "warehouse/getAllWarehousesWithDetails",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      // 1. Отримуємо список складів
      const warehousesResponse = await axiosInstance.get(`/set/get_all_warehouses/`, {
        headers: { "company-id": serviceId },
      });

      const warehouses = warehousesResponse.data.data;
      console.log("Warehouses Response:", warehousesResponse.data.data);


      // 2. Отримуємо деталі для кожного складу
      const warehouseDetails = await Promise.all(
        warehouses.map(async (warehouse) => {
          const warehouse_id = warehouse.id
          const detailsResponse = await axiosInstance.get(
            `/set/get_full_tree/?warehouse_id=${warehouse_id}`,
            { headers: { "company-id": serviceId } }
          );

          return detailsResponse.data;
        })
      );

      console.log("Final Warehouse Data:", warehouseDetails);
      return warehouseDetails;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get warehouses
// export const getWarehouses = createAsyncThunk(
//   "warehouse/getWarehouses",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//    const serviceId = state.service.selectedServiceInSettingsId;
//     try {
//       const response = await axiosInstance.get(`/set/get_all_warehouses/`, {
//         headers: {
//           // "X-Api-Key": "YA7NxysJ",
//           "company-id": serviceId,
//         },
//       });
//       console.log("getWarehouses", response.data);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Get warehouse by id
// export const getWarehouseById = createAsyncThunk(
//   "warehouse/getWarehouseById",
//   async (warehouse_id, thunkAPI) => {
//     const state = thunkAPI.getState();
//    const serviceId = state.service.selectedServiceInSettingsId;
//     try {
//       const response = await axiosInstance.get(`/set/get_full_tree/${warehouse_id}`, {
//         headers: {
//           // "X-Api-Key": "YA7NxysJ",
//           "company-id": serviceId,
//         },
//       });
//       console.log("getWarehouseById", response.data);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );


// Delete entities
export const deleteEntity = createAsyncThunk(
  "warehouse/deleteEntity",
  async (entities, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;

    try {
      const response = await axiosInstance.delete(
        "/set/delete_entity/",
        // entities,
        {
          headers: {
            "company-id": serviceId,
          },
          data: entities,
        }
      );
      return response.data; // Повертаємо успішну відповідь
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Повертаємо помилку, якщо є
    }
  }
);


// Update entities

export const updateEntity = createAsyncThunk(
  "warehouse/updateEntity",
  async (entities, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;

    try {
      const response = await axiosInstance.patch(
        "/set/update_entity/",
        entities,
        {
          headers: {
            "company-id": serviceId,
          },
        }
      );
      return response.data; // Повертаємо успішну відповідь
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Повертаємо помилку, якщо є
    }
  }
);


// Crete Warehouse
export const createWarehouse = createAsyncThunk(
  "warehouse/createWarehouse",
  async (address, thunkAPI) => {
    const state = thunkAPI.getState();
   const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.post(
        `/set/warehouses/`,
        address,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
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
   const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { warehouseId, ...warehouseName } = warehouseDataToUpdate;
      const response = await axiosInstance.patch(
        `/set/warehouses/${warehouseId}`,
        warehouseName,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
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
   const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.post(
        `/set/import/warehouses/`,
        promptName,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
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
   const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(`/set/import/warehouses/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
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
     const serviceId = state.service.selectedServiceInSettingsId;
      
      const {warehouse_id, count} = createSectionData;
    try {
      const response = await axiosInstance.post(
        `/set/sections/`,
        {warehouse_id,
        count},
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
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
   const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { sectionId, ...sectionName } = sectionDataToUpdate;
      const response = await axiosInstance.patch(
        `/set/section/${sectionId}`,
        sectionName,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
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
// export const deleteSection = createAsyncThunk(
//   "warehouse/deleteSection",
//   async (sectionId, thunkAPI) => {
//     const state = thunkAPI.getState();
//    const serviceId = state.service.selectedServiceInSettingsId;
//     try {
//       const response = await axiosInstance.delete(`/set/section/${sectionId}`, {
//         headers: {
//           // "X-Api-Key": "YA7NxysJ",
//           "company-id": serviceId,
//         },
//       });
//       console.log("deleteSection", response.data);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// Create racks
export const createRacks = createAsyncThunk(
  "warehouse/createRacks",
  async (createRacksData, thunkAPI) => {
    const state = thunkAPI.getState();
   const serviceId = state.service.selectedServiceInSettingsId;

    const { section_id, count } = createRacksData;
    try {
      const response = await axiosInstance.post(`/set/racks/`, {section_id, count}, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
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
   const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { rackId, ...rackName } = rackDataToUpdate;
      const response = await axiosInstance.patch(
        `/set/racks/${rackId}`,
        rackName,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
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
// export const deleteRack = createAsyncThunk(
//   "warehouse/deleteRack",
//   async (rackId, thunkAPI) => {
//     const state = thunkAPI.getState();
//    const serviceId = state.service.selectedServiceInSettingsId;
//     try {
//       const response = await axiosInstance.delete(`/set/racks/${rackId}`, {
//         headers: {
//           // "X-Api-Key": "YA7NxysJ",
//           "company-id": serviceId,
//         },
//       });
//       console.log("deleteRack", response.data);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// Create shelves
export const createShelves = createAsyncThunk(
  "warehouse/createShelves",
  async (createShelfData, thunkAPI) => {
    const state = thunkAPI.getState();
   const serviceId = state.service.selectedServiceInSettingsId;

    const { rack_id, count } = createShelfData;
    try {
      const response = await axiosInstance.post(
        `/set/shelves/`,
       { rack_id,
        count},
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
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
   const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { shelfId, ...shelfName } = shelfDataToUpdate;
      const response = await axiosInstance.patch(
        `/set/shelves/${shelfId}`,
        shelfName,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
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
// export const deleteShelf = createAsyncThunk(
//   "warehouse/deleteShelf",
//   async (shelfId, thunkAPI) => {
//     const state = thunkAPI.getState();
//    const serviceId = state.service.selectedServiceInSettingsId;
//     try {
//       const response = await axiosInstance.delete(`/set/shelves/${shelfId}`, {
//         headers: {
//           // "X-Api-Key": "YA7NxysJ",
//           "company-id": serviceId,
//         },
//       });
//       console.log("deleteShelf", response.data);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// Create places
export const createPlaces = createAsyncThunk(
  "warehouse/createPlaces",
  async (createPlacesData, thunkAPI) => {
    const state = thunkAPI.getState();
   const serviceId = state.service.selectedServiceInSettingsId;

    const { shelf_id, count } = createPlacesData;
    try {
      const response = await axiosInstance.post(`/set/places/`,
        {shelf_id,
        count}, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
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
   const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { placeId, ...placeName } = placeDataToUpdate;
      const response = await axiosInstance.patch(
        `/set/places/${placeId}`,
        placeName,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
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
// export const deletePlace = createAsyncThunk(
//   "warehouse/deletePlace",
//   async (placeId, thunkAPI) => {
//     const state = thunkAPI.getState();
//    const serviceId = state.service.selectedServiceInSettingsId;
//     try {
//       const response = await axiosInstance.delete(`/set/places/${placeId}`, {
//         headers: {
//           // "X-Api-Key": "YA7NxysJ",
//           "company-id": serviceId,
//         },
//       });
//       console.log("deletePlace", response.data);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );