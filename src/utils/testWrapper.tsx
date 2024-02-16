import { renderWithContextAsync } from '@epam/uui-test-utils';
import { MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { store } from '../store/store';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from '@reduxjs/toolkit';
import identityReducer, {
  InitialStateType,
  initialState,
} from '../store/identitySlice';

export const testWrapper = async ({
  component,
  history,
  path,
  state = initialState,
}: {
  component: React.JSX.Element;
  history: MemoryHistory<unknown>;
  path?: string;
  state?: InitialStateType;
}) => {
  return path ? (
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>{component}</MemoryRouter>
    </Provider>
  ) : (
    renderWithContextAsync(
      <Provider store={createStore(identityReducer, state)}>
        <Router history={history}>{component}</Router>
      </Provider>,
    )
  );
};
