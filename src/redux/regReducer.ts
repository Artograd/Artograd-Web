import { createSlice } from "@reduxjs/toolkit";

const regSlice = createSlice({
  name: "reg",
  initialState: {
    email: "",
    step: 1,
  },
  reducers: {
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setStep: (state, { payload }) => {
      state.step = payload;
    },
  },
});

export const { setEmail, setStep } = regSlice.actions;
export default regSlice.reducer;
