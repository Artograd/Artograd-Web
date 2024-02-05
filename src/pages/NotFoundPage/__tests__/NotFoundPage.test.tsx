import { render } from '@testing-library/react';
import { ErrorPage } from '../NotFoundPage';
import { createMemoryHistory } from 'history';
import {
  renderWithContextAsync,
  screen,
  fireEvent,
} from '@epam/uui-test-utils';
import { Router } from 'react-router';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/test',
  }),
}));

describe('Not found page', () => {
  test('renders correctly', () => {
    const component = render(<ErrorPage />);

    expect(component).toMatchSnapshot();
  });

  test('redirect on click page CTA', async () => {
    const history = createMemoryHistory();

    const { rerender } = await renderWithContextAsync(
      <Router history={history}>
        <ErrorPage />
      </Router>,
    );
    rerender(
      <Router history={history}>
        <ErrorPage />
      </Router>,
    );
    fireEvent.click(screen.getByText('Return to homepage'));

    expect(history.location.pathname).toBe('/');
  });
});
