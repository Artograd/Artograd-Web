import { createMemoryHistory } from 'history';
import { testWrapper } from '../../../utils/testWrapper';
import {
  LocationSelectorModal,
  LocationSelectorModalType,
} from '../LocationSelectorModal';
import { act, fireEvent, screen, userEvent } from '@epam/uui-test-utils';

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
    const cityName = 'Bar';
    const address = 'Mediteranska, 8525';
    const commentsText = 'comment';

    act(async () => {
      await testWrapper({
        component: <LocationSelectorModal {...mockData} />,
        history,
      });

      fireEvent.click(screen.getByTestId('city-selector-input'));
      fireEvent.click(screen.getByText(cityName));
      fireEvent.click(screen.getByTestId('address-selector-input'));
      fireEvent.click(screen.getByText(address));
      await userEvent.type(screen.getByRole('textbox'), commentsText);
      fireEvent.click(screen.getByText('Confirm Location'));

      expect(mockData.setLocationCoordinates).toHaveBeenCalledTimes(1);
      expect(mockData.setAddressValue).toHaveBeenCalledTimes(1);
      expect(mockData.setCityName).toHaveBeenCalledTimes(1);
      expect(mockData.setCommentsValue).toHaveBeenCalledTimes(1);
      expect(mockData.modalProps.success).toHaveBeenCalledTimes(1);
    });
  });
});
