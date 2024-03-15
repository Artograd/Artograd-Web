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
import { Trans, useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  RangeDatePickerValue,
  useArrayDataSource,
  useUuiContext,
} from '@epam/uui-core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import 'dayjs/locale/ru';
import { FlexSpacer } from '@epam/uui-components';
import { ReactComponent as navigationBack } from '@epam/assets/icons/common/navigation-back-18.svg';
import { FileUpload } from '../../components/FileUpload/FileUpload';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngLiteral } from 'leaflet';
import { CategoryItemType, CityItemType, TenderStatus } from '../../types';
import { MapCordsController } from '../../components/MapCordsController/MapCordsController';
import { LocationSelectorModal } from '../../components/LocationSelectorModal/LocationSelectorModal';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { isPageLoading } from '../../store/helpersSlice';
import { v4 as uuidv4 } from 'uuid';

const DefaultIcon = L.icon({
  iconUrl: MarkerIcon,
  shadowUrl: MarkerIconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

type NewTenderFormType = {
  sub?: string;
  tenderTitle?: string;
  tenderDescription?: string;
  tenderValidity?: RangeDatePickerValue;
  tenderExpectedDelivery?: string;
  tenderCategory?: number[];
  emailSharingAgreement?: boolean;
  locationCityName?: CityItemType;
  locationComments?: string;
  locationAddress?: string;
  locationCoordinates?: LatLngLiteral;
  ownerFirstName?: string;
  ownerLastName?: string;
  ownerEmail?: string;
  ownerOrganization?: string;
};

export const NewTenderPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { uuiModals, uuiNotifications } = useUuiContext();
  const filesDirectoryId = uuidv4().replaceAll('-', '');

  // SELECTORS
  const { family_name, given_name, email, sub } = useSelector(
    (state: RootState) => state.identity.userData,
  );
  const userOrganization = useSelector(
    (state: RootState) => state.identity.userData['custom:organization'],
  );

  //   MAIN TENDER STATES
  const [tenderStatus, setTenderStatus] = useState(TenderStatus.PUBLISHED);
  const [tenderAttachments, setTenderAttachments] = useState<FileCardItem[]>(
    [],
  );

  // ADDRESS STATES
  const [listOfCities, setListOfCities] = useState<CityItemType[] | undefined>(
    [],
  );
  const [commentsValue, setCommentsValue] = useState<string>('');
  const [cityName, setCityName] = useState<CityItemType | undefined>();
  const [addressValue, setAddressValue] = useState<string | undefined>();
  const [locationCoordinates, setLocationCoordinates] = useState<
    LatLngLiteral | undefined
  >();

  const initialValues: NewTenderFormType = {
    sub: '',
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
    ownerOrganization: userOrganization,
  };

  const categoryList: CategoryItemType[] = [
    { id: 0, name: 'tendersPage.newTender.categories.sculptures' },
    { id: 1, name: 'tendersPage.newTender.categories.mosaics' },
    { id: 2, name: 'tendersPage.newTender.categories.murals' },
    { id: 3, name: 'tendersPage.newTender.categories.graffiti' },
    { id: 4, name: 'tendersPage.newTender.categories.functionalArt' },
    {
      id: 5,
      name: 'tendersPage.newTender.categories.interactiveInstallations',
    },
    { id: 6, name: 'tendersPage.newTender.categories.botanicalArt' },
    { id: 7, name: 'tendersPage.newTender.categories.waterFeatures' },
    { id: 8, name: 'tendersPage.newTender.categories.themedGardens' },
    { id: 9, name: 'tendersPage.newTender.categories.recycled' },
  ];

  const dataSource = useArrayDataSource(
    {
      items: categoryList,
    },
    [],
  );

  const getCityById = () => {
    return listOfCities?.find((city) => city.id === cityName?.id);
  };

  const {
    lens,
    save,
    value: formValues,
  } = useForm<NewTenderFormType>({
    value: initialValues,
    onSave: (tender) => Promise.resolve({ form: tender }),
    onSuccess: (form) =>
      axios
        .post(
          'https://t8g5g9h07h.execute-api.eu-central-1.amazonaws.com/api/tenders',
          {
            title: form.tenderTitle,
            description: form.tenderDescription,
            submissionStart: form.tenderValidity?.from,
            submissionEnd: form.tenderValidity?.to,
            expectedDelivery: form.tenderExpectedDelivery,
            category: form.tenderCategory,
            location: {
              nestedLocation: {
                name: cityName?.name,
              },
              geoPosition: {
                latitude: cityName?.lat,
                longitude: cityName?.lng,
              },
              addressLine: addressValue,
              addressComment: commentsValue,
            },
            ownerName: `${form.ownerFirstName} ${form.ownerLastName}`,
            ownerId: sub,
            organization: form.ownerOrganization,
            showEmail: form.emailSharingAgreement,
            files: tenderAttachments,
            coverUrl: 'string',
            status: tenderStatus,
            filesDirectoryId,
          },
        )
        .then(() => {
          history.push('/tenders');
          dispatch(isPageLoading(false));
        })
        .catch(() => dispatch(isPageLoading(false))),
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
        ownerOrganization: { isRequired: false },
      },
    }),
    settingsKey: 'new-tender-form',
  });

  const onFormSubmit = () => {
    dispatch(isPageLoading(true));
    save();
  };

  const onDraftFormSubmit = () => {
    dispatch(isPageLoading(true));
    setTenderStatus(TenderStatus.DRAFT);
    save();
  };

  useEffect(() => {
    axios
      .get(
        'https://t8g5g9h07h.execute-api.eu-central-1.amazonaws.com/api/cities',
      )
      .then((response) => setListOfCities(response.data));
  }, []);

  // UUI Component Localization
  i18nFromUui.rangeDatePicker = {
    ...i18nFromUui.rangeDatePicker,
    pickerPlaceholderFrom: t(
      'tendersPage.newTender.tenderValidityPeriodFromPlaceholder',
    ),
    pickerPlaceholderTo: t(
      'tendersPage.newTender.tenderValidityPeriodToPlaceholder',
    ),
  };

  i18nFromUui.form.modals = {
    ...i18nFromUui.form.modals,
    beforeLeaveMessage: t('tendersPage.newTender.beforeLeave.message'),
    saveButton: t('tendersPage.newTender.beforeLeave.saveCta'),
    discardButton: t('tendersPage.newTender.beforeLeave.discardCta'),
  };

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
                    rawProps={{ 'data-testid': `tender-title-input` }}
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
                    rawProps={{ 'data-testid': `tender-description-input` }}
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
                        isRequired
                        {...lens.prop('tenderValidity').toProps()}
                        format="MMM D, YYYY"
                        rawProps={{
                          from: { 'data-testid': `tender-validity-from-input` },
                          to: { 'data-testid': `tender-validity-to-input` },
                        }}
                      />
                    </LabeledInput>
                  </FlexCell>

                  <FlexCell width="100%" grow={1}>
                    <LabeledInput
                      htmlFor="tenderExpectedDelivery"
                      label={t(
                        'tendersPage.newTender.tenderExpectedDeliveryLabel',
                      )}
                      sidenote={
                        <Trans
                          i18nKey="tendersPage.newTender.tenderExpectedDeliveryLabelSidenote"
                          components={{
                            i: <span className={styles.sideNote} />,
                          }}
                        />
                      }
                      cx={styles.inputLabel}
                      {...lens.prop('tenderExpectedDelivery').toProps()}
                    >
                      <DatePicker
                        id="tenderExpectedDelivery"
                        {...lens.prop('tenderExpectedDelivery').toProps()}
                        format="MMM D, YYYY"
                        placeholder={t('global.datePickerPlaceholder')}
                        rawProps={{
                          input: {
                            'data-testid': `tender-expected-delivery-input`,
                          },
                        }}
                        filter={(day: Dayjs) =>
                          day.valueOf() >=
                          dayjs(
                            formValues.tenderValidity?.to
                              ? formValues.tenderValidity?.to
                              : undefined,
                          ).valueOf()
                        }
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
                      sidenote={
                        <Trans
                          components={{
                            i: <span className={styles.sideNote} />,
                          }}
                          i18nKey="tendersPage.newTender.tenderCategoryLabelSidenote"
                        />
                      }
                      cx={styles.inputLabel}
                      {...lens.prop('tenderCategory').toProps()}
                    >
                      <PickerInput
                        id="tenderCategory"
                        {...lens.prop('tenderCategory').toProps()}
                        dataSource={dataSource}
                        getName={(item: CategoryItemType) => t(item?.name)}
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
                          listOfCities={listOfCities}
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
                          {addressValue && `, ${addressValue}`}
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
                {(given_name || family_name) && (
                  <FlexRow cx={styles.ownerDetailsRow}>
                    <Text>{t('tendersPage.newTender.tenderOwnerName')}</Text>
                    <Text>{`${given_name} ${family_name}`}</Text>
                  </FlexRow>
                )}
                {userOrganization && (
                  <FlexRow cx={styles.ownerDetailsRow}>
                    <Text>
                      {t('tendersPage.newTender.tenderOwnerOrganisation')}
                    </Text>
                    <Text>{userOrganization}</Text>
                  </FlexRow>
                )}
                {email && (
                  <FlexRow cx={styles.ownerDetailsRow}>
                    <Text>{t('tendersPage.newTender.tenderOwnerEmail')}</Text>
                    <Text>{email}</Text>
                  </FlexRow>
                )}

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
                  filesDirectoryId={filesDirectoryId}
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
            onClick={() => onDraftFormSubmit()}
            cx={styles.draftCta}
          />
          <Button
            color="primary"
            caption={t('tendersPage.newTender.pageFormFooterCreateCta')}
            onClick={() => onFormSubmit()}
            rawProps={{ 'data-testid': `form-submit` }}
          />
        </FlexRow>
      </Panel>
    </Panel>
  );
};
