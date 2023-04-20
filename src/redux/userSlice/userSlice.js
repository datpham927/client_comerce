import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  avatar: "",
  address: "",
  access_token: "",
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUpdateUser: (state, action) => {
      const { name, email, token, avatar, phone, _id, address, isAdmin } =
        action.payload;
      state.id = _id;
      state.email = email;
      state.name = name;
      state.avatar = avatar;
      state.phone = phone;
      state.address = address;
      state?.access_token = token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.avatar = "";
      state.address = "";
      state?.access_token = "";
      state.isAdmin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUpdateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
