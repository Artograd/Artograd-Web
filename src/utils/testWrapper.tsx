import { renderWithContextAsync } from '@epam/uui-test-utils';
import { MemoryHistory } from 'history';
import { Router } from 'react-router';

export const testWrapper = async ({
  component,
  history,
}: {
  component: React.JSX.Element;
  history: MemoryHistory<unknown>;
}) => {
  return renderWithContextAsync(<Router history={history}>{component}</Router>);
};
