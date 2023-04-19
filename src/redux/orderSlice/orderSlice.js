import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: JSON.parse(localStorage.getItem("orderItems")) || [],
  orderItemsSelector: [],
  // shippingAddress: {},
  // paymentMethod: "",
  // itemsPrice: "",
  // shippingPrice: "",
  // taxPrice: "",
  // totalPrice: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderProduct: (state, action) => {
      const { orderItems } = action.payload;
      const itemOrder = state.orderItems.find(
        (e) => e.product === orderItems?.product
      );
      if (itemOrder) {
        itemOrder.amount += orderItems?.amount;
      } else {
        state.orderItems.push(orderItems);
      }
      localStorage.setItem("orderItems", JSON.stringify(state.orderItems));
    },
    setOrderItemsSelector: (state, action) => {
      const { orderItemsSelector } = action.payload;
      const check = state.orderItemsSelector.find(
        (e) => e.product === orderItemsSelector.product
      );
      if (check) {
        state.orderItemsSelector = state.orderItemsSelector.filter(
          (e) => e.product !== orderItemsSelector.product
        );
      } else {
        state.orderItemsSelector.push(orderItemsSelector);
      }
    },
    setOrderSelectorAll: (state) => {
      if (state.orderItemsSelector.length === state.orderItems.length) {
        state.orderItemsSelector = [];
      } else {
        state.orderItemsSelector = state.orderItems;
      }
    },

    increaseProduct: (state, action) => {
      const { product } = action.payload;
      const itemOrder = state.orderItems.find((e) => e.product === product);
      const orderItemsSelector = state.orderItemsSelector.find(
        (e) => e.product === product
      );
      if (itemOrder) {
        itemOrder.amount += 1;
      }
      if (orderItemsSelector) {
        orderItemsSelector.amount += 1;
      }
    },
    decreaseProduct: (state, action) => {
      const { product } = action.payload;
      const itemOrder = state.orderItems.find((e) => e.product === product);
      const orderItemsSelector = state.orderItemsSelector.find(
        (e) => e.product === product
      );
      if (itemOrder) {
        itemOrder.amount -= 1;
        if (itemOrder.amount < 0) {
          itemOrder.amount = 0;
        }
      }
      if (orderItemsSelector) {
        orderItemsSelector.amount -= 1;
        if (orderItemsSelector.amount < 0) {
          orderItemsSelector.amount = 0;
        }
      }
    },
    removeOrderProduct: (state, action) => {
      const { product } = action.payload;
      state.orderItems = state.orderItems?.filter(
        (item) => item?.product !== product
      );
      state.orderItemsSelector = state.orderItemsSelector?.filter(
        (item) => item?.product !== product
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOrderProduct,
  increaseProduct,
  decreaseProduct,
  removeOrderProduct,
  setOrderItemsSelector,
  setOrderSelectorAll,
} = orderSlice.actions;

export default orderSlice.reducer;
