import { renderWithContextAsync } from '@epam/uui-test-utils';
import { MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { RootState, rootReducer, store } from '../store/store';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from '@reduxjs/toolkit';
import { initialState as identityState } from '../store/identitySlice';
import { initialState as helpersState } from '../store/helpersSlice';
import { initialState as profileOverviewReducer } from '../store/slices/profileOverviewSlice';
import { initialState as profileInformationReducer } from '../store/slices/profileInformationSlice';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

export const initialState: RootState & PersistPartial = {
  identity: identityState,
  helpers: helpersState,
  profileOverview: profileOverviewReducer,
  profileInformation: profileInformationReducer,
  _persist: {
    version: 1,
    rehydrated: true,
  },
};

export const testWrapper = async ({
  component,
  history,
  path,
  state = initialState,
}: {
  component: React.JSX.Element;
  history: MemoryHistory<unknown>;
  path?: string;
  state?: RootState;
}) => {
  return path ? (
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>{component}</MemoryRouter>
    </Provider>
  ) : (
    renderWithContextAsync(
      <Provider store={createStore(rootReducer, state)}>
        <Router history={history}>{component}</Router>
      </Provider>,
    )
  );
};
