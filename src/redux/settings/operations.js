import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/api.js";

//! EMPLOYEE

// Create employee
export const createEmployee = createAsyncThunk(
  "settings/createEmployee",
  async (employeeData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      // // Конвертація файлів у Base64
      // const base64Files = await Promise.all(
      //   files.map((file) => {
      //     return new Promise((resolve, reject) => {
      //       const reader = new FileReader();
      //       reader.onload = () => resolve(reader.result); // Повертає Base64
      //       reader.onerror = (error) => reject(error);
      //       reader.readAsDataURL(file); // Читає файл як Base64
      //     });
      //   })
      // );

      // // Створюємо об'єкт для відправки
      // const payload = {
      //   ...employeeData, // Додаємо дані співробітника
      //   files: base64Files, // Додаємо Base64-файли
      // };
      const response = await axiosInstance.post(
        `/set/employees/create/`,
        employeeData,
        // {...employeeData,
        // files},
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { employee_id, ...dataToUpdate } = employeeDataToUpdate;

      const response = await axiosInstance.patch(
        `/set/employees/${employee_id}/update/`,
        dataToUpdate,
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.delete(
        `/set/employees/${employee_id}/delete/`,
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      console.log("company-id", serviceId);

      const { employee_id, status } = newStatus;
      console.log("Переданий статус:", status);
      const response = await axiosInstance.patch(
        `/set/employees/${employee_id}/status/?status=${status}`,
        null,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
            "Content-Type": "application/json",
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(
        `/set/employees/${employee_id}/`,
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(`/set/employees_all/`, {
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
  async (supplierData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      // Створюємо об'єкт для відправки
      // const payload = {
      //   name: supplierData.name,
      //   address: supplierData.address,
      //   managerPhone: supplierData.managerPhone,
      //   ...supplierData,
      // };

      const response = await axiosInstance.post(
        `/set/suppliers/create/`,
        supplierData,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("createSupplier", response.data);
      console.log("Supplier ID from response:", response.data?.supplier_id);
      return response.data;
    } catch (error) {
      console.error("Error response:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// update supplier
export const updateSupplierData = createAsyncThunk(
  "settings/updateSupplierData",
  async (employeeDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { supplier_id, ...dataToUpdate } = employeeDataToUpdate;

      // Make the API request
      const response = await axiosInstance.patch(
        `/set/suppliers/${supplier_id}/update/`,
        dataToUpdate,
        {
          headers: {
            "company-id": serviceId,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("updateSupplierData", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during updateSupplierData:", {
        message: error.message,
        code: error.code,
        config: error.config,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers,
            }
          : null,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete supplier
export const deleteSupplier = createAsyncThunk(
  "settings/deleteSupplier",
  async (supplier_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.delete(
        `/set/supplier/${supplier_id}/delete/`,
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
  async ({ supplier_id, newStatus }, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.patch(
        `/set/suppliers/${supplier_id}/status?status=${newStatus}`,
        {},
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(
        `/set/supplier/${supplier_id}/`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      // console.log("getSupplierData", response.data);

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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(`/set/suppliers/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
          // "company-id": "1",
          "Content-Type": "application/json",
        },
      });
      console.log("getAllSuppliers", response.data);

      return response.data;
    } catch (error) {
      // Логування детальної інформації про помилку
      console.error("Error during getAllSuppliers:", {
        message: error.message,
        code: error.code,
        config: error.config,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers,
            }
          : null,
      });

      // Повертаємо повідомлення про помилку в reject
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//! SCHEDULE (поки немає)

// Get work schedule
export const getWorkSchedule = createAsyncThunk(
  "settings/getWorkSchedule",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
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

// Create work schedule
// export const createWorkSchedule = createAsyncThunk(
//   "settings/createWorkSchedule",
//   async (workScheduleData, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const serviceId = state.service.selectedServiceInSettingsId;
//     try {
//       const response = await axiosInstance.post(
//         `/set/set_work_schedule/`,
//         workScheduleData,
//         {
//           headers: {
//             // "X-Api-Key": "YA7NxysJ",
//             "company-id": serviceId,
//           },
//         }
//       );
//       console.log("createWorkSchedule", response.data);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// Update work schedule
export const updateWorkSchedule = createAsyncThunk(
  "settings/updateWorkSchedule",
  async (workScheduleData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.patch(
        `/set/set_work_schedule/`,
        workScheduleData,
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

//! POSTS

// Get list of service posts
export const getPosts = createAsyncThunk(
  "settings/getPosts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
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
    const serviceId = state.service.selectedServiceInSettingsId;
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

// Update post data
export const updatePostData = createAsyncThunk(
  "settings/updatePostData",
  async (postDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      // const { postId, ...dataToUpdate } = postDataToUpdate;
      const response = await axiosInstance.patch(
        `/set/update_post/`,
        postDataToUpdate,
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.delete(`/set/delete_post/`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
          "post-id": postId,
        },
      });
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(
        `/set/categories_repair_service_all`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("getPrices", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get services and prices in particular category
// export const getPricesInCategory = createAsyncThunk(
//   "settings/getPricesInCategory",
//   async (category_id, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const serviceId = state.service.selectedServiceInSettingsId;
//     try {
//       const response = await axiosInstance.get(
//         `/set/categories/${category_id}/services`,
//         {
//           headers: {
//             // "X-Api-Key": "YA7NxysJ",
//             "company-id": serviceId,
//           },
//         }
//       );
//       console.log("getPricesInCategory", response.data);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// Update category
export const updateCategory = createAsyncThunk(
  "settings/updateCategory",
  async (newData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.patch(
        `/set/categories/update/`,
        newData,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateCategory", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update service name or prices
export const editServiceNameOrPrices = createAsyncThunk(
  "settings/editServiceNameOrPrices",
  async (newData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    const formattedData = {
      service_id: newData.service_id,
      new_name: newData.service_name,
      new_min_price: parseFloat(newData.min_price),
      new_max_price: parseFloat(newData.max_price),
      // company_id: serviceId,
    };
    try {
      const response = await axiosInstance.patch(
        `/set/repair_services/update/`,
        formattedData,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("editServiceNameOrPrices", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create category
export const createCategory = createAsyncThunk(
  "settings/createCategory",
  async (category_name, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.post(
        `/set/categories/`,
        category_name,
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

// Create service
export const createService = createAsyncThunk(
  "settings/createService",
  async (newService, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;

    try {
      const response = await axiosInstance.post(
        `/set/repair_service/`,
        newService,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.delete(
        `/set/delete/?service_id=${service_id}`,
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
    const serviceId = state.service.selectedServiceInSettingsId;

    // const { categoryId, ...serviceName } = newService;

    try {
      const response = await axiosInstance.post(
        `/set/rating/create`,
        newRating,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { rating_id, ...status } = newStatus;
      const response = await axiosInstance.patch(
        `/set/rating/${rating_id}/update-activity`,
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(`/set/ratings_all/`, {
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(`/set/ratings/${rating_id}/`, {
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.delete(
        `/set/rating/${rating_id}/delete`,
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
    const serviceId = state.service.selectedServiceInSettingsId;

    // const { categoryId, ...serviceName } = newService;

    try {
      const response = await axiosInstance.post(
        `/set/markup/create`,
        newMarkup,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { markup_id, ...markup } = updatedMarkup;
      const response = await axiosInstance.patch(
        `/set/markup/fixed/update/${markup_id}`,
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { markup_id, ...markup } = updatedMarkup;
      const response = await axiosInstance.patch(
        `/set/markup/dynamic/update/${markup_id}`,
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { markup_id, ...markup } = markupToDelete;
      const response = await axiosInstance.delete(
        `/set/markup/delete/${markup_id}`,
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(`/set/get_all_mark_up`, {
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(`/set/markup/${markup_id}`, {
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
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(
        `/set/supplier/markups/${supplier_id}`,
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

//! Cash register

// Create cash register
export const createCashRegister = createAsyncThunk(
  "settings/createCashRegister",
  async (cashRegisterData, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.post(
        `/set/cashregister/create`,
        cashRegisterData,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("createCashRegister", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update cash register
export const updateCashRegister = createAsyncThunk(
  "settings/updateCashRegister",
  async (updatedCashRegister, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { cash_register_id, ...cashRegister } = updatedCashRegister;
      const response = await axiosInstance.patch(
        `/set/cashregister/${cash_register_id}/update`,
        cashRegister,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("updateCashRegister", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Cash Register
export const deleteCashRegister = createAsyncThunk(
  "settings/deleteCashRegister",
  async (cash_register_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.delete(
        `/set/cashregister/${cash_register_id}/delete/`,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("deleteCashRegister", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Cash Register Status
export const updateCashRegisterStatus = createAsyncThunk(
  "settings/updateCashRegisterStatus",
  async (newStatus, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const { cash_register_id, status } = newStatus;
      const response = await axiosInstance.patch(
        `/set/cashregister/${cash_register_id}/status?status=${status}`,
        null,
        {
          headers: {
            // "X-Api-Key": "YA7NxysJ",
            "company-id": serviceId,
          },
        }
      );
      console.log("updateCashRegisterStatus", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get All Cash Registers
export const getAllCashRegisters = createAsyncThunk(
  "settings/getAllCashRegisters",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.service.selectedServiceInSettingsId;
    try {
      const response = await axiosInstance.get(`/set/cashregister/list`, {
        headers: {
          // "X-Api-Key": "YA7NxysJ",
          "company-id": serviceId,
        },
      });
      console.log("getAllCashRegisters", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get data of particular Cash Register
// export const getCashRegisterData = createAsyncThunk(
//   "settings/getCashRegisterData",
//   async (cash_register_id, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const serviceId = state.service.selectedServiceInSettingsId;
//     try {
//       const response = await axiosInstance.get(
//         `/set/cashregister/${cash_register_id}`,
//         {
//           headers: {
//             // "X-Api-Key": "YA7NxysJ",
//             "company-id": serviceId,
//           },
//         }
//       );
//       console.log("getCashRegisterData", response.data);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
