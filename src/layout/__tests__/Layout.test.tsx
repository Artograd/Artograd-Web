import { render } from '@testing-library/react';
import { Layout } from '../Layout';

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
  test('renders correctly', () => {
    const component = render(<Layout>test component</Layout>);

    expect(component).toMatchSnapshot();
  });
});
