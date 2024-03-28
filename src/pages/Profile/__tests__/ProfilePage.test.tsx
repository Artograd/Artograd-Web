import { testWrapper } from '../../../utils/testWrapper';
import { ProfilePage } from '../ProfilePage';
import { createMemoryHistory } from 'history';

describe('Profile page', () => {
  const history = createMemoryHistory();
  test('Should create the profile page', async () => {
    const component = await testWrapper({
      component: <ProfilePage />,
      history,
    });

    expect(component).toMatchSnapshot();
  });
});
