import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface profileInformationState {
  picture: string;
  given_name: string;
  family_name: string;
  'custom:organization': string;
  'custom:jobtitle': string;
  'custom:location': string;
  email: string;
  'custom:show_email': boolean;
  socialMedia?: { [key: string]: string };
  activeTenders: number;
  others: number;
  activeArtObjects: number;
  readyArtObjects: number;
}

interface profileInformation {
  profileInformation: profileInformationState;
}

const profileInformationState: profileInformationState = {
  picture: '',
  given_name: '',
  family_name: '',
  'custom:organization': '',
  'custom:jobtitle': '',
  'custom:location': '',
  email: '',
  'custom:show_email': false,
  socialMedia: {},
  activeTenders: 0,
  others: 0,
  activeArtObjects: 0,
  readyArtObjects: 0,
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
    profileAvatarChanged(state, action) {
      state.profileInformation.picture = action.payload.picture;
    },
  },
});

export const { updateProfileInformation, profileAvatarChanged } = profileInformationSlice.actions;
export default profileInformationSlice.reducer;
export const persistedProfileInformationReducer = persistReducer(
  persistConfig,
  profileInformationSlice.reducer,
);
