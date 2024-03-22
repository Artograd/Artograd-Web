import { Layout } from '../Layout';
import { createMemoryHistory } from 'history';
import { testWrapper } from '../../utils/testWrapper';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/test',
  }),
}));

describe('Layout component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', async () => {
    const history = createMemoryHistory();

    const component = await testWrapper({
      component: <Layout>test component</Layout>,
      history,
    });

    expect(component).toMatchSnapshot();
  });
});
