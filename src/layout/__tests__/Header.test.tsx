import { render } from '@testing-library/react';
import { Header } from '../Header';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import {
  renderWithContextAsync,
  screen,
  fireEvent,
} from '@epam/uui-test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/test',
  }),
}));

const menuLinks = [
  {
    linkName: 'Home',
    url: '/',
  },
  {
    linkName: 'Tenders',
    url: '/tenders',
  },
  {
    linkName: 'Proposals',
    url: '/proposals',
  },
  {
    linkName: 'Sign In',
    url: '/login',
  },
  {
    linkName: 'Sign Up',
    url: '/register',
  },
];

describe('Layout header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', () => {
    const component = render(<Header />);

    expect(component).toMatchSnapshot();
  });

  menuLinks.map((link) => {
    test('redirect on menu link click', async () => {
      const history = createMemoryHistory();

      const { rerender } = await renderWithContextAsync(
        <Router history={history}>
          <Header />
        </Router>,
      );
      rerender(
        <Router history={history}>
          <Header />
        </Router>,
      );
      fireEvent.click(screen.getByText(link.linkName));

      expect(history.location.pathname).toBe(link.url);
    });
  });

  test('change language on click', async () => {
    const history = createMemoryHistory();

    const { rerender } = await renderWithContextAsync(
      <Router history={history}>
        <Header />
      </Router>,
    );
    rerender(
      <Router history={history}>
        <Header />
      </Router>,
    );
    fireEvent.click(screen.getByText('en'));
    await fireEvent.click(screen.getByText('Русский'));

    expect(screen.getByText('Главная'));
  });
});
