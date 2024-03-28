import { createMemoryHistory } from 'history';
import { ProfileOverview } from '../ProfileOverview';
import { testWrapper } from '../../../../../utils/testWrapper';
import { fireEvent, screen } from '@epam/uui-test-utils';

describe('Profile Overview', () => {
  const history = createMemoryHistory();

  test('Should create the profile overview component', async () => {
    const component = await testWrapper({
      component: <ProfileOverview />,
      history,
    });
    expect(component).toMatchSnapshot();
  });

  test('Should redirect by clicking Others', async () => {
    await testWrapper({ component: <ProfileOverview />, history });

    fireEvent.click(screen.getByTestId('others-id'));

    expect(history.location.pathname).toBe('/home');
  });
});
