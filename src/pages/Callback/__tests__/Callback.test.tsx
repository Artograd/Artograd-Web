import { CallbackPage } from '../Callback';
import { createMemoryHistory } from 'history';
import { testWrapper } from '../../../utils/testWrapper';

describe('Callback Page', () => {
  const history = createMemoryHistory();
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', async () => {
    const component = await testWrapper({
      component: <CallbackPage />,
      history,
    });

    expect(component).toMatchSnapshot();
  });
});
