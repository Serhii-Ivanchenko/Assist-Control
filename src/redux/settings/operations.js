import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

//! EMPLOYEE

// Create employee
export const createEmployee = createAsyncThunk(
  "settings/createEmployee",
  async ({ employeeData, files }, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const formData = new FormData();
      // files має бути масивом файлів
      files.forEach((file, index) => {
        formData.append(`files`, file); // `files` — це ключ, який сервер оброблятиме
      });

      formData.append("data", JSON.stringify(employeeData)); // Додаємо об'єкт як строку

      const response = await axiosInstance.post(
        `/pers/employees/create/`,
        formData,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("createEmployee", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update employee data
export const updateEmployeeData = createAsyncThunk(
  "settings/updateEmployeeData",
  async (employeeDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const formData = new FormData();

      const { employee_id, files, ...dataToUpdate } = employeeDataToUpdate;

      // files має бути масивом файлів
      files.forEach((file, index) => {
        formData.append(`files`, file); // `files` — це ключ, який сервер оброблятиме
      });

      formData.append("data", JSON.stringify(dataToUpdate)); // Додаємо об'єкт як строку

      const response = await axiosInstance.patch(
        `/pers/employees/${employee_id}/update/`,
        formData,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateEmployeeData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete employee
export const deleteEmployee = createAsyncThunk(
  "settings/deleteEmployee",
  async (employee_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.delete(
        `/pers/employees/${employee_id}/delete/`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("deleteEmployee", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update employee status
export const updateEmployeeStatus = createAsyncThunk(
  "settings/updateEmployeeStatus",
  async (newStatus, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { employee_id, ...status } = newStatus;
      const response = await axiosInstance.patch(
        `/pers/employees/${employee_id}/status/?isDisabled=${status}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateEmployeeStatus", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get employee data
export const getEmployeeData = createAsyncThunk(
  "settings/getEmployeeData",
  async (employee_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/pers/employees/${employee_id}/`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("getEmployeeData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get all employees data
export const getAllEmployees = createAsyncThunk(
  "settings/getAllEmployees",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/pers/employees_all/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getAllEmployees", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//! SUPPLIER

// Create supplier
export const createSupplier = createAsyncThunk(
  "settings/createSupplier",
  async ({ supplierData, logo }, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const formData = new FormData();

      formData.append(`logo`, logo);

      formData.append("data", JSON.stringify(supplierData)); // Додаємо об'єкт як строку

      const response = await axiosInstance.post(
        `/sup/suppliers/create/`,
        formData,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("createSupplier", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update supplier data
export const updateSupplierData = createAsyncThunk(
  "settings/updateSupplierData",
  async (employeeDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const formData = new FormData();

      const { supplier_id, logo, ...dataToUpdate } = employeeDataToUpdate;

      // files має бути масивом файлів

      formData.append(`logo`, logo);

      formData.append("data", JSON.stringify(dataToUpdate)); // Додаємо об'єкт як строку

      const response = await axiosInstance.patch(
        `/sup/suppliers/${supplier_id}/update/`,
        {
          logo,
          ...dataToUpdate,
        },
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("updateSupplierData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete supplier
export const deleteSupplier = createAsyncThunk(
  "settings/deleteSupplier",
  async (supplier_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.delete(
        `/sup/supplier/${supplier_id}/delete/`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("deleteSupplier", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update supplier status
export const updateSupplierStatus = createAsyncThunk(
  "settings/updateSupplierStatus",
  async (newStatus, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.patch(
        `/sup/suppliers/status/`,
        newStatus,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateSupplierStatus", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get supplier data
export const getSupplierData = createAsyncThunk(
  "settings/getSupplierData",
  async (supplier_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/sup/supplier/${supplier_id}/`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("getSupplierData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get all suppliers data
export const getAllSuppliers = createAsyncThunk(
  "settings/getAllSuppliers",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/sup/suppliers/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getAllSuppliers", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//! SCHEDULE (поки немає)

// Get work schedule
export const getWorkSchedule = createAsyncThunk(
  "settings/getWorkSchedule",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/set/get_work_schedule/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getWorkSchedule", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update work schedule
export const updateWorkSchedule = createAsyncThunk(
  "settings/updateWorkSchedule",
  async (workScheduleDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.patch(
        `/set/set_work_schedule/`,
        workScheduleDataToUpdate,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateWorkSchedule", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//! POSTS (поки немає)

// Get list of service posts
export const getPosts = createAsyncThunk(
  "settings/getPosts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/set/get_posts/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getPosts", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create new post
export const createPost = createAsyncThunk(
  "settings/createPost",
  async (postData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(`/set/create_post/`, postData, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("createPost", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update post status
export const updatePostStatus = createAsyncThunk(
  "settings/updatePostStatus",
  async (newStatus, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { postId, ...status } = newStatus;
      const response = await axiosInstance.patch(
        `/set/update_post_status/${postId}`,
        status,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updatePostStatus", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update post data
export const updatePostData = createAsyncThunk(
  "settings/updatePostData",
  async (postDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { postId, ...dataToUpdate } = postDataToUpdate;
      const response = await axiosInstance.patch(
        `/set/update_post/${postId}`,
        dataToUpdate,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updatePostData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  "settings/deletePost",
  async (postId, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.delete(
        `/set/update_post/${postId}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("deletePost", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//! PRICE PART

// Get categories and services for PricePart
export const getPrices = createAsyncThunk(
  "settings/getPrices",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/serv/services`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getPrices", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get services and prices in particular category
export const getPricesInCategory = createAsyncThunk(
  "settings/getPricesInCategory",
  async (category_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/serv/categories/${category_id}/services`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("getPricesInCategory", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update service name or prices
export const editServiceNameOrPrices = createAsyncThunk(
  "settings/editPrices",
  async (newPrices, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { service_id, ...prices } = newPrices;
      const response = await axiosInstance.patch(
        `/v1/services/${service_id}/prices`,
        prices,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("editPrices", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create category of services
export const createCategory = createAsyncThunk(
  "settings/createCategory",
  async (categoryName, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.post(
        `/serv/categories/`,
        categoryName,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("createCategory", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update category name
export const updateCategoryData = createAsyncThunk(
  "settings/updateCategoryData",
  async (categoryDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      // const { categoryId, ...dataToUpdate } = categoryDataToUpdate;
      const response = await axiosInstance.patch(
        `/serv/categories/update/`,
        categoryDataToUpdate,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateCategoryData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create service
export const createService = createAsyncThunk(
  "settings/createService",
  async (newService, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;

    // const { categoryId, ...serviceName } = newService;

    try {
      const response = await axiosInstance.post(`/v1/services/`, newService, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("createService", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete service
export const deleteService = createAsyncThunk(
  "settings/deleteService",
  async (service_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.delete(
        `/serv/delete/?service_id=${service_id}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("deleteService", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//! RATING

// Create Rating
export const createRating = createAsyncThunk(
  "settings/createRating",
  async (newRating, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;

    // const { categoryId, ...serviceName } = newService;

    try {
      const response = await axiosInstance.post(`/rating/create`, newRating, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("createRating", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Rating Status
export const updateRatingStatus = createAsyncThunk(
  "settings/updateRatingStatus",
  async (newStatus, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { rating_id, ...status } = newStatus;
      const response = await axiosInstance.patch(
        `/rating/${rating_id}/update-activity`,
        status,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateRatingStatus", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Ratings List
export const getRatings = createAsyncThunk(
  "settings/getRatings",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/ratings_all/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getRatings", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get one rating data
export const getRatingData = createAsyncThunk(
  "settings/getRatingData",
  async (rating_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/ratings/${rating_id}/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getRatingData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Rating
export const deleteRating = createAsyncThunk(
  "settings/deleteRating",
  async (rating_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.delete(
        `/rating/${rating_id}/delete`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("deleteRating", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//! MARKUP

// Create Markup
export const createMarkup = createAsyncThunk(
  "settings/createMarkup",
  async (newMarkup, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;

    // const { categoryId, ...serviceName } = newService;

    try {
      const response = await axiosInstance.post(`/markup/create`, newMarkup, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("createMarkup", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Fixed Markup

export const updateFixedMarkup = createAsyncThunk(
  "settings/updateFixedMarkup",
  async (updatedMarkup, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { markup_id, ...markup } = updatedMarkup;
      const response = await axiosInstance.patch(
        `/markup/fixed/update/${markup_id}`,
        markup,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateFixedMarkup", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Dynamic Markup

export const updateDynamicMarkup = createAsyncThunk(
  "settings/updateDynamicMarkup",
  async (updatedMarkup, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { markup_id, ...markup } = updatedMarkup;
      const response = await axiosInstance.patch(
        `/markup/dynamic/update/${markup_id}`,
        markup,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateDynamicMarkup", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Markup
export const deleteMarkup = createAsyncThunk(
  "settings/deleteMarkup",
  async (markupToDelete, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { markup_id, ...markup } = markupToDelete;
      const response = await axiosInstance.delete(
        `/markup/delete/${markup_id}`,
        markup,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("deleteMarkup", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get all markups

export const getAllMarkups = createAsyncThunk(
  "settings/getAllMarkups",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/get_all_mark_up`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getAllMarkups", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get markup item data
export const getMarkupItemData = createAsyncThunk(
  "settings/getMarkupData",
  async (markup_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(`/markup/${markup_id}`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getMarkupItemData", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Get Markup data of particular distributor
export const getDistributorMarkup = createAsyncThunk(
  "settings/getDistributorMarkup",
  async (supplier_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const response = await axiosInstance.get(
        `/supplier/markups/${supplier_id}`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("getDistributorMarkup", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
