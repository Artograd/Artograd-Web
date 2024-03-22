import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistCombineReducers,
} from 'redux-persist';
import { persistedIdentityReducer } from './identitySlice';
import { persistedProfileOverviewReducer } from './slices/profileOverviewSlice';
import storage from 'redux-persist/lib/storage';
import { persistedProfileInformationReducer } from './slices/ProfileInformationSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = persistCombineReducers(persistConfig, {
  persistedIdentityReducer,
  persistedProfileOverviewReducer,
  persistedProfileInformationReducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
