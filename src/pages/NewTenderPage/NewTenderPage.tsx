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
import { CategoryItemType } from '../../types';
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
  const [tenderDescription, setTenderDescription] = useState('');
  const [tenderTitleValue, setTenderTitleValue] = useState<string | undefined>(
    '',
  );
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState<
    string | null
  >('');
  const [emailSharingAgreement, setEmailSharingAgreement] = useState(false);
  const [tenderCategory, setTenderCategory] = useState<unknown[]>([]);
  const [tenderValidityPeriod, setTenderValidityPeriod] =
    useState<RangeDatePickerValue>({
      from: '',
      to: '',
    });

  // ADDRESS STATES
  const [commentsValue, setCommentsValue] = useState<string>('');
  const [cityId, setCityId] = useState<number | undefined>();
  const [addressValue, setAddressValue] = useState<number | undefined>();
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
    return cityList.find((city) => city.id === cityId);
  };

  const getAddressById = () => {
    return addressList.find((address) => address.id === addressValue);
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
                >
                  <TextInput
                    id="tenderTitle"
                    value={tenderTitleValue}
                    onValueChange={setTenderTitleValue}
                    placeholder={t(
                      'tendersPage.newTender.tenderTitlePlaceholder',
                    )}
                    isRequired
                  />
                </LabeledInput>

                <LabeledInput
                  htmlFor="tenderDescription"
                  label={t('tendersPage.newTender.tenderDescriptionLabel')}
                  cx={styles.inputLabel}
                >
                  <TextArea
                    id="tenderDescription"
                    value={tenderDescription}
                    onValueChange={setTenderDescription}
                    placeholder={t(
                      'tendersPage.newTender.tenderDescriptionPlaceholder',
                    )}
                    isRequired
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
                    >
                      <RangeDatePicker
                        id="tenderValidity"
                        value={tenderValidityPeriod}
                        onValueChange={setTenderValidityPeriod}
                        format="MMM D, YYYY"
                        isRequired
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
                    >
                      <DatePicker
                        id="tenderExpectedDelivery"
                        value={expectedDeliveryDate}
                        onValueChange={setExpectedDeliveryDate}
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
                    >
                      <PickerInput
                        id="tenderCategory"
                        dataSource={dataSource}
                        value={tenderCategory}
                        onValueChange={setTenderCategory}
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
                          cityId={cityId}
                          addressValue={addressValue}
                          commentsValue={commentsValue}
                          locationCoordinates={locationCoordinates}
                          setCommentsValue={setCommentsValue}
                          setCityId={setCityId}
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
                    {(cityId || addressValue || commentsValue) && (
                      <>
                        <Panel cx={styles.orderDetailsWrapper}>
                          {(cityId || addressValue) && (
                            <Text cx={styles.ownerDetails}>
                              {t(
                                'tendersPage.newTender.tenderLocationAddressLine',
                              )}
                            </Text>
                          )}
                          {commentsValue && (
                            <Text cx={styles.ownerDetails}>
                              {t(
                                'tendersPage.newTender.tenderLocationComments',
                              )}
                            </Text>
                          )}
                        </Panel>
                        <Panel cx={styles.orderDetailsWrapper}>
                          <Text cx={styles.ownerDetails}>
                            {cityId || addressValue
                              ? `${process.env.REACT_APP_LOCATION}`
                              : ''}
                            {cityId ? `, ${getCityById()?.name}` : undefined}
                            {addressValue ? `, ${getAddressById()?.name}` : ''}
                          </Text>
                          {commentsValue && (
                            <Text cx={styles.ownerDetails}>
                              {commentsValue}
                            </Text>
                          )}
                        </Panel>
                      </>
                    )}
                  </FlexCell>
                  <FlexCell width="100%" grow={1}>
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
                <Panel cx={styles.orderDetailsWrapper}>
                  <Text cx={styles.ownerDetails}>
                    {t('tendersPage.newTender.tenderOwnerName')}
                  </Text>
                  <Text cx={styles.ownerDetails}>
                    {t('tendersPage.newTender.tenderOwnerOrganisation')}
                  </Text>
                  <Text cx={styles.ownerDetails}>
                    {t('tendersPage.newTender.tenderOwnerEmail')}
                  </Text>
                </Panel>
                <Panel cx={styles.orderDetailsWrapper}>
                  <Text cx={styles.ownerDetails}>
                    {`${given_name} ${family_name}`}
                  </Text>
                  <Text cx={styles.ownerDetails}>
                    {`Regional Culture Center`}
                  </Text>
                  <Text cx={styles.ownerDetails}>{email}</Text>
                </Panel>

                <Alert color="warning" cx={styles.emailInfoAlert}>
                  <Checkbox
                    label={t(
                      'tendersPage.newTender.tenderOwnerEmailAvailabilityCheckbox',
                    )}
                    value={emailSharingAgreement}
                    onValueChange={setEmailSharingAgreement}
                  />
                </Alert>
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
            onClick={() => null}
          />
        </FlexRow>
      </Panel>
    </Panel>
  );
};
