import { Header } from '../Header';
import { createMemoryHistory } from 'history';
import { screen, fireEvent } from '@epam/uui-test-utils';
import { testWrapper } from '../../utils/testWrapper';
import { initialState } from '../../utils/testWrapper';

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
    linkName: 'Art Objects',
    url: '/artobjects',
  },
];

describe('Layout mobile header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', async () => {
    const history = createMemoryHistory();

    const component = await testWrapper({
      component: <Header mobile />,
      history,
    });
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
  const history = createMemoryHistory();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', async () => {
    const component = await testWrapper({ component: <Header />, history });

    expect(component).toMatchSnapshot();
  });

  menuLinks.map((link) => {
    test(`[ ${link.linkName} ] redirect on menu link click`, async () => {
      await testWrapper({ component: <Header />, history });
      fireEvent.click(screen.getByText(link.linkName));

      expect(history.location.pathname).toBe(link.url);
    });
  });

  menuLinks.map((link) => {
    test(`[ ${link.linkName} ]redirect on menu link click with loggedIn user`, async () => {
      await testWrapper({
        component: <Header />,
        history,
        state: {
          ...initialState,
          identity: {
            ...initialState.identity,
            isLoggedIn: true,
          },
        },
      });
      fireEvent.click(screen.getByText(link.linkName));

      expect(history.location.pathname).toBe(link.url);
    });
  });

  test('change language on click', async () => {
    await testWrapper({ component: <Header />, history });
    fireEvent.click(screen.getByText('en'));
    await fireEvent.click(screen.getByText('Русский'));

    expect(screen.getByText('Главная'));
  });

  test('goes back to home page on logo click with logged in user', async () => {
    const history = createMemoryHistory();

    await testWrapper({
      component: <Header />,
      history,
      state: {
        ...initialState,
        identity: {
          ...initialState.identity,
          isLoggedIn: true,
        },
      },
    });

    fireEvent.click(screen.getByTestId('header-logo-image'));

    expect(history.location.pathname).toBe('/');
  });

  test('goes back to home page on logo click anon user', async () => {
    const history = createMemoryHistory();

    await testWrapper({
      component: <Header />,
      history,
    });

    fireEvent.click(screen.getByTestId('header-logo-image'));

    expect(history.location.pathname).toBe('/');
  });
});
