import styles from './ProfileInformation.module.scss';
import {
  Button,
  ErrorNotification,
  FlexCell,
  FlexRow,
  LabeledInput,
  Panel,
  SuccessNotification,
  Text,
  TextInput,
  useForm,
} from '@epam/uui';
import { useTranslation } from 'react-i18next';
import { svc } from '../../../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

export const ProfileInformation = () => {
  const { t } = useTranslation();
  const { firstName, lastName, company, title } = useSelector(
    (state: RootState) =>
      state.profileInformation.profileInformation,
  );

  const { lens, save } = useForm({
    value: {
      firstName,
      lastName,
      company,
      title,
    },
    onSave: (profileInf) =>
      Promise.resolve({ form: profileInf }) /* place your save api call here */,
    onSuccess: () =>
      svc.uuiNotifications.show((props) => (
        <SuccessNotification {...props}>
          <Text>Info saved</Text>
        </SuccessNotification>
      )),
    onError: () =>
      svc.uuiNotifications.show((props) => (
        <ErrorNotification {...props}>
          <Text>Error on save</Text>
        </ErrorNotification>
      )),
    getMetadata: () => ({
      props: {
        firstName: { isRequired: true },
        lastName: { isRequired: true },
        company: { isRequired: false },
        title: { isRequired: false },
      },
    }),
    settingsKey: 'basic-form-example',
  });

  return (
    <Panel cx={styles.wrapper} shadow>
      <Text fontSize={'18'} fontWeight={'600'}>
        {t('profilePage.Basic Information')}
      </Text>
      <FlexRow vPadding="12">
        <FlexCell width="auto" grow={1}>
          <LabeledInput
            label="First Name"
            {...lens.prop('firstName').toProps()}
          >
            <TextInput
              placeholder="First Name"
              {...lens.prop('firstName').toProps()}
            />
          </LabeledInput>
        </FlexCell>
        <FlexCell width="auto" cx={styles.lastName} grow={1}>
          <LabeledInput label="Last Name" {...lens.prop('lastName').toProps()}>
            <TextInput
              placeholder="Last Name"
              {...lens.prop('lastName').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell grow={1}>
          <LabeledInput label="Company" {...lens.prop('company').toProps()}>
            <TextInput
              placeholder="Company"
              {...lens.prop('company').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell grow={1}>
          <LabeledInput label="Title" {...lens.prop('title').toProps()}>
            <TextInput placeholder="Title" {...lens.prop('title').toProps()} />
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
