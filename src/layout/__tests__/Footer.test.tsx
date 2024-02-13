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
  const history = createMemoryHistory();
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', async () => {
    const component = await testWrapper({ component: <Footer />, history });

    expect(component).toMatchSnapshot();
  });

  menuLinks.map((link) => {
    test('redirect on menu link click', async () => {
      await testWrapper({ component: <Footer />, history });
      fireEvent.click(screen.getByText(link.linkName));

      expect(history.location.pathname).toBe(link.url);
    });
  });
});
