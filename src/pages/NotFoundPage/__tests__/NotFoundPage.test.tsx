import { ErrorPage } from '../NotFoundPage';
import { createMemoryHistory } from 'history';
import { screen, fireEvent } from '@epam/uui-test-utils';
import { testWrapper } from '../../../utils/testWrapper';

describe('Not found page', () => {
  const history = createMemoryHistory();
  test('renders correctly', async () => {
    const component = await testWrapper({ component: <ErrorPage />, history });

    expect(component).toMatchSnapshot();
  });

  test('redirect on click page CTA', async () => {
    await testWrapper({ component: <ErrorPage />, history });
    fireEvent.click(screen.getByText('Return to homepage'));

    expect(history.location.pathname).toBe('/');
  });
});
