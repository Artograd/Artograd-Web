import { createMemoryHistory } from 'history';
import { HomePage } from '../HomePage';
import { testWrapper } from '../../../utils/testWrapper';

describe('Home page', () => {
  const history = createMemoryHistory();
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', () => {
    const component = testWrapper({ component: <HomePage />, history });

    expect(component).toMatchSnapshot();
  });
});
