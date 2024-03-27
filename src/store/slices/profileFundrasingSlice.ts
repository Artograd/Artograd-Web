import { createSlice } from '@reduxjs/toolkit';
interface profileFundrasingState {
  'custom:bank_use_default': boolean;
  beneficiary: string;
  bank: string;
  account: string;
  'custom:bank_iban': string;
  'custom:bank_swift': string;
}

interface profileFundrasing {
  profileFundrasing: profileFundrasingState;
}

const profileFundrasingState = {
  'custom:bank_use_default': false,
  beneficiary: '',
  bank: '',
  account: '',
  'custom:bank_iban': '',
  'custom:bank_swift': '',
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