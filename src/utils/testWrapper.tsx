import { renderWithContextAsync } from '@epam/uui-test-utils';
import { MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { store } from '../store/store';

export const testWrapper = async ({
  component,
  history,
}: {
  component: React.JSX.Element;
  history: MemoryHistory<unknown>;
  
}) => {
  return renderWithContextAsync(<Provider store={store}><Router history={history}>{component}</Router></Provider>);
};
