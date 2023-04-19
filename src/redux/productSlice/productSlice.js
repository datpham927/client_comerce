import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeName: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTypeName: (state, action) => {
      state.typeName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTypeName } = productSlice.actions;

export default productSlice.reducer;
