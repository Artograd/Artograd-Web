import { Avatar } from '../Avatar';
import { createMemoryHistory } from 'history';
import { testWrapper } from '../../../../utils/testWrapper';

describe('Avatar', () => {
  const history = createMemoryHistory();
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', async () => {
    const component = await testWrapper({ component: <Avatar />, history });

    expect(component).toMatchSnapshot();
  });

  it.skip('logout remove tokens', async () => {
    localStorage.setItem('id_token', 'idToken');
    localStorage.setItem('refresh_token', 'refreshToken');
    localStorage.setItem('access_token', 'access_token');

    await testWrapper({ component: <Avatar />, history });

    expect(localStorage.getItem('id_token')).toEqual(null);
    expect(localStorage.getItem('refresh_token')).toEqual(null);
    expect(localStorage.getItem('access_token')).toEqual(null);
  });
});
