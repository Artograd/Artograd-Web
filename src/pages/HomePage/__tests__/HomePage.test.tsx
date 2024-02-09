import { render } from '@testing-library/react';
import { HomePage } from '../HomePage';
import { fireEvent, screen } from '@epam/uui-test-utils';
import { createMemoryHistory } from 'history';
import { testWrapper } from '../../../utils/testWrapper';

describe('Home page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', () => {
    const component = render(<HomePage />);

    expect(component).toMatchSnapshot();
  });

  test.skip('redirect on click page CTA', async () => {
    const history = createMemoryHistory();

    await testWrapper({ component: <HomePage />, history });
    fireEvent.click(screen.getByTestId('join-community-cta'));

    expect(history.location.pathname).toBe('/register');
  });
});
