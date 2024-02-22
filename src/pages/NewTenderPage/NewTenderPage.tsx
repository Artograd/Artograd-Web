import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  DropSpot,
  FileCard,
  FileCardItem,
  FlexCell,
  FlexRow,
  LabeledInput,
  LinkButton,
  Panel,
  PickerInput,
  RangeDatePicker,
  Text,
  TextArea,
  TextInput,
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

type categoryItemType = {
  id: number;
  label: string;
};

const categoryList: categoryItemType[] = [
  { id: 1, label: 'Outdoors' },
  { id: 2, label: 'Sculptures' },
];

const ORIGIN = process.env.REACT_APP_PUBLIC_URL || '';

let tempIdCount = 0;

i18n.datePicker.locale = 'ru';

export const NewTenderPage = () => {
  const { t } = useTranslation();
  const { uuiApi } = useUuiContext();
  const { family_name, given_name, email } = useSelector(
    (state: RootState) => state.identity,
  );

  //   STATES
  const [attachments, setAttachments] = useState<FileCardItem[]>([]);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [titleValue, setTitleValue] = useState<string | undefined>('');
  const [date, setDate] = useState<string | null>('');
  const [rangeValue, setRangeValue] = useState<RangeDatePickerValue>({
    from: '',
    to: '',
  });

  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [categoryValue, setCategoryValue] = useState<unknown[]>([]);

  const dataSource = useArrayDataSource(
    {
      items: categoryList,
    },
    [],
  );

  const trackProgress = (progress: number, id: number) => {
    setAttachments((progressAttachments) =>
      progressAttachments.map((item) =>
        item.id === id ? { ...item, progress } : item,
      ),
    );
  };

  const updateFile = (file: FileCardItem, id: number) => {
    setAttachments((updateAttachments) =>
      updateAttachments.map((item) => (item.id === id ? file : item)),
    );
  };

  const deleteFile = (file: FileCardItem) => {
    setAttachments((deleteAttachments) =>
      deleteAttachments.filter((item) => item.id !== file.id),
    );
  };

  const uploadFile = (files: File[]) => {
    const newAttachments = [...attachments];

    files.map((file: File) => {
      const tempId = tempIdCount - 1;
      tempIdCount -= 1;
      const newFile: FileCardItem = {
        id: tempId,
        name: file.name,
        progress: 0,
        size: file.size,
      };
      newAttachments.push(newFile);

      uuiApi
        .uploadFile(ORIGIN.concat('/upload/uploadFileMock'), file, {
          onProgress: (progress) => trackProgress(progress, tempId),
          getXHR: (xhr) => {
            newFile.abortXHR = () => xhr.abort();
          },
        })
        .then((res) => updateFile({ ...res, progress: 100 }, tempId))
        .catch((err) =>
          updateFile({ ...newFile, progress: 100, error: err.error }, tempId),
        );
    });

    setAttachments(newAttachments);
  };

  i18nFromUui.fileUpload = {
    ...i18nFromUui.fileUpload,
    labelStart: t('tendersPage.newTender.tenderAdditionalInformationLabelText'),
    browse: t('tendersPage.newTender.tenderAdditionalInformationLink'),
  };

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
                  htmlFor="001"
                  label={t('tendersPage.newTender.tenderTitleLabel')}
                  cx={styles.inputLabel}
                >
                  <TextInput
                    id="001"
                    value={titleValue}
                    onValueChange={setTitleValue}
                    placeholder={t(
                      'tendersPage.newTender.tenderTitlePlaceholder',
                    )}
                  />
                </LabeledInput>

                <LabeledInput
                  htmlFor="009"
                  label={t('tendersPage.newTender.tenderDescriptionLabel')}
                  cx={styles.inputLabel}
                >
                  <TextArea
                    id="009"
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
                      htmlFor="001"
                      label={t(
                        'tendersPage.newTender.tenderValidityPeriodLabel',
                      )}
                      cx={styles.inputLabel}
                    >
                      <RangeDatePicker
                        value={rangeValue}
                        onValueChange={setRangeValue}
                        format="MMM D, YYYY"
                      />
                    </LabeledInput>
                  </FlexCell>

                  <FlexCell width="100%" grow={1}>
                    <LabeledInput
                      htmlFor="001"
                      label={t(
                        'tendersPage.newTender.tenderExpectedDeliveryLabel',
                      )}
                      sidenote={t(
                        'tendersPage.newTender.tenderExpectedDeliveryLabelSidenote',
                      )}
                      cx={styles.inputLabel}
                    >
                      <DatePicker
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
                      htmlFor="001"
                      label={t('tendersPage.newTender.tenderCategoryLabel')}
                      sidenote={t(
                        'tendersPage.newTender.tenderCategoryLabelSidenote',
                      )}
                      cx={styles.inputLabel}
                    >
                      <PickerInput
                        dataSource={dataSource}
                        value={categoryValue}
                        onValueChange={setCategoryValue}
                        getName={(item: categoryItemType) => item.label}
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
                  link={{ pathname: '/' }}
                  cx={styles.indicateLink}
                />
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
                <DropSpot
                  onUploadFiles={uploadFile}
                  infoText={t(
                    'tendersPage.newTender.tenderAdditionalInformationInfotext',
                  )}
                />

                {attachments.map((file, index) => (
                  <FileCard
                    key={index}
                    file={file}
                    onClick={() => deleteFile(file)}
                  />
                ))}
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
