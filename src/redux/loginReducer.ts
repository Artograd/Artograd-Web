import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "reg",
  initialState: {
    isLoggedIn: false,
    user: {
      id: "",
      email: "",
      firstname: "",
      lastname: "",
    },
  },
  reducers: {
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    setStep: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setLoggedIn, setStep } = loginSlice.actions;
export default loginSlice.reducer;
