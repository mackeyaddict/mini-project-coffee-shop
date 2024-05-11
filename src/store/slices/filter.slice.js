import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: null,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    resetFilter: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { selectCategory, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;