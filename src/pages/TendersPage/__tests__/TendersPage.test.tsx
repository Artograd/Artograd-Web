import { TendersPage } from '../TendersPage';
import { createMemoryHistory } from 'history';
import { testWrapper } from '../../../utils/testWrapper';
import { identityState } from '../../../store/identitySlice';
import { fireEvent, screen } from '@epam/uui-test-utils';

const initialStateWithOfficerUserData = {
  identity: {
    ...identityState,
    given_name: 'test',
    family_name: 'user',
    email: 'email@email.com',
    'cognito:groups': ['Officials'],
  },
};

describe('Not found page', () => {
  const history = createMemoryHistory();
  test('renders correctly', async () => {
    const component = await testWrapper({
      component: <TendersPage />,
      history,
    });

    expect(component).toMatchSnapshot();
  });

  test('renders correctly for officer role', async () => {
    const component = await testWrapper({
      component: <TendersPage />,
      history,
      state: initialStateWithOfficerUserData,
    });

    expect(component).toMatchSnapshot();
  });

  test('redirect on create new tender page on header button click', async () => {
    const history = createMemoryHistory();

    await testWrapper({
      component: <TendersPage />,
      history,
      state: initialStateWithOfficerUserData,
    });

    fireEvent.click(screen.getByTestId('header-create-new-tender-cta'));

    expect(history.location.pathname).toBe('/tenders/new');
  });

  test('redirect on create new tender page on button click when no tenders', async () => {
    const history = createMemoryHistory();

    await testWrapper({
      component: <TendersPage />,
      history,
      state: initialStateWithOfficerUserData,
    });

    fireEvent.click(screen.getByTestId('content-create-new-tender-cta'));

    expect(history.location.pathname).toBe('/tenders/new');
  });
});
