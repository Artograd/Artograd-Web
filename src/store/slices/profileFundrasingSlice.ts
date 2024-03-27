import { createSlice } from '@reduxjs/toolkit';
interface profileFundrasingState {
  'custom:bank_use_default': boolean;
  'custom:bank_benefit_name': string;
  'custom:bank_benefit_bank': string;
  'custom:bank_account': string;
  'custom:bank_iban': string;
  'custom:bank_swift': string;
}

interface profileFundrasing {
  profileFundrasing: profileFundrasingState;
}

const profileFundrasingState = {
  'custom:bank_use_default': false,
  'custom:bank_benefit_name': '',
  'custom:bank_benefit_bank': '',
  'custom:bank_account': '',
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