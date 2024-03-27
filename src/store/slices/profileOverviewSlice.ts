import { createSlice } from '@reduxjs/toolkit';

interface ProfileOverviewState {
  picture: string;
  firstName: string;
  lastName: string;
  company: string;
  activeTenders: number;
  others: number;
  activeArtObjects: number;
  readyArtObjects: number;
}

interface profileOverview {
  profileOverview: ProfileOverviewState;
}

const profileOverviewState: ProfileOverviewState = {
  picture: '',
  firstName: 'Name',
  lastName: 'Second Name',
  company: 'Test Company',
  activeTenders: 0,
  others: 0,
  activeArtObjects: 0,
  readyArtObjects: 0,
};

export const initialState: profileOverview = {
  profileOverview: profileOverviewState,
};

const profileOverviewSlice = createSlice({
  name: 'profileOverview',
  initialState,
  reducers: {
    profileAvatarChanged(state, action) {
      state.profileOverview.picture = action.payload.picture;
    },
    profileOverviewUpdate(state, action) {
      state.profileOverview.company = action.payload;
    },
  },
});

export const { profileAvatarChanged, profileOverviewUpdate } =
  profileOverviewSlice.actions;
export default profileOverviewSlice.reducer;
