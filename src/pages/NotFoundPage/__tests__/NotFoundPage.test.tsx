import { render } from '@testing-library/react';
import { ErrorPage } from '../NotFoundPage';

const mockHistory = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => mockHistory,
}));

describe('Home page', () => {
  test('renders correctly', () => {
    const component = render(<ErrorPage />);

    expect(component).toMatchSnapshot();
  });
});
