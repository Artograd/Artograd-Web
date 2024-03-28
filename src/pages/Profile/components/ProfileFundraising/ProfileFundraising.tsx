import styles from './ProfileFundraising.module.scss';
import {
  FlexCell,
  FlexRow,
  Button,
  LabeledInput,
  Panel,
  Text,
  TextInput,
  useForm,
  Alert,
  Checkbox,
} from '@epam/uui';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ReactComponent as InfIcon } from '@epam/assets/icons/common/notification-error-fill-18.svg';
import { createProfilePayload } from '../../../../services/helpers/profileHelper';
import { userApi } from '../../../../services/api/userAPI';
import { updateProfileFundrasing } from '../../../../store/slices/profileFundrasingSlice';

export const ProfileFundraising = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const bank_benefit_name = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_benefit_name'],
  );
  const bank_benefit_bank = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_benefit_bank'],
  );
  const bank_account = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_account'],
  );
  const bank_use_default = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_use_default'],
  );
  const bank_swift = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_swift'],
  );
  const bank_iban = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_iban'],
  );
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );

  const { lens, save } = useForm({
    value: {
      bank_use_default,
      bank_benefit_name,
      bank_benefit_bank,
      bank_account,
      bank_iban,
      bank_swift,
    },
    onSave: (fundraising) => {
      return userApi
        .put(username, createProfilePayload(fundraising))
        .then(() => {
          return Promise.resolve({ form: fundraising });
        })
        .catch(() => Promise.reject());
    },
    onSuccess: (data) => {
      dispatch(updateProfileFundrasing(data));
    },
    onError: () => null,
    getMetadata: () => ({
      props: {
        bank_benefit_name: { isRequired: false },
        bank_benefit_bank: { isRequired: false },
        bank_account: { isRequired: false },
        bank_use_default: { isRequired: false },
        bank_swift: { isRequired: false },
        bank_iban: { isRequired: false },
      },
    }),
    settingsKey: 'basic-form-example',
  });
  return (
    <Panel cx={styles.wrapper} shadow>
      <Text fontSize={'18'} fontWeight={'600'}>
        {t('profilePage.Fundraising Account Data')}
      </Text>
      <FlexRow vPadding="12">
        <FlexCell width="auto" grow={1}>
          <Alert color="info" icon={InfIcon}>
            <Text>
              This information is required to start art objects fundraising when
              winning proposal is chosen and tender is closed.
            </Text>
          </Alert>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell width="auto" grow={1}>
          <Text fontSize={'12'}>
            <LabeledInput>
              <Checkbox
                {...lens.prop('bank_use_default').toProps()}
                label="Use this bank data by default for each tender fundraising."
              />
            </LabeledInput>
          </Text>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell width="auto" grow={1}>
          <LabeledInput
            label={t('Beneficiary')}
            {...lens.prop('bank_benefit_name').toProps()}
          >
            <TextInput
              placeholder={t('Beneficiary')}
              {...lens.prop('bank_benefit_name').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell cx={styles.inputWrapper} width="auto" grow={1}>
          <LabeledInput
            label={t('Beneficiary Bank')}
            {...lens.prop('bank_benefit_bank').toProps()}
          >
            <TextInput
              placeholder={t('Bank name')}
              {...lens.prop('bank_benefit_bank').toProps()}
            />
          </LabeledInput>
        </FlexCell>
        <FlexCell width="auto" grow={1}>
          <LabeledInput
            label={t('Account Number')}
            {...lens.prop('bank_account').toProps()}
          >
            <TextInput
              placeholder={t('Enter account number')}
              {...lens.prop('bank_account').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell cx={styles.inputWrapper} width="auto" grow={1}>
          <LabeledInput
            label={t('IBAN Number')}
            {...lens.prop('bank_iban').toProps()}
          >
            <TextInput
              placeholder={t('International bank code')}
              {...lens.prop('bank_iban').toProps()}
            />
          </LabeledInput>
        </FlexCell>
        <FlexCell width="auto" grow={1}>
          <LabeledInput
            label={t('SWIFT Code')}
            {...lens.prop('bank_swift').toProps()}
          >
            <TextInput
              placeholder={t('Enter code')}
              {...lens.prop('bank_swift').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow>
        <div className={styles.divider} />
      </FlexRow>
      <FlexRow justifyContent={'end'}>
        <Button
          color="primary"
          caption={t('Save Information')}
          onClick={save}
        />
      </FlexRow>
    </Panel>
  );
};
