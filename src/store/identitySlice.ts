import { createSlice } from '@reduxjs/toolkit';

type UserData = {
  'cognito:username': string;
  'cognito:groups': string[];
  'custom:organization': string;
  email: string;
  email_verified: boolean;
  family_name: string;
  gender: string | 'male' | 'female';
  given_name: string;
  phone_number: string;
  phone_number_verified: boolean;
  picture?: string;
  sub?: string;
};

export type IdentityStateType = {
  userData: UserData;
  isLoggedIn: boolean;
};

const userData = {
  'cognito:username': '',
  'cognito:groups': [''],
  'custom:organization': '',
  email: '',
  email_verified: false,
  family_name: '',
  gender: '',
  given_name: '',
  phone_number: '',
  phone_number_verified: false,
  picture: '',
  sub: '',
};

export const initialState: IdentityStateType = {
  userData: userData,
  isLoggedIn: false,
};

export const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },
    userLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { saveUserData, userLogin } = identitySlice.actions;

export default identitySlice.reducer;
