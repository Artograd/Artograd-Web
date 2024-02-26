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
  ModalBlocker,
  ModalFooter,
  ModalHeader,
  ModalWindow,
  Panel,
  PickerInput,
  RangeDatePicker,
  ScrollBars,
  SuccessNotification,
  Text,
  TextArea,
  TextInput,
  WarningNotification,
  i18n as i18nFromUui,
} from '@epam/uui';
import styles from './NewTenderPage.module.scss';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  IModal,
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

type pickerItemType = {
  id: number;
  label: string;
};

const categoryList: pickerItemType[] = [
  { id: 1, label: 'Outdoors' },
  { id: 2, label: 'Sculptures' },
];

const cityList: pickerItemType[] = [{ id: 1, label: 'Budva, Becici' }];
const addressList: pickerItemType[] = [{ id: 1, label: 'Mediteranska, 8525' }];

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
  const [cityValue, setCityValue] = useState({ id: 0, label: '' });
  const [addressValue, setAddressValue] = useState({ id: 0, label: '' });
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
                        getName={(item: pickerItemType) => item.label}
                        entityName="category"
                        selectionMode="multi"
                        valueType="id"
                        sorting={{ field: 'label', direction: 'asc' }}
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
                  caption={t('tendersPage.newTender.tenderIndicateLink')}
                  cx={styles.indicateLink}
                  onClick={() =>
                    uuiModals
                      .show<string>((props) => (
                        <LocationModal
                          modalProps={props}
                          addressValue={addressValue}
                          cityValue={cityValue}
                          commentsValue={commentsValue}
                          setAddressValue={setAddressValue}
                          setCityValue={setCityValue}
                          setCommentsValue={setCommentsValue}
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
                <Text>{cityValue.label}</Text>
                <Text>{addressValue.label}</Text>
                <Text>{commentsValue}</Text>
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

export function LocationModal({
  modalProps,
  commentsValue,
  cityValue,
  addressValue,
  setCommentsValue,
  setCityValue,
  setAddressValue,
}: {
  modalProps: IModal<string>;
  commentsValue: string;
  cityValue: pickerItemType;
  addressValue: pickerItemType;
  setCommentsValue: Dispatch<SetStateAction<string>>;
  setCityValue: Dispatch<SetStateAction<pickerItemType>>;
  setAddressValue: Dispatch<SetStateAction<pickerItemType>>;
}) {
  const [commentsModalValue, setCommentsModalValue] = useState(commentsValue);
  const [cityModalValue, setCityModalValue] =
    useState<pickerItemType>(cityValue);
  const [addressModalValue, setAddressModalValue] =
    useState<pickerItemType>(addressValue);
  const cityDataSource = useArrayDataSource(
    {
      items: cityList,
    },
    [],
  );

  const addressDataSource = useArrayDataSource(
    {
      items: addressList,
    },
    [],
  );

  const saveValues = () => {
    setCommentsValue(commentsModalValue);
    setCityValue(cityModalValue);
    setAddressValue(addressModalValue);
    modalProps.success('Success action');
  };

  console.log(':::commentsModalValue', commentsModalValue);
  console.log(':::cityModalValue', cityModalValue);
  console.log(':::addressModalValue', addressModalValue);

  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modal} width={753}>
        <Panel background="surface-main">
          <ModalHeader
            title="Indicate location"
            onClose={() => modalProps.abort()}
            borderBottom
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <Panel margin="24">
              <FlexRow alignItems="top">
                <FlexCell width="100%">
                  <LabeledInput
                    htmlFor="countryInput"
                    label="Country"
                    cx={styles.modalInputLabel}
                  >
                    <TextInput
                      id="countryInput"
                      value="Montenegro"
                      onValueChange={(e) => e}
                      placeholder="Please type text"
                      isDisabled
                    />
                  </LabeledInput>
                  <LabeledInput
                    htmlFor="cityInput"
                    label="City / Region"
                    cx={styles.modalInputLabel}
                  >
                    <PickerInput
                      id="cityInput"
                      dataSource={cityDataSource}
                      value={cityModalValue}
                      onValueChange={setCityModalValue}
                      getName={(item: pickerItemType) => item.label}
                      entityName="City"
                      selectionMode="single"
                      valueType="entity"
                      sorting={{ field: 'label', direction: 'asc' }}
                    />
                  </LabeledInput>
                  <LabeledInput
                    htmlFor="addressInput"
                    label="Address line"
                    sidenote="This field is optional"
                    cx={styles.modalInputLabel}
                  >
                    <PickerInput
                      id="addressInput"
                      dataSource={addressDataSource}
                      value={addressModalValue}
                      onValueChange={setAddressModalValue}
                      getName={(item: pickerItemType) => item.label}
                      entityName="Address"
                      selectionMode="single"
                      valueType="entity"
                      sorting={{ field: 'label', direction: 'asc' }}
                    />
                  </LabeledInput>
                </FlexCell>
                <FlexCell width="100%">
                  <Panel cx={styles.mapWrapper}>
                    <MapContainer
                      center={[51.505, -0.09]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ height: '234px', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    </MapContainer>
                  </Panel>
                </FlexCell>
              </FlexRow>
              <FlexRow>
                <FlexCell width="100%">
                  <LabeledInput
                    label="Comments"
                    sidenote="This field is optional"
                    htmlFor="commentsInput"
                    cx={styles.commentsInputWrapper}
                  >
                    <TextArea
                      value={commentsModalValue}
                      onValueChange={setCommentsModalValue}
                      placeholder="Type text"
                      id="commentsInput"
                    />
                  </LabeledInput>
                </FlexCell>
              </FlexRow>
            </Panel>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption="Cancel"
              onClick={() => modalProps.abort()}
            />
            <Button
              color="accent"
              caption="Confirm Location"
              onClick={() => saveValues()}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
