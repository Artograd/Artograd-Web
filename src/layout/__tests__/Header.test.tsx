import { render } from '@testing-library/react';
import { Header } from '../Header';
import { createMemoryHistory } from 'history';
import { screen, fireEvent } from '@epam/uui-test-utils';
import { testWrapper } from '../../utils/testWrapper';

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

describe('Layout mobile header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', () => {
    const component = render(<Header mobile />);
    fireEvent.click(screen.getByTestId('header-burger-menu'));

    expect(component).toMatchSnapshot();
  });

  test('redirect on burger menu link click', async () => {
    const history = createMemoryHistory();

    await testWrapper({ component: <Header mobile />, history });

    fireEvent.click(screen.getByTestId('header-burger-menu'));
    fireEvent.click(screen.getByText(menuLinks[1].linkName));

    expect(history.location.pathname).toBe(menuLinks[1].url);
  });
});

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

      await testWrapper({ component: <Header />, history });
      fireEvent.click(screen.getByText(link.linkName));

      expect(history.location.pathname).toBe(link.url);
    });
  });

  test('change language on click', async () => {
    const history = createMemoryHistory();

    await testWrapper({ component: <Header />, history });
    fireEvent.click(screen.getByText('en'));
    await fireEvent.click(screen.getByText('Русский'));

    expect(screen.getByText('Главная'));
  });
});
