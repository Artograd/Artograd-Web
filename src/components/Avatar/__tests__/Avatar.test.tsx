import { Avatar } from '../Avatar';
import { createMemoryHistory } from 'history';
import { testWrapper } from '../../../utils/testWrapper';
import { identityState } from '../../../store/identitySlice';
import { act, fireEvent, screen, userEvent } from '@epam/uui-test-utils';

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
    await act(async () => {
      user.click(screen.getByTestId('user-avatar'));

      expect(component).toMatchSnapshot();
    });
  });

  test('should logout on menu item click', async () => {
    jest.spyOn(Storage.prototype, 'removeItem');

    act(async () => {
      await testWrapper({
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

      fireEvent.click(screen.getByTestId('user-avatar'));
      fireEvent.click(screen.getByText('Log out'));

      expect(localStorage.removeItem).toBeCalledTimes(3);
    });
  });
});
