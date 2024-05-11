import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    addProduct: (state, action) => {
      state.allProducts.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.allProducts = state.allProducts.filter(product => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.allProducts.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.allProducts[index] = { ...state.allProducts[index], ...action.payload.newData };
      }
    },
  },
});

export const { setAllProducts, addProduct, deleteProduct, updateProduct } = productSlice.actions;

export default productSlice.reducer;
