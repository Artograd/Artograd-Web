import { render } from '@testing-library/react';
import { Step } from '../Step';
import EmptyIcon from '../../../../../images/empty.svg';

const mockData = {
  id: 1,
  title: 'Tenders for art objects are opened',
  iconOnTop: false,
  description:
    'State officials announce open calls for street art tenders, inviting sculptors, artists, and creators to enhance the cityscape with original art installations.',
  linkUrl: '/',
  linkText: 'DISCOVER OPEN TENDERS',
  icon: EmptyIcon,
};

describe('Step component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', () => {
    const component = render(<Step {...mockData} />);

    expect(component).toMatchSnapshot();
  });

  test('renders correctly with offset and icon on top', () => {
    const component = render(<Step {...mockData} id={2} iconOnTop />);

    expect(component).toMatchSnapshot();
  });

  test('renders correctly without the link', () => {
    const component = render(
      <Step {...mockData} linkUrl={undefined} linkText={undefined} />,
    );

    expect(component).toMatchSnapshot();
  });
});
