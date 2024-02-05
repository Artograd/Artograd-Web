import { render } from '@testing-library/react';
import { Footer } from '../Footer';
import { screen, fireEvent } from '@epam/uui-test-utils';
import { createMemoryHistory } from 'history';
import { testWrapper } from '../../utils/testWrapper';

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

      await testWrapper({ component: <Footer />, history });
      fireEvent.click(screen.getByText(link.linkName));

      expect(history.location.pathname).toBe(link.url);
    });
  });
});
