import { createMemoryHistory } from 'history';
import { testWrapper } from '../../../utils/testWrapper';
import {
  LocationSelectorModal,
  LocationSelectorModalType,
} from '../LocationSelectorModal';
import { fireEvent, screen } from '@epam/uui-test-utils';

const mockData: LocationSelectorModalType = {
  modalProps: { key: '1', zIndex: 1000, success: jest.fn(), abort: jest.fn() },
  cityName: { id: 1, name: 'city-name', lat: 0, lng: 0 },
  addressValue: { id: 2, name: 'address value' },
  commentsValue: 'comments value',
  locationCoordinates: { lat: 0, lng: 0 },
  setCommentsValue: jest.fn(),
  setCityName: jest.fn(),
  setAddressValue: jest.fn(),
  setLocationCoordinates: jest.fn(),
};

describe('Location Selector Modal', () => {
  const history = createMemoryHistory();
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders correctly', async () => {
    const component = await testWrapper({
      component: <LocationSelectorModal {...mockData} />,
      history,
    });

    expect(component).toMatchSnapshot();
  });

  test('should select city', async () => {
    const history = createMemoryHistory();

    await testWrapper({
      component: <LocationSelectorModal {...mockData} />,
      history,
    });

    fireEvent.click(screen.getByTestId('city-selector-input'));
  });
});
