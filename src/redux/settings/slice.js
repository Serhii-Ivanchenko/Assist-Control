import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  createCashRegister,
  createCategory,
  createEmployee,
  createMarkup,
  createPost,
  createRating,
  createService,
  createSupplier,
  deleteCashRegister,
  deleteEmployee,
  deleteMarkup,
  deletePost,
  deleteRating,
  deleteService,
  deleteSupplier,
  editServiceNameOrPrices,
  getAllCashRegisters,
  getAllEmployees,
  getAllMarkups,
  getAllSuppliers,
  // getCashRegisterData,
  getDistributorMarkup,
  getEmployeeData,
  getMarkupItemData,
  getPosts,
  getPrices,
  // getPricesInCategory,
  getRatingData,
  getRatings,
  getSupplierData,
  getWorkSchedule,
  updateCashRegister,
  updateCashRegisterStatus,
  updateCategory,
  // updateCategoryData,
  updateDynamicMarkup,
  updateEmployeeData,
  updateEmployeeStatus,
  updateFixedMarkup,
  updatePostData,
  updateRatingStatus,
  updateSupplierData,
  updateSupplierStatus,
  updateWorkSchedule,
} from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// editedServices

// універсальна функція для оновлення даних
// const updateItem = (items, payload, key = "id") => {
//   const index = items.findIndex((item) => item[key] === payload[key]);
//   if (index !== -1) {
//     items[index] = { ...items[index], ...payload };
//   }
// };

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState.settings,
  reducers: {
    setEditedService: (state, action) => {
      const editedService = action.payload;
      const index = state.editedServices.findIndex(
        (s) => s.service_id === editedService.service_id
      );
      if (index !== -1) {
        state.editedServices[index] = editedService;
      } else {
        state.editedServices.push(editedService);
      }
    },
    resetEditedServices: (state) => {
      state.editedServices = [];
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) =>
    builder
      //! EMPLOYEE
      .addCase(createEmployee.pending, handlePending)
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createEmployee.rejected, handleRejected)

      .addCase(updateEmployeeData.pending, handlePending)
      .addCase(updateEmployeeData.fulfilled, (state, action) => {
        state.isLoading = false;
        // const employeeToEditIndex = state.employees.findIndex(
        //   (employee) => employee.id === action.payload.employee_id
        // );

        // if (
        //   // action.payload.status === 200 &&
        //   employeeToEditIndex !== -1
        // ) {
        //   state.employees[employeeToEditIndex] = {
        //     ...state.employees[employeeToEditIndex], // Залишаємо старі дані
        //     ...action.meta.arg, // Додаємо дані, які відправляли
        //   };
        // }
      })
      .addCase(updateEmployeeData.rejected, handleRejected)

      .addCase(deleteEmployee.pending, handlePending)
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;

        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload.employee_id
        );
      })
      .addCase(deleteEmployee.rejected, handleRejected)

      .addCase(updateEmployeeStatus.pending, handlePending)
      .addCase(updateEmployeeStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const employeeToEditIndex = state.employees.findIndex(
          (employee) => employee.id === action.payload.employee_id
        );

        state.employees[employeeToEditIndex].status = action.meta.arg.status;
      })
      .addCase(updateEmployeeStatus.rejected, handleRejected)

      .addCase(getEmployeeData.pending, handlePending)
      .addCase(getEmployeeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employee = action.payload;
      })
      .addCase(getEmployeeData.rejected, handleRejected)

      .addCase(getAllEmployees.pending, handlePending)
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload.data;
      })
      .addCase(getAllEmployees.rejected, handleRejected)

      //! SUPPLIER
      .addCase(createSupplier.pending, handlePending)
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        // if (action.payload.supplier_id) {
        //   state.suppliers.push(action.meta.arg);
        // } else {
        //   console.error("Supplier ID is undefined:", action.payload);
        // }
      })
      .addCase(createSupplier.rejected, handleRejected)

      .addCase(updateSupplierData.pending, handlePending)
      .addCase(updateSupplierData.fulfilled, (state, action) => {
        state.isLoading = false;

        // // функція для оновлення даних по постачальнику
        // updateItem(state.suppliers, action.meta.arg, "supplier_id");
      })
      .addCase(updateSupplierData.rejected, handleRejected)

      .addCase(deleteSupplier.pending, handlePending)
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("Deleted supplier:", action.payload);
        state.suppliers = state.suppliers.filter(
          (supplier) => supplier.id !== action.payload.supplier_id
        );
      })
      .addCase(deleteSupplier.rejected, handleRejected)

      .addCase(updateSupplierStatus.pending, handlePending)
      .addCase(updateSupplierStatus.fulfilled, (state, action) => {
        state.isLoading = false;

        const supplierToEditIndex = state.suppliers.findIndex(
          (supplier) => supplier.id === action.payload.supplier_id
        );

        state.suppliers[supplierToEditIndex].status = action.payload.status;
      })
      .addCase(updateSupplierStatus.rejected, handleRejected)

      .addCase(getSupplierData.pending, handlePending)
      .addCase(getSupplierData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.supplier = action.payload.data;
      })
      .addCase(getSupplierData.rejected, handleRejected)

      .addCase(getAllSuppliers.pending, handlePending)
      .addCase(getAllSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers = action.payload.data;
      })
      .addCase(getAllSuppliers.rejected, handleRejected)

      //! SCHEDULE
      .addCase(getWorkSchedule.pending, handlePending)
      .addCase(getWorkSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.schedule = action.payload.days;
      })
      .addCase(getWorkSchedule.rejected, handleRejected)
      .addCase(updateWorkSchedule.pending, handlePending)
      .addCase(updateWorkSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.schedule = action.meta.arg.days;
      })
      .addCase(updateWorkSchedule.rejected, handleRejected)

      //! POSTS

      .addCase(getPosts.pending, handlePending)
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
      })
      .addCase(getPosts.rejected, handleRejected)

      .addCase(createPost.pending, handlePending)
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.posts.push(action.meta.arg);
      })
      .addCase(createPost.rejected, handleRejected)

      .addCase(updatePostData.pending, handlePending)
      .addCase(updatePostData.fulfilled, (state, action) => {
        state.isLoading = false;

        const postToEditIndex = state.posts.findIndex(
          (post) => post.id === action.payload.post_id
        );

        if (postToEditIndex !== -1) {
          const currentPost = state.posts[postToEditIndex];

          state.posts[postToEditIndex] = {
            ...currentPost,
            ...(action.payload.name_post && {
              name_post: action.payload.name_post,
            }),
            ...(action.payload.status !== undefined &&
              action.payload.status !== null && {
                status: action.payload.status,
              }),
          };
        }
      })

      .addCase(updatePostData.rejected, handleRejected)

      .addCase(deletePost.pending, handlePending)
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;

        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.post_id
        );
      })
      .addCase(deletePost.rejected, handleRejected)

      //! PRICE PART

      .addCase(getPrices.pending, handlePending)
      .addCase(getPrices.fulfilled, (state, action) => {
        state.isLoading = false;

        state.prices = action.payload;
      })
      .addCase(getPrices.rejected, handleRejected)

      .addCase(updateCategory.pending, handlePending)
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const categoryToEditIndex = state.prices.findIndex(
          (category) => category.category_id === action.payload.category_id
        );
        state.prices[categoryToEditIndex].category_name =
          action.payload.new_name;
      })
      .addCase(updateCategory.rejected, handleRejected)

      .addCase(editServiceNameOrPrices.pending, handlePending)
      .addCase(editServiceNameOrPrices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prices = state.prices.map((category) => ({
          ...category,
          services: category.services.map((s) =>
            s.service_id === action.payload.service_id
              ? { ...s, ...action.payload }
              : s
          ),
        }));
      })
      .addCase(editServiceNameOrPrices.rejected, handleRejected)

      .addCase(createCategory.pending, handlePending)
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createCategory.rejected, handleRejected)

      .addCase(createService.pending, handlePending)
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false;

        const { message, category_id, category_name, ...newServiceData } =
          action.payload;

        const categoryToAddNewService = state.prices.findIndex(
          (category) => category.category_id === category_id
        );

        state.prices[categoryToAddNewService].services.push(newServiceData);
      })
      .addCase(createService.rejected, handleRejected)

      .addCase(deleteService.pending, handlePending)
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isLoading = false;

        state.prices = state.prices.map((category) => ({
          ...category,
          services: category.services.filter(
            (service) => service.service_id !== action.payload.service_id
          ),
        }));
      })
      .addCase(deleteService.rejected, handleRejected)

      //! RATING
      .addCase(createRating.pending, handlePending)
      .addCase(createRating.fulfilled, (state, action) => {
        state.isLoading = false;

        state.ratings.push(action.meta.arg);
      })
      .addCase(createRating.rejected, handleRejected)

      .addCase(updateRatingStatus.pending, handlePending)
      .addCase(updateRatingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const ratingToEditIndex = state.ratings.findIndex(
          (rating) => rating.rating_id === action.payload.rating_id
        );
        state.ratings[ratingToEditIndex].isDisabled = action.payload.isDisabled;
      })
      .addCase(updateRatingStatus.rejected, handleRejected)

      .addCase(getRatings.pending, handlePending)
      .addCase(getRatings.fulfilled, (state, action) => {
        state.isLoading = false;

        state.ratings = action.payload.ratings;
      })
      .addCase(getRatings.rejected, handleRejected)

      .addCase(getRatingData.pending, handlePending)
      .addCase(getRatingData.fulfilled, (state, action) => {
        state.isLoading = false;

        state.rating = action.payload.rating;
      })
      .addCase(getRatingData.rejected, handleRejected)

      .addCase(deleteRating.pending, handlePending)
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.isLoading = false;

        state.ratings = state.ratings.filter(
          (rating) => rating.rating_id !== action.payload.rating_id
        );
      })
      .addCase(deleteRating.rejected, handleRejected)

      //! MARKUP
      .addCase(createMarkup.pending, handlePending)
      .addCase(createMarkup.fulfilled, (state, action) => {
        state.isLoading = false;

        state.markup.push(action.meta.arg);

        // if (action.meta.arg.margin_type === "fixed") {
        //   state.markup.fixed.push(action.meta.arg);
        // }
        // if (action.meta.arg.margin_type === "dynamic") {
        //   state.markup.dynamic.push(action.meta.arg);
        // }
      })
      .addCase(createMarkup.rejected, handleRejected)

      .addCase(updateFixedMarkup.pending, handlePending)
      .addCase(updateFixedMarkup.fulfilled, (state, action) => {
        state.isLoading = false;
        const markupToEditIndex = state.markup.findIndex(
          (markup) => markup.markup_id === action.payload.markup_id
        );
        state.markup[markupToEditIndex] = {
          ...state.markup[markupToEditIndex], // Залишаємо старі дані
          ...action.meta.arg, // Додаємо дані, які відправляли
        };
      })
      .addCase(updateFixedMarkup.rejected, handleRejected)

      .addCase(updateDynamicMarkup.pending, handlePending)
      .addCase(updateDynamicMarkup.fulfilled, (state, action) => {
        state.isLoading = false;
        const markupToEditIndex = state.markup.findIndex(
          (markup) => markup.markup_id === action.payload.markup_id
        );
        state.markup[markupToEditIndex] = {
          ...state.markup[markupToEditIndex], // Залишаємо старі дані
          ...action.meta.arg, // Додаємо дані, які відправляли
        };
      })
      .addCase(updateDynamicMarkup.rejected, handleRejected)

      .addCase(deleteMarkup.pending, handlePending)
      .addCase(deleteMarkup.fulfilled, (state, action) => {
        state.isLoading = false;

        state.markup = state.markup.filter(
          (markup) => markup.markup_id !== action.payload.markup_id
        );
      })
      .addCase(deleteMarkup.rejected, handleRejected)

      .addCase(getAllMarkups.pending, handlePending)
      .addCase(getAllMarkups.fulfilled, (state, action) => {
        state.isLoading = false;

        state.markup = action.payload;
      })
      .addCase(getAllMarkups.rejected, handleRejected)

      .addCase(getMarkupItemData.pending, handlePending)
      .addCase(getMarkupItemData.fulfilled, (state, action) => {
        state.isLoading = false;

        state.markupItem = action.payload;
      })
      .addCase(getMarkupItemData.rejected, handleRejected)

      .addCase(getDistributorMarkup.pending, handlePending)
      .addCase(getDistributorMarkup.fulfilled, (state, action) => {
        state.isLoading = false;

        state.distributorMarkup = action.payload;
      })
      .addCase(getDistributorMarkup.rejected, handleRejected)

      //! Cash register
      .addCase(createCashRegister.pending, handlePending)
      .addCase(createCashRegister.fulfilled, (state, action) => {
        state.isLoading = false;

        // state.cashRegisters.push(action.meta.arg);
      })
      .addCase(createCashRegister.rejected, handleRejected)

      .addCase(updateCashRegister.pending, handlePending)
      .addCase(updateCashRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        // const cashRegisterToEditIndex = state.cashRegisters.findIndex(
        //   (cashRegister) =>
        //     cashRegister.id === action.payload.cash_register_id
        // );
        // state.cashRegisters[cashRegisterToEditIndex] = {
        //   ...state.cashRegisters[cashRegisterToEditIndex], // Залишаємо старі дані
        //   ...action.meta.arg, // Додаємо дані, які відправляли
        // };
      })
      .addCase(updateCashRegister.rejected, handleRejected)

      .addCase(deleteCashRegister.pending, handlePending)
      .addCase(deleteCashRegister.fulfilled, (state, action) => {
        state.isLoading = false;

        state.cashRegisters = state.cashRegisters.filter(
          (cashRegister) => cashRegister.id !== action.payload.cash_register_id
        );
      })
      .addCase(deleteCashRegister.rejected, handleRejected)

      .addCase(updateCashRegisterStatus.pending, handlePending)
      .addCase(updateCashRegisterStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const cashRegisterToEditIndex = state.cashRegisters.findIndex(
          (cashRegister) => cashRegister.id === action.payload.cash_register_id
        );
        state.cashRegisters[cashRegisterToEditIndex].status =
          action.payload.status;
      })
      .addCase(updateCashRegisterStatus.rejected, handleRejected)

      .addCase(getAllCashRegisters.pending, handlePending)
      .addCase(getAllCashRegisters.fulfilled, (state, action) => {
        state.isLoading = false;

        state.cashRegisters = action.payload.cash_registers;
      })
      .addCase(getAllCashRegisters.rejected, handleRejected),

  // .addCase(getCashRegisterData.pending, handlePending)
  // .addCase(getCashRegisterData.fulfilled, (state, action) => {
  //   state.isLoading = false;

  //   state.cashRegisterItem = action.payload.cash_register;
  // })
  // .addCase(getCashRegisterData.rejected, handleRejected),
});

export const { setEditedService, resetEditedServices, openModal, closeModal } =
  settingsSlice.actions;

export default settingsSlice.reducer;
