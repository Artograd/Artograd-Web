import { Avatar } from '../Avatar';
import { createMemoryHistory } from 'history';
import { testWrapper } from '../../../utils/testWrapper';
import { initialState } from '../../../utils/testWrapper';
import { act, fireEvent, screen, userEvent } from '@epam/uui-test-utils';

const testInitialState = {
  ...initialState,
  identity: {
    ...initialState.identity,
    userData: {
      ...initialState.identity.userData,
      given_name: 'test',
      family_name: 'user',
      email: 'email@email.com',
    },
  },
};

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
      state: testInitialState,
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
        state: testInitialState,
      });

      fireEvent.click(screen.getByTestId('user-avatar'));
      fireEvent.click(screen.getByText('Log out'));

      expect(localStorage.removeItem).toBeCalledTimes(3);
    });
  });
});
