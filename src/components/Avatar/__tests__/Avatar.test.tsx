import { Avatar } from '../Avatar';
import { createMemoryHistory } from 'history';
import { testWrapper } from '../../../utils/testWrapper';
import { identityState } from '../../../store/identitySlice';
import { screen, userEvent } from '@epam/uui-test-utils';

describe('Avatar', () => {
  const history = createMemoryHistory();
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', async () => {
    const user = userEvent.setup();

    const component = await testWrapper({
      component: <Avatar />,
      history,
      state: {
        identity: {
          ...identityState,
          given_name: 'test',
          family_name: 'user',
          email: 'email@email.com',
        },
      },
    });

    await user.click(screen.getByTestId('user-avatar'));

    expect(component).toMatchSnapshot();
  });
});
