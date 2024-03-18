import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from 'redux-persist';
import identityReducer, {
  initialState as identityInitialState,
} from './identitySlice';
import helpersReducer from './helpersSlice';
import storage from 'redux-persist/lib/storage';
import expireReducer from 'redux-persist-expire';

const tokenExpiration = Number(localStorage.getItem('expires_in'));

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [
    expireReducer('identity', {
      persistedAtKey: 'loadedAt',
      expireSeconds: tokenExpiration,
      expiredState: identityInitialState,
      autoExpire: true,
    }),
  ],
};

const rootReducer = combineReducers({
  identity: identityReducer,
  helpers: helpersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
