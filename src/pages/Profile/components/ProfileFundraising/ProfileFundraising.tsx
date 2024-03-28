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
import { useState } from 'react';
import { RootState } from '../../../../store/store';
import { ReactComponent as InfIcon } from '@epam/assets/icons/common/notification-error-fill-18.svg';
import { createProfilePayload } from '../../../../services/helpers/profileHelper';
import { userApi } from '../../../../services/api/userAPI';
import { updateProfileFundrasing } from '../../../../store/slices/profileFundrasingSlice';

export const ProfileFundraising = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const beneficiary = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_benefit_name'],
  );
  const bank = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_benefit_bank'],
  );
  const account = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_account'],
  );
  const useBankDataByDefault = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_use_default'],
  );
  const swift = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_swift'],
  );
  const iban = useSelector(
    (state: RootState) =>
      state.profileFundrasing.profileFundrasing['custom:bank_iban'],
  );
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );

  const [useBankData, useBankDataChange] =
    useState<boolean>(useBankDataByDefault);

  const { lens, save } = useForm({
    value: { useBankDataByDefault, beneficiary, bank, account, iban, swift },
    onSave: (fundraising) => {
      console.log('form', fundraising);
      return userApi
        .put(username, createProfilePayload(fundraising))
        .then(() => {
          return Promise.resolve({ form: fundraising });
        })
        .catch(() => Promise.reject());
      return Promise.resolve({
        form: fundraising,
      }); /* place your save api call here */
    },
    onSuccess: (data) => {
      dispatch(updateProfileFundrasing(data));
    },
    onError: () => null,
    getMetadata: () => ({
      props: {
        beneficiary: { isRequired: false },
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
                {...lens.prop('useBankDataByDefault').toProps()}
                value={useBankData}
                onValueChange={(value) => useBankDataChange(value)}
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
            {...lens.prop('beneficiary').toProps()}
          >
            <TextInput
              placeholder={t('Beneficiary')}
              {...lens.prop('beneficiary').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell cx={styles.inputWrapper} width="auto" grow={1}>
          <LabeledInput
            label={t('Beneficiary Bank')}
            {...lens.prop('bank').toProps()}
          >
            <TextInput
              placeholder={t('Bank name')}
              {...lens.prop('bank').toProps()}
            />
          </LabeledInput>
        </FlexCell>
        <FlexCell width="auto" grow={1}>
          <LabeledInput
            label={t('Account Number')}
            {...lens.prop('account').toProps()}
          >
            <TextInput
              placeholder={t('Enter account number')}
              {...lens.prop('account').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell cx={styles.inputWrapper} width="auto" grow={1}>
          <LabeledInput
            label={t('IBAN Number')}
            {...lens.prop('bank').toProps()}
          >
            <TextInput
              placeholder={t('International bank code')}
              {...lens.prop('iban').toProps()}
            />
          </LabeledInput>
        </FlexCell>
        <FlexCell width="auto" grow={1}>
          <LabeledInput
            label={t('SWIFT Code')}
            {...lens.prop('account').toProps()}
          >
            <TextInput
              placeholder={t('Enter code')}
              {...lens.prop('swift').toProps()}
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
