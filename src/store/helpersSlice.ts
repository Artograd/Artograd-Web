import { createSlice } from '@reduxjs/toolkit';

export type HelpersStateType = {
  isPageLoading: boolean;
};

export const initialState: HelpersStateType = {
  isPageLoading: false,
};

export const helpersSlice = createSlice({
  name: 'helpers',
  initialState,
  reducers: {
    isPageLoading: (state, action) => {
      state.isPageLoading = action.payload;
    },
  },
});

export const { isPageLoading } = helpersSlice.actions;

export default helpersSlice.reducer;
