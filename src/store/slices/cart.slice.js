import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isOpen: false,
  selectedService: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
    },
    clearCart(state) {
      state.items = [];
      state.selectedService = null;
    },
    setOpen(state, action) {
      state.isOpen = action.payload;
    },
    setSelectedService(state, action) {
      state.selectedService = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setOpen, setSelectedService } = cartSlice.actions;

export default cartSlice.reducer;