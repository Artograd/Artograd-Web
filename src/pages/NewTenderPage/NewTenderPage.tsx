import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  FileCardItem,
  FlexCell,
  FlexRow,
  LabeledInput,
  LinkButton,
  Panel,
  PickerInput,
  RangeDatePicker,
  SuccessNotification,
  Text,
  TextArea,
  TextInput,
  WarningNotification,
  i18n as i18nFromUui,
  useForm,
} from '@epam/uui';
import styles from './NewTenderPage.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  RangeDatePickerValue,
  useArrayDataSource,
  useUuiContext,
} from '@epam/uui-core';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import 'dayjs/locale/ru';
import { FlexSpacer } from '@epam/uui-components';
import { ReactComponent as navigationBack } from '@epam/assets/icons/common/navigation-back-18.svg';
import { FileUpload } from './components/FileUpload/FileUpload';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngLiteral } from 'leaflet';
import { AddressItemType, CategoryItemType, CityItemType } from '../../types';
import { MapCordsController } from './components/MapCordsController/MapCordsController';
import {
  LocationSelectorModal,
  addressList,
  cityList,
} from './components/LocationSelectorModal/LocationSelectorModal';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: MarkerIcon,
  shadowUrl: MarkerIconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const categoryList: CategoryItemType[] = [
  { id: 1, name: 'Outdoors' },
  { id: 2, name: 'Sculptures' },
];

type NewTenderFormType = {
  tenderTitle?: string;
  tenderDescription?: string;
  tenderValidity?: RangeDatePickerValue;
  tenderExpectedDelivery?: string;
  tenderCategory?: string[];
  emailSharingAgreement?: boolean;
  locationCityName?: CityItemType;
  locationComments?: string;
  locationAddress?: number;
  locationCoordinates?: LatLngLiteral;
  ownerFirstName?: string;
  ownerLastName?: string;
  ownerEmail?: string;
  ownerOrganization?: string;
};

