import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    allOrder(state, action) {
      state.orders = action.payload;
    },
    clearOrders(state) {
      state.orders = [];
    },
    updateOrderStatus(state, action) {
      const { orderId, status } = action.payload;
      const orderToUpdate = state.orders.find((order) => order.id === orderId);
      if (orderToUpdate) {
        orderToUpdate.status = status;
      }
    },
    cancelOrder(state, action) {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
  },
});

export const { allOrder, clearOrders, updateOrderStatus, cancelOrder } = orderSlice.actions;

export default orderSlice.reducer;
