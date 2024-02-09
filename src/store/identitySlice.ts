import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';

type IdentityState = {
  'cognito:username': string;
  email: string;
  email_verified: boolean;
  family_name: string;
  gender: 'male' | 'female' | '';
  name: string;
  phone_number: string;
  phone_number_verified: boolean;
  isLoggedIn: boolean;
};

export const identityState: IdentityState = {
  'cognito:username': '',
  email: '',
  email_verified: false,
  family_name: '',
  gender: '',
  name: '',
  phone_number: '',
  phone_number_verified: false,
  isLoggedIn: false,
};

const initialState = {
  identity: identityState,
};

export const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.identity = action.payload;
    },
    userLogin: (state, action) => {
      state.identity.isLoggedIn = action.payload;
    },
  },
});

export const { saveUserData, userLogin } = identitySlice.actions;

export default identitySlice.reducer;

const persistConfig = {
  key: 'identity',
  version: 1,
  storage,
};

export const persistedIdentityReducer = persistReducer(
  persistConfig,
  identitySlice.reducer,
);
