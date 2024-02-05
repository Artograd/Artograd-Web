import { render } from '@testing-library/react';
import { Footer } from '../Footer';
import {
  renderWithContextAsync,
  screen,
  fireEvent,
} from '@epam/uui-test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/test',
  }),
}));

const menuLinks = [
  {
    linkName: 'Privacy policy',
    url: '/policy',
  },
  {
    linkName: 'Cookies policy',
    url: '/cookie',
  },
];

describe('Layout footer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', () => {
    const component = render(<Footer />);

    expect(component).toMatchSnapshot();
  });

  menuLinks.map((link) => {
    test('redirect on menu link click', async () => {
      const history = createMemoryHistory();

      const { rerender } = await renderWithContextAsync(
        <Router history={history}>
          <Footer />
        </Router>,
      );
      rerender(
        <Router history={history}>
          <Footer />
        </Router>,
      );
      fireEvent.click(screen.getByText(link.linkName));

      expect(history.location.pathname).toBe(link.url);
    });
  });
});
