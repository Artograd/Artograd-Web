import styles from './ProfileInformation.module.scss';
import {
  Button,
  FlexCell,
  FlexRow,
  LabeledInput,
  Panel,
  Text,
  TextInput,
  useForm,
  Alert,
  Checkbox
} from '@epam/uui';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { CityItemType } from '../../../../types';
import { useEffect, useState } from 'react';
import { getCityList } from '../../../../requests';
import { LocationInput } from './components/LocationInput/LocationInput'
import { SocialMediaSelector } from './components/SocialMediaSelector/SocialMediaSelector'
import { saveProfileData } from '../../../../services/api/profile.api'



export const ProfileInformation = () => {
  const { t } = useTranslation();
  const { firstName, lastName, company, title, location, email, showEmail } = useSelector(
    (state: RootState) =>
      state.profileInformation.profileInformation,
  );
  const [showEmailValue, showEmailChange] = useState<boolean>(showEmail);
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );

  const { lens, save } = useForm({
    value: {
      firstName,
      lastName,
      company,
      title,
      location,
      email,
      showEmail
    },
    onSave: (profileInf) => {
      console.log('form', profileInf);
      saveProfileData(username).then(val => {
        console.log(val);
      })
      return Promise.resolve({ form: profileInf }) /* place your save api call here */
    },
    onSuccess: () => null,
    onError: () => null,
    getMetadata: () => ({
      props: {
        firstName: { isRequired: true },
        lastName: { isRequired: true },
        company: { isRequired: false },
        title: { isRequired: false },
        location: { isRequired: false },
        email: { isRequired: false },
      },
    }),
    settingsKey: 'basic-form-example',
  });

  const [locationName, setLocation] = useState<CityItemType[]>([]);

  useEffect(() => {
    getCityList()
      .then((response) => {
        console.log(333, response)
        setLocation(response)
      })
      .catch(() => null);
  }, []);

  function locationSelection(data: any) {
    lens.update(curent => {
      return { ... curent, location: data };
    })
  }
  function socialMediaSelection(data: any) {
    console.log('socialMediaSelection', data);
  }

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
          <LabeledInput label={t('profilePage.Job Title')} sidenote={
            <Trans
              components={{
                i: <span className={styles.sideNote} />,
              }}
              i18nKey="optionalSidenote"
            />
          } {...lens.prop('title').toProps()}>
            <TextInput placeholder="Title" {...lens.prop('title').toProps()} />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding={'12'}>
        <LocationInput
          data={locationName}
          selectedLocation={location}
          updateLocation={locationSelection}
        ></LocationInput>
      </FlexRow>
      <FlexRow vPadding={'12'}>
        <Text fontSize={'18'} fontWeight={'600'}>
          {t('profilePage.Contact Information')}
        </Text>
      </FlexRow>
      <FlexRow>
        <FlexCell width="auto" grow={1}>
          <LabeledInput
            label="Work Email"
            {...lens.prop('email').toProps()}
          >
            <TextInput
              isReadonly
              placeholder="Work Email"
              {...lens.prop('email').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding={'24'}>
        <FlexCell width="auto" grow={1}>
          <Alert color="warning">
            <Text fontSize={'12'}>
              <LabeledInput>
                <Checkbox {...lens.prop('showEmail').toProps()} value={showEmailValue}
                          onValueChange={(value) => showEmailChange(value)}
                          label="Show my email as means of contact in the tender description." />
              </LabeledInput>
            </Text>
          </Alert>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding={'12'}>
        <FlexCell width="auto" grow={1}>
          <FlexRow>
            <Text fontSize={'18'} fontWeight={'600'}>
              {t('profilePage.Additional Links')}
            </Text>
          </FlexRow>
          <FlexRow>
            <Text fontSize={'14'}>
              Add links to your portfolio to help people know your work profile better.
            </Text>
          </FlexRow>
          <FlexRow>
            <SocialMediaSelector
              socialMediaSelection={socialMediaSelection}
            ></SocialMediaSelector>
          </FlexRow>
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
