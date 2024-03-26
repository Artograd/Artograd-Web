import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
// import { CityItemType } from '../../types';

interface profileInformationState {
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  location: string;
  email: string;
  showEmail: boolean;
  socialMedia?: { [key: string]: string };
}

interface profileInformation {
  profileInformation: profileInformationState;
}

const profileInformationState: profileInformationState = {
  firstName: 'Name',
  lastName: 'Second Name',
  company: 'Test Company',
  title: '',
  location: '',
  email: '',
  showEmail: false,
  socialMedia: {},
};

export const initialState: profileInformation = {
  profileInformation: profileInformationState,
};

const persistConfig = {
  key: 'profileInformation',
  version: 1,
  storage,
};

const profileInformationSlice = createSlice({
  name: 'profileInformation',
  initialState,
  reducers: {
    updateProfileInformation(state, action) {
      state.profileInformation = action.payload;
    },
  },
});

export const { updateProfileInformation } = profileInformationSlice.actions;
export default profileInformationSlice.reducer;
export const persistedProfileInformationReducer = persistReducer(
  persistConfig,
  profileInformationSlice.reducer,
);
