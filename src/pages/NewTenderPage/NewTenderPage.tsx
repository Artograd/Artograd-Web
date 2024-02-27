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
import { FlexSpacer, i18n } from '@epam/uui-components';
import { ReactComponent as navigationBack } from '@epam/assets/icons/common/navigation-back-18.svg';
import { FileUpload } from './components/FileUpload/FileUpload';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { pickerItemType } from '../../types';
import { MapCordsController } from './components/MapCordsController/MapCordsController';
import { LocationSelectorModal } from './components/LocationSelectorModal/LocationSelectorModal';

const categoryList: pickerItemType[] = [
  { id: 1, name: 'Outdoors' },
  { id: 2, name: 'Sculptures' },
];

i18n.datePicker.locale = 'ru';

export const NewTenderPage = () => {
  const { t } = useTranslation();
  const { uuiModals, uuiNotifications } = useUuiContext();

  const { family_name, given_name, email } = useSelector(
    (state: RootState) => state.identity,
  );

  //   STATES
  const [attachments, setAttachments] = useState<FileCardItem[]>([]);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [titleValue, setTitleValue] = useState<string | undefined>('');
  const [date, setDate] = useState<string | null>('');
  const [commentsValue, setCommentsValue] = useState('');
  const [cordsValue, setCordsValue] = useState<LatLngExpression>([
    42.28364, 18.872,
  ]);
  const [cityValue, setCityValue] = useState<pickerItemType | undefined>();
  const [addressValue, setAddressValue] = useState<
    pickerItemType | undefined
  >();
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [categoryValue, setCategoryValue] = useState<unknown[]>([]);
  const [rangeValue, setRangeValue] = useState<RangeDatePickerValue>({
    from: '',
    to: '',
  });

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
                    value={titleValue}
                    onValueChange={setTitleValue}
                    placeholder={t(
                      'tendersPage.newTender.tenderTitlePlaceholder',
                    )}
                  />
                </LabeledInput>

                <LabeledInput
                  htmlFor="tenderDescription"
                  label={t('tendersPage.newTender.tenderDescriptionLabel')}
                  cx={styles.inputLabel}
                >
                  <TextArea
                    id="tenderDescription"
                    value={descriptionValue}
                    onValueChange={setDescriptionValue}
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
                    >
                      <RangeDatePicker
                        id="tenderValidity"
                        value={rangeValue}
                        onValueChange={setRangeValue}
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
                    >
                      <DatePicker
                        id="tenderExpectedDelivery"
                        value={date}
                        onValueChange={setDate}
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
                        value={categoryValue}
                        onValueChange={setCategoryValue}
                        getName={(item: pickerItemType | undefined) =>
                          item!.name
                        }
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
                    cityValue?.name || addressValue?.name || commentsValue
                      ? t('tendersPage.newTender.tenderEditLocationLink')
                      : t('tendersPage.newTender.tenderIndicateLink')
                  }
                  cx={styles.indicateLink}
                  onClick={() =>
                    uuiModals
                      .show<string>((props) => (
                        <LocationSelectorModal
                          modalProps={props}
                          addressValue={addressValue}
                          cityValue={cityValue}
                          commentsValue={commentsValue}
                          cordsValue={cordsValue}
                          setAddressValue={setAddressValue}
                          setCityValue={setCityValue}
                          setCommentsValue={setCommentsValue}
                          setCordsValue={setCordsValue}
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
                    {(cityValue || addressValue || commentsValue) && (
                      <>
                        <Panel cx={styles.orderDetailsWrapper}>
                          {(cityValue || addressValue) && (
                            <Text cx={styles.ownerDetails}>Address line</Text>
                          )}
                          {commentsValue && (
                            <Text cx={styles.ownerDetails}>Comments</Text>
                          )}
                        </Panel>

                        <Panel cx={styles.orderDetailsWrapper}>
                          <Text cx={styles.ownerDetails}>
                            {cityValue?.name || addressValue?.name
                              ? `${process.env.REACT_APP_LOCATION}`
                              : ''}
                            {cityValue?.name
                              ? `, ${cityValue?.name}`
                              : undefined}
                            {addressValue?.name
                              ? `, ${addressValue?.name}`
                              : ''}
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
                    {cordsValue && cityValue?.name && (
                      <MapContainer
                        center={[cityValue.lat!, cityValue.lng!]}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: '111px', width: '100%' }}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapCordsController cityCords={cityValue} />
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
                    value={checkBoxValue}
                    onValueChange={setCheckBoxValue}
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
                  attachments={attachments}
                  setAttachments={setAttachments}
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
            onClick={() => null}
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
