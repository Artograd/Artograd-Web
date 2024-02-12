import { render } from '@testing-library/react';
import { HomePage } from '../HomePage';

describe('Home page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', () => {
    const component = render(<HomePage />);

    expect(component).toMatchSnapshot();
  });
});
