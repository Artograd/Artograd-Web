import { createSlice } from '@reduxjs/toolkit';
interface profileFundrasingState {
  useBankDataByDefault: boolean;
  beneficiary: string;
  bank: string;
  account: string;
  iban: string;
  swift: string;
}

interface profileFundrasing {
  profileFundrasing: profileFundrasingState;
}

const profileFundrasingState = {
  useBankDataByDefault: false,
  beneficiary: '',
  bank: '',
  account: '',
  iban: '',
  swift: '',
}

export const initialState: profileFundrasing = {
  profileFundrasing: profileFundrasingState,
};

const profileFundrasingSlice = createSlice({
  name: 'profileFundrasing',
  initialState,
  reducers: {
    updateProfileFundrasing(state, action) {
      state.profileFundrasing = action.payload;
    },
  },
});

export const { updateProfileFundrasing } =
  profileFundrasingSlice.actions;
export default profileFundrasingSlice.reducer;