import { createSlice } from '@reduxjs/toolkit';

interface ProfileOverviewState {
  avatarUrl: string;
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
  avatarUrl:
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=Coco&radius=50&backgroundColor=b6e3f4',
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
      state.profileOverview.avatarUrl = action.payload;
    },
    profileCompanyUpdate(state, action) {
      state.profileOverview.company = action.payload;
    },
  },
});

export const { profileAvatarChanged, profileCompanyUpdate } =
  profileOverviewSlice.actions;
export default profileOverviewSlice.reducer;
