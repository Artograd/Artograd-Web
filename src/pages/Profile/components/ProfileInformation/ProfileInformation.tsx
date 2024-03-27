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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store/store';
import { CityItemType } from '../../../../types';
import { useEffect, useState } from 'react';
import { getCityList } from '../../../../requests';
import { LocationInput } from './components/LocationInput/LocationInput'
import { SocialMediaSelector } from './components/SocialMediaSelector/SocialMediaSelector'
import { createProfilePayload, saveProfileData, addCustomPref } from '../../../../services/api/profile.api';
import { updateProfileInformation } from '../../../../store/slices/profileInformationSlice';


export const ProfileInformation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { given_name, family_name, email } = useSelector(
    (state: RootState) =>
      state.profileInformation.profileInformation,
  );
  const show_email = useSelector(
    (state: RootState) => state.profileInformation.profileInformation['custom:show_email'],
  );
  const location = useSelector(
    (state: RootState) => state.profileInformation.profileInformation['custom:location'],
  );
  const organization = useSelector(
    (state: RootState) => state.profileInformation.profileInformation['custom:organization'],
  );
  const jobtitle = useSelector(
    (state: RootState) => state.profileInformation.profileInformation['custom:jobtitle'],
  );
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );

  const { lens, save } = useForm({
    value: {
      given_name,
      family_name,
      organization,
      jobtitle,
      location,
      email,
      show_email
    },
    onSave: async (profileInf) => {
      try {
        await saveProfileData(username, createProfilePayload(profileInf));
        return await Promise.resolve({ form: profileInf });
      } catch {
        return await Promise.reject();
      }
    },
    onSuccess: (formData) => {
      dispatch(updateProfileInformation(formData))
      console.log(555, addCustomPref(formData))
    },
    onError: () => null,
    getMetadata: () => ({
      props: {
        given_name: { isRequired: true },
        family_name: { isRequired: true },
        organization: { isRequired: false },
        jobtitle: { isRequired: false },
        location: { isRequired: false },
        email: { isRequired: false },
        show_email: { isRequired: false },
      },
    }),
    settingsKey: 'basic-form-example',
  });

  const [locationList, setLocationList] = useState<CityItemType[]>([]);
  const [loc, setLoc] = useState<CityItemType>();

  useEffect(() => {
    getCityList()
      .then((response) => {
        setLocationList(response);
        setLoc(getCityById(response, location));
      })
      .catch(() => null);
  }, []);
  const getCityById = (locationList:CityItemType[], city?: string) => {
    return locationList.find((cityArray) => cityArray.id === city);
  };
  const locationSelection = (data: any) => {
    lens.update(curent => {
      return { ... curent, location: data };
    })
  }
  const socialMediaSelection = (data: any) => {
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
            {...lens.prop('given_name').toProps()}
          >
            <TextInput
              placeholder="First Name"
              {...lens.prop('given_name').toProps()}
            />
          </LabeledInput>
        </FlexCell>
        <FlexCell width="auto" cx={styles.lastName} grow={1}>
          <LabeledInput label="Last Name" {...lens.prop('family_name').toProps()}>
            <TextInput
              placeholder="Last Name"
              {...lens.prop('family_name').toProps()}
            />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding="12">
        <FlexCell grow={1}>
          <LabeledInput label="Company" {...lens.prop('organization').toProps()}>
            <TextInput
              placeholder="Company"
              {...lens.prop('organization').toProps()}
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
          } {...lens.prop('jobtitle').toProps()}>
            <TextInput placeholder="Title" {...lens.prop('jobtitle').toProps()} />
          </LabeledInput>
        </FlexCell>
      </FlexRow>
      <FlexRow vPadding={'12'}>
        <LocationInput
          data={locationList}
          selectedLocation={loc}
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
                <Checkbox {...lens.prop('show_email').toProps()}
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
