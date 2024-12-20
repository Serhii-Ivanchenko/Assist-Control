import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
    createPlaces,
  createRacks,
  createSection,
  createShelves,
  createWarehouse,
  deletePlace,
  deleteRack,
  deleteSection,
  deleteShelf,
  getPrompts,
  getWarehouses,
  saveWarehouse,
  updatePlaceName,
  updateRackName,
  updateSectionName,
  updateShelfName,
  updateWarehouseName,
} from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: initialState.warehouse,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getWarehouses.pending, handlePending)
      .addCase(getWarehouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.warehouses = action.payload;
      })
      .addCase(getWarehouses.rejected, handleRejected)
      .addCase(createWarehouse.pending, handlePending)
      .addCase(createWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.warehouses.push(action.payload);
      })
      .addCase(createWarehouse.rejected, handleRejected)
      .addCase(updateWarehouseName.pending, handlePending)
      .addCase(updateWarehouseName.fulfilled, (state, action) => {
        state.isLoading = false;
        const warehouseToEditIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.id
        );
        state.warehouses[warehouseToEditIndex] = action.payload;
      })
      .addCase(updateWarehouseName.rejected, handleRejected)
      .addCase(saveWarehouse.pending, handlePending)
      .addCase(saveWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prompts.push(action.payload);
      })
      .addCase(saveWarehouse.rejected, handleRejected)
      .addCase(getPrompts.pending, handlePending)
      .addCase(getPrompts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prompts = action.payload;
      })
      .addCase(getPrompts.rejected, handleRejected)
      .addCase(createSection.pending, handlePending)
      .addCase(createSection.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseToAddSectionIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );
        state.warehouses[warehouseToAddSectionIndex].sections.push(
          action.payload
        );
      })
      .addCase(createSection.rejected, handleRejected)
      .addCase(updateSectionName.pending, handlePending)
      .addCase(updateSectionName.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseWithSectionToEditIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );

        const sectionToEditIndex = state.warehouses[
          warehouseWithSectionToEditIndex
        ].sections.findIndex((section) => section.id === action.payload.id);

        state.warehouses[warehouseWithSectionToEditIndex].sections[
          sectionToEditIndex
        ] = action.payload;
      })
      .addCase(updateSectionName.rejected, handleRejected)
      .addCase(deleteSection.pending, handlePending)
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseWithSectionToDeleteIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );

        state.warehouses[warehouseWithSectionToDeleteIndex].sections =
          state.warehouses[warehouseWithSectionToDeleteIndex].sections.filter(
            (section) => section.id !== action.payload.id
          );
      })
      .addCase(deleteSection.rejected, handleRejected)
      .addCase(createRacks.pending, handlePending)
      .addCase(createRacks.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseToAddRackIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );

        const sectionToAddRackIndex = state.warehouses[
          warehouseToAddRackIndex
        ].sections.findIndex(
          (section) => section.id === action.payload.section_id
        );

        state.warehouses[warehouseToAddRackIndex].sections[
          sectionToAddRackIndex
        ].racks.push(action.payload);
      })
      .addCase(createRacks.rejected, handleRejected)
      .addCase(updateRackName.pending, handlePending)
      .addCase(updateRackName.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseWithRackToEditIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );

        const sectionWithRackToEditIndex = state.warehouses[
          warehouseWithRackToEditIndex
        ].sections.findIndex(
          (section) => section.id === action.payload.section_id
        );

        const rackToEditIndex = state.warehouses[
          warehouseWithRackToEditIndex
        ].sections[sectionWithRackToEditIndex].racks.findIndex(
          (rack) => rack.id === action.payload.id
        );

        state.warehouses[warehouseWithRackToEditIndex].sections[
          sectionWithRackToEditIndex
        ].racks[rackToEditIndex] = action.payload;
      })
      .addCase(updateRackName.rejected, handleRejected)
      .addCase(deleteRack.pending, handlePending)
      .addCase(deleteRack.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseWithRackToDeleteIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );

        const sectionWithRackToDeleteIndex = state.warehouses[
          warehouseWithRackToDeleteIndex
        ].sections.findIndex(
          (section) => section.id === action.payload.section_id
        );

        state.warehouses[warehouseWithRackToDeleteIndex].sections[
          sectionWithRackToDeleteIndex
        ].racks = state.warehouses[warehouseWithRackToDeleteIndex].sections[
          sectionWithRackToDeleteIndex
        ].racks.filter((rack) => rack.id !== action.payload.id);
      })
      .addCase(deleteRack.rejected, handleRejected)
      .addCase(createShelves.pending, handlePending)
      .addCase(createShelves.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseToAddShelfIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );

        const sectionToAddShelfIndex = state.warehouses[
          warehouseToAddShelfIndex
        ].sections.findIndex(
          (section) => section.id === action.payload.section_id
        );

        const rackToAddShelfIndex = state.warehouses[
          warehouseToAddShelfIndex
        ].sections[sectionToAddShelfIndex].racks.findIndex(
          (rack) => rack.id === action.payload.rack_id
        );

        state.warehouses[warehouseToAddShelfIndex].sections[
          sectionToAddShelfIndex
        ].racks[rackToAddShelfIndex].shelves.push(action.payload);
      })
      .addCase(createShelves.rejected, handleRejected)
      .addCase(updateShelfName.pending, handlePending)
      .addCase(updateShelfName.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseWithShelfToEditIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );

        const sectionWithShelfToEditIndex = state.warehouses[
          warehouseWithShelfToEditIndex
        ].sections.findIndex(
          (section) => section.id === action.payload.section_id
        );

        const rackWithShelfToEditIndex = state.warehouses[
          warehouseWithShelfToEditIndex
        ].sections[sectionWithShelfToEditIndex].racks.findIndex(
          (rack) => rack.id === action.payload.rack_id
        );

        const shelfToEditIndex = state.warehouses[
          warehouseWithShelfToEditIndex
        ].sections[sectionWithShelfToEditIndex].racks[
          rackWithShelfToEditIndex
        ].shelves.findIndex((section) => section.id === action.payload.id);

        state.warehouses[warehouseWithShelfToEditIndex].sections[
          sectionWithShelfToEditIndex
        ].racks[rackWithShelfToEditIndex].shelves[shelfToEditIndex] =
          action.payload;
      })
      .addCase(updateShelfName.rejected, handleRejected)
      .addCase(deleteShelf.pending, handlePending)
      .addCase(deleteShelf.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseWithShelfToDeleteIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );

        const sectionWithShelfToDeleteIndex = state.warehouses[
          warehouseWithShelfToDeleteIndex
        ].sections.findIndex(
          (section) => section.id === action.payload.section_id
        );

        const rackWithShelfToDeleteIndex = state.warehouses[
          warehouseWithShelfToDeleteIndex
        ].sections[sectionWithShelfToDeleteIndex].racks.findIndex(
          (rack) => rack.id === action.payload.rack_id
        );

        state.warehouses[warehouseWithShelfToDeleteIndex].sections[
          sectionWithShelfToDeleteIndex
        ].racks[rackWithShelfToDeleteIndex].shelves = state.warehouses[
          warehouseWithShelfToDeleteIndex
        ].sections[sectionWithShelfToDeleteIndex].racks[
          rackWithShelfToDeleteIndex
        ].shelves.filter((shelf) => shelf.id !== action.payload.id);
      })
      .addCase(deleteShelf.rejected, handleRejected)
      .addCase(createPlaces.pending, handlePending)
      .addCase(createPlaces.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseToAddPlacesIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );

        const sectionToAddPlacesIndex = state.warehouses[
          warehouseToAddPlacesIndex
        ].sections.findIndex(
          (section) => section.id === action.payload.section_id
        );

        const rackToAddPlacesIndex = state.warehouses[
          warehouseToAddPlacesIndex
        ].sections[sectionToAddPlacesIndex].racks.findIndex(
          (rack) => rack.id === action.payload.rack_id
        );
          
          const shelfToAddPlacesIndex = state.warehouses[
            warehouseToAddPlacesIndex
          ].sections[sectionToAddPlacesIndex].racks[
            rackToAddPlacesIndex
          ].shelves.findIndex((shelf) => shelf.id === action.payload.shelf_id);


        state.warehouses[warehouseToAddPlacesIndex].sections[
          sectionToAddPlacesIndex
        ].racks[rackToAddPlacesIndex].shelves[shelfToAddPlacesIndex].places.push(
          action.payload
        );
      })
      .addCase(createPlaces.rejected, handleRejected)
      .addCase(updatePlaceName.pending, handlePending)
      .addCase(updatePlaceName.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseToEditPlaceIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );

        const sectionToEditPlaceIndex = state.warehouses[
          warehouseToEditPlaceIndex
        ].sections.findIndex(
          (section) => section.id === action.payload.section_id
        );

        const rackToEditPlaceIndex = state.warehouses[
          warehouseToEditPlaceIndex
        ].sections[sectionToEditPlaceIndex].racks.findIndex(
          (rack) => rack.id === action.payload.rack_id
        );

        const shelfToEditPlaceIndex = state.warehouses[
          warehouseToEditPlaceIndex
        ].sections[sectionToEditPlaceIndex].racks[
          rackToEditPlaceIndex
        ].shelves.findIndex((shelf) => shelf.id === action.payload.shelf_id);

        const placeToEditIndex = state.warehouses[
          warehouseToEditPlaceIndex
        ].sections[sectionToEditPlaceIndex].racks[rackToEditPlaceIndex].shelves[
          shelfToEditPlaceIndex
        ].places.findIndex((place) => place.id === action.payload.id);

        state.warehouses[warehouseToEditPlaceIndex].sections[
          sectionToEditPlaceIndex
        ].racks[rackToEditPlaceIndex].shelves[shelfToEditPlaceIndex].places[
          placeToEditIndex
        ] = action.payload;
      })
      .addCase(updatePlaceName.rejected, handleRejected)
      .addCase(deletePlace.pending, handlePending)
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.isLoading = false;

        const warehouseWithPlaceToDeleteIndex = state.warehouses.findIndex(
          (warehouse) => warehouse.id === action.payload.warehouse_id
        );

        const sectionWithPlaceToDeleteIndex = state.warehouses[
          warehouseWithPlaceToDeleteIndex
        ].sections.findIndex(
          (section) => section.id === action.payload.section_id
        );

        const rackWithPlaceToDeleteIndex = state.warehouses[
          warehouseWithPlaceToDeleteIndex
        ].sections[sectionWithPlaceToDeleteIndex].racks.findIndex(
          (rack) => rack.id === action.payload.rack_id
        );

        const shelfWithPlaceToDeleteIndex = state.warehouses[
          warehouseWithPlaceToDeleteIndex
        ].sections[sectionWithPlaceToDeleteIndex].racks[
          rackWithPlaceToDeleteIndex
        ].shelves.findIndex((shelf) => shelf.id === action.payload.shelf_id);

        state.warehouses[warehouseWithPlaceToDeleteIndex].sections[
          sectionWithPlaceToDeleteIndex
        ].racks[rackWithPlaceToDeleteIndex].shelves[
          shelfWithPlaceToDeleteIndex
        ].places = state.warehouses[warehouseWithPlaceToDeleteIndex].sections[
          sectionWithPlaceToDeleteIndex
        ].racks[rackWithPlaceToDeleteIndex].shelves[
          shelfWithPlaceToDeleteIndex
        ].places.filter((place) => place.id !== action.payload.id);
      })
      .addCase(deletePlace.rejected, handleRejected),
});

export default warehouseSlice.reducer;
