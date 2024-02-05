import { render } from '@testing-library/react';
import { HomePage } from '../HomePage';
import {
  fireEvent,
  renderWithContextAsync,
  screen,
} from '@epam/uui-test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

describe('Home page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', () => {
    const component = render(<HomePage />);

    expect(component).toMatchSnapshot();
  });

  test('redirect on click page CTA', async () => {
    const history = createMemoryHistory();

    const { rerender } = await renderWithContextAsync(
      <Router history={history}>
        <HomePage />
      </Router>,
    );
    rerender(
      <Router history={history}>
        <HomePage />
      </Router>,
    );
    fireEvent.click(screen.getByTestId('join-community-cta'));

    expect(history.location.pathname).toBe('/login');
  });
});