export const NewTenderPage = () => {
  const { t } = useTranslation();
  const { uuiModals, uuiNotifications } = useUuiContext();

  const { family_name, given_name, email } = useSelector(
    (state: RootState) => state.identity,
  );

  //   MAIN TENDER STATES
  const [tenderAttachments, setTenderAttachments] = useState<FileCardItem[]>(
    [],
  );

  // ADDRESS STATES
  const [commentsValue, setCommentsValue] = useState<string>('');
  const [cityName, setCityName] = useState<CityItemType | undefined>();
  const [addressValue, setAddressValue] = useState<
    AddressItemType | undefined
  >();
  const [locationCoordinates, setLocationCoordinates] = useState<
    LatLngLiteral | undefined
  >();

  const dataSource = useArrayDataSource(
    {
      items: categoryList,
    },
    [],
  );

  i18nFromUui.rangeDatePicker = {
    ...i18nFromUui.rangeDatePicker,
    pickerPlaceholderFrom: t(
      'tendersPage.newTender.tenderValidityPeriodFromPlaceholder',
    ),
    pickerPlaceholderTo: t(
      'tendersPage.newTender.tenderValidityPeriodToPlaceholder',
    ),
  };

  const getCityById = () => {
    return cityList.find((city) => city.id === cityName?.id);
  };

  const getAddressById = () => {
    return addressList.find((address) => address.id === addressValue?.id);
  };

  const initialValues: NewTenderFormType = {
    tenderTitle: '',
    tenderDescription: '',
    tenderValidity: { from: '', to: '' },
    tenderExpectedDelivery: '',
    tenderCategory: undefined,
    emailSharingAgreement: false,
    locationCityName: undefined,
    locationComments: '',
    locationAddress: undefined,
    locationCoordinates: undefined,
    ownerFirstName: given_name,
    ownerLastName: family_name,
    ownerEmail: email,
    ownerOrganization: 'Regional Culture Center',
  };

  const { lens, save } = useForm<NewTenderFormType>({
    value: initialValues,
    onSave: (tender) => Promise.resolve({ form: tender }),
    onSuccess: (form) =>
      console.log(':::form', {
        ...form,
        locationCoordinates,
        locationAddress: addressValue,
        locationComments: commentsValue,
        locationCityName: cityName,
      }),
    getMetadata: () => ({
      props: {
        tenderTitle: { isRequired: true },
        tenderDescription: { isRequired: true },
        tenderValidity: { isRequired: true },
        tenderExpectedDelivery: { isRequired: false },
        tenderCategory: { isRequired: false },
        emailSharingAgreement: { isRequired: false },
        locationCityName: { isRequired: false },
        locationComments: { isRequired: false },
        locationAddress: { isRequired: false },
        locationCoordinated: { isRequired: false },
        ownerFirstName: { isRequired: false },
        ownerLastName: { isRequired: false },
        ownerEmail: { isRequired: false },
        ownerOrganization: { isRequired: false },
      },
    }),
    settingsKey: 'new-tender-form',
  });

  return (
    <Panel cx={styles.wrapper}>
      <LinkButton
        caption={t('tendersPage.newTender.pageBackCta')}
        link={{ pathname: '/tenders' }}
        icon={navigationBack}
        cx={styles.pageBackCta}
      />
      <Text cx={styles.pageTitle}>{t('tendersPage.newTender.pageTitle')}</Text>
      <Panel cx={styles.contentWrapper}>
        <FlexRow>
          <FlexCell cx={styles.contentBody} width="100%">
            <FlexRow>
              <FlexCell width="100%">
                <Text cx={styles.sectionHeadline}>
                  {t('tendersPage.newTender.tenderInformationSectionTitle')}
                </Text>

                <LabeledInput
                  htmlFor="tenderTitle"
                  label={t('tendersPage.newTender.tenderTitleLabel')}
                  cx={styles.inputLabel}
                  {...lens.prop('tenderTitle').toProps()}
                >
                  <TextInput
                    id="tenderTitle"
                    {...lens.prop('tenderTitle').toProps()}
                    placeholder={t(
                      'tendersPage.newTender.tenderTitlePlaceholder',
                    )}
                  />
                </LabeledInput>

                <LabeledInput
                  htmlFor="tenderDescription"
                  label={t('tendersPage.newTender.tenderDescriptionLabel')}
                  cx={styles.inputLabel}
                  {...lens.prop('tenderDescription').toProps()}
                >
                  <TextArea
                    id="tenderDescription"
                    {...lens.prop('tenderDescription').toProps()}
                    placeholder={t(
                      'tendersPage.newTender.tenderDescriptionPlaceholder',
                    )}
                  />
                </LabeledInput>
              </FlexCell>
            </FlexRow>

            <FlexRow>
              <FlexCell width="100%">
                <Text cx={styles.sectionHeadline}>
                  {t('tendersPage.newTender.tenderDetailsSectionTitle')}
                </Text>
                <FlexRow>
                  <FlexCell
                    width="100%"
                    grow={1}
                    cx={styles.rangeDatePickerWrapper}
                  >
                    <LabeledInput
                      htmlFor="tenderValidity"
                      label={t(
                        'tendersPage.newTender.tenderValidityPeriodLabel',
                      )}
                      cx={styles.inputLabel}
                      {...lens.prop('tenderValidity').toProps()}
                    >
                      <RangeDatePicker
                        id="tenderValidity"
                        {...lens.prop('tenderValidity').toProps()}
                        format="MMM D, YYYY"
                      />
                    </LabeledInput>
                  </FlexCell>

                  <FlexCell width="100%" grow={1}>
                    <LabeledInput
                      htmlFor="tenderExpectedDelivery"
                      label={t(
                        'tendersPage.newTender.tenderExpectedDeliveryLabel',
                      )}
                      sidenote={t(
                        'tendersPage.newTender.tenderExpectedDeliveryLabelSidenote',
                      )}
                      cx={styles.inputLabel}
                      {...lens.prop('tenderExpectedDelivery').toProps()}
                    >
                      <DatePicker
                        id="tenderExpectedDelivery"
                        {...lens.prop('tenderExpectedDelivery').toProps()}
                        format="MMM D, YYYY"
                        placeholder={t('global.datePickerPlaceholder')}
                      />
                    </LabeledInput>
                  </FlexCell>
                </FlexRow>

                <FlexRow>
                  <FlexCell
                    width="100%"
                    grow={1}
                    cx={styles.categoryPickerWrapper}
                  >
                    <LabeledInput
                      htmlFor="tenderCategory"
                      label={t('tendersPage.newTender.tenderCategoryLabel')}
                      sidenote={t(
                        'tendersPage.newTender.tenderCategoryLabelSidenote',
                      )}
                      cx={styles.inputLabel}
                      {...lens.prop('tenderCategory').toProps()}
                    >
                      <PickerInput
                        id="tenderCategory"
                        {...lens.prop('tenderCategory').toProps()}
                        dataSource={dataSource}
                        getName={(item: CategoryItemType) => item?.name}
                        entityName="category"
                        selectionMode="multi"
                        valueType="id"
                        sorting={{ field: 'name', direction: 'asc' }}
                        placeholder={t(
                          'tendersPage.newTender.tenderCategoryPlaceholder',
                        )}
                      />
                    </LabeledInput>
                  </FlexCell>

                  <FlexCell width="100%" grow={1} />
                </FlexRow>
              </FlexCell>
            </FlexRow>

            <FlexRow>
              <FlexCell width="100%">
                <Text cx={styles.sectionHeadline}>
                  {t('tendersPage.newTender.tenderLocationSectionTitle')}
                </Text>

                <LinkButton
                  caption={
                    getCityById()?.name || addressValue || commentsValue
                      ? t('tendersPage.newTender.tenderEditLocationLink')
                      : t('tendersPage.newTender.tenderIndicateLink')
                  }
                  cx={styles.indicateLink}
                  onClick={() =>
                    uuiModals
                      .show<string>((props) => (
                        <LocationSelectorModal
                          modalProps={props}
                          cityName={cityName}
                          addressValue={addressValue}
                          commentsValue={commentsValue}
                          locationCoordinates={locationCoordinates}
                          setCommentsValue={setCommentsValue}
                          setCityName={setCityName}
                          setAddressValue={setAddressValue}
                          setLocationCoordinates={setLocationCoordinates}
                        />
                      ))
                      .then((result) => {
                        uuiNotifications
                          .show((props) => (
                            <SuccessNotification {...props}>
                              <FlexRow alignItems="center">
                                <Text>{result}</Text>
                              </FlexRow>
                            </SuccessNotification>
                          ))
                          .catch(() => null);
                      })
                      .catch(() => {
                        uuiNotifications
                          .show((props) => (
                            <WarningNotification {...props}>
                              <FlexRow alignItems="center">
                                <Text>Close action</Text>
                              </FlexRow>
                            </WarningNotification>
                          ))
                          .catch(() => null);
                      })
                  }
                />
                <FlexRow alignItems="top">
                  <FlexCell width="100%" grow={1}>
                    {(cityName || addressValue) && (
                      <FlexRow cx={styles.locationDetailsRow}>
                        <Text>
                          {t('tendersPage.newTender.tenderLocationAddressLine')}
                        </Text>
                        <Text>
                          {(cityName || addressValue) &&
                            process.env.REACT_APP_LOCATION}
                          {cityName && `, ${getCityById()?.name}`}
                          {addressValue && `, ${getAddressById()?.name}`}
                        </Text>
                      </FlexRow>
                    )}
                    {commentsValue && (
                      <FlexRow cx={styles.locationDetailsRow}>
                        <Text>
                          {t('tendersPage.newTender.tenderLocationComments')}
                        </Text>
                        <Text>{commentsValue}</Text>
                      </FlexRow>
                    )}
                  </FlexCell>
                  <FlexCell width="100%" grow={1} cx={styles.mapWrapper}>
                    {locationCoordinates && getCityById()?.name && (
                      <MapContainer
                        center={[
                          locationCoordinates.lat,
                          locationCoordinates.lng,
                        ]}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: '111px', width: '100%' }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapCordsController cityCords={locationCoordinates} />
                        <Marker
                          position={[
                            locationCoordinates.lat,
                            locationCoordinates.lng,
                          ]}
                        />
                      </MapContainer>
                    )}
                  </FlexCell>
                </FlexRow>
              </FlexCell>
            </FlexRow>

            <FlexRow>
              <FlexCell width="100%">
                <Text cx={styles.sectionHeadline}>
                  {t('tendersPage.newTender.tenderOwnerContactSectionTitle')}
                </Text>

                <FlexRow cx={styles.ownerDetailsRow}>
                  <Text>{t('tendersPage.newTender.tenderOwnerName')}</Text>
                  <Text>{`${given_name} ${family_name}`}</Text>
                </FlexRow>
                <FlexRow cx={styles.ownerDetailsRow}>
                  <Text>
                    {t('tendersPage.newTender.tenderOwnerOrganisation')}
                  </Text>
                  <Text>Regional Culture Center</Text>
                </FlexRow>
                <FlexRow cx={styles.ownerDetailsRow}>
                  <Text>{t('tendersPage.newTender.tenderOwnerEmail')}</Text>
                  <Text>{email}</Text>
                </FlexRow>

                <FlexCell width="100%">
                  <Alert color="warning" cx={styles.emailInfoAlert}>
                    <Checkbox
                      label={t(
                        'tendersPage.newTender.tenderOwnerEmailAvailabilityCheckbox',
                      )}
                      {...lens.prop('emailSharingAgreement').toProps()}
                    />
                  </Alert>
                </FlexCell>
              </FlexCell>
            </FlexRow>

            <FlexRow>
              <FlexCell width="100%">
                <Text cx={styles.sectionHeadline}>
                  {t('tendersPage.newTender.tenderAdditionalInformationLabel')}
                </Text>
                <FileUpload
                  attachments={tenderAttachments}
                  setAttachments={setTenderAttachments}
                />
              </FlexCell>
            </FlexRow>
          </FlexCell>
        </FlexRow>
        <Panel cx={styles.separator} />
        <FlexRow cx={styles.contentFooter}>
          <Button
            fill="outline"
            color="secondary"
            caption={t('tendersPage.newTender.pageFormFooterCancelCta')}
            link={{ pathname: '/tenders' }}
          />
          <FlexSpacer />
          <Button
            fill="outline"
            color="secondary"
            caption={t('tendersPage.newTender.pageFormFooterDraftCta')}
            onClick={() => null}
            cx={styles.draftCta}
          />
          <Button
            color="primary"
            caption={t('tendersPage.newTender.pageFormFooterCreateCta')}
            onClick={() => save()}
          />
        </FlexRow>
      </Panel>
    </Panel>
  );
};
