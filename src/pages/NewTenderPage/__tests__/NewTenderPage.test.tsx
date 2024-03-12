import { NewTenderPage } from '../NewTenderPage';
import { createMemoryHistory } from 'history';
import { testWrapper } from '../../../utils/testWrapper';
import { identityState } from '../../../store/identitySlice';
import { act, fireEvent, screen, userEvent } from '@epam/uui-test-utils';

const formData = {
  title: 'test tender title',
  description: 'test tender description',
  validityFrom: '2024-03-11',
  validityTo: '2024-03-20',
  expectedDelivery: '2024-03-21',
  ownerFirstName: 'test',
  ownerLastName: 'user',
  ownerEmail: 'email@email.com',
  ownerOrganization: 'Regional Culture Center',
};

const initialStateWithOfficerUserData = {
  identity: {
    ...identityState,
    given_name: formData.ownerFirstName,
    family_name: formData.ownerLastName,
    email: formData.ownerEmail,
    'cognito:groups': ['Officials'],
  },
};

describe('Not found page', () => {
  const history = createMemoryHistory();
  test('renders correctly', async () => {
    const component = await testWrapper({
      component: <NewTenderPage />,
      history,
      state: initialStateWithOfficerUserData,
    });

    expect(component).toMatchSnapshot();
  });

  it('should display all data from all inputs', async () => {
    await testWrapper({
      component: <NewTenderPage />,
      history,
      state: initialStateWithOfficerUserData,
    });

    const tenderTitleInput = screen
      .getByTestId('tender-title-input')
      .querySelector('input') as HTMLInputElement;
    const tenderDescriptionInput = screen
      .getByTestId('tender-description-input')
      .querySelector('textArea') as HTMLInputElement;
    const tenderValidityFromInput = screen
      .getByTestId('tender-validity-from-input')
      .querySelector('input') as HTMLInputElement;
    const tenderValidityToInput = screen
      .getByTestId('tender-validity-to-input')
      .querySelector('input') as HTMLInputElement;
    const tenderExpectedDeliveryInput = screen
      .getByTestId('tender-expected-delivery-input')
      .querySelector('input') as HTMLInputElement;

    fireEvent.change(tenderTitleInput, {
      target: { value: formData.title },
    });
    fireEvent.change(tenderDescriptionInput, {
      target: { value: formData.description },
    });
    fireEvent.change(tenderValidityFromInput, {
      target: { value: formData.validityFrom },
    });
    fireEvent.change(tenderValidityToInput, {
      target: { value: formData.validityTo },
    });
    fireEvent.change(tenderExpectedDeliveryInput, {
      target: { value: formData.expectedDelivery },
    });

    fireEvent.click(screen.getByTestId('form-submit'));
  });

  it('should display selected location', async () => {
    const cityName = 'Bar';
    const address = 'Mediteranska, 8525';
    const commentsText = 'comment';

    act(async () => {
      await testWrapper({
        component: <NewTenderPage />,
        history,
        state: initialStateWithOfficerUserData,
      });
      fireEvent.click(screen.getByText('Indicate location'));
      fireEvent.click(screen.getByTestId('city-selector-input'));
      fireEvent.click(screen.getByText(cityName));
      fireEvent.click(screen.getByTestId('address-selector-input'));
      fireEvent.click(screen.getByText(address));
      await userEvent.type(screen.getByRole('textbox'), commentsText);
      fireEvent.click(screen.getByText('Confirm Location'));

      expect(screen.getByText(cityName)).toBeInTheDocument();
      expect(screen.getByText(address)).toBeInTheDocument();
      expect(screen.getByText(commentsText)).toBeInTheDocument();
    });
  });
});
