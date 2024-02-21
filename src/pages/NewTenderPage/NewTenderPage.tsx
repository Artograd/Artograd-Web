import {
  Alert,
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
} from '@epam/uui';
import styles from './NewTenderPage.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  RangeDatePickerValue,
  useArrayDataSource,
  useUuiContext,
} from '@epam/uui-core';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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

export const NewTenderPage = () => {
  const { t } = useTranslation();
  const { uuiApi } = useUuiContext();
  const { family_name, given_name, email } = useSelector(
    (state: RootState) => state.identity,
  );
  const todayDate = dayjs().format('YYYY-MM-DD');
  //   STATES
  const [attachments, setAttachments] = useState<FileCardItem[]>([]);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [titleValue, setTitleValue] = useState<string | undefined>('');
  const [date, setDate] = useState<string | null>(todayDate);
  const [rangeValue, setRangeValue] = useState<RangeDatePickerValue>({
    from: todayDate,
    to: todayDate,
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
  return (
    <Panel cx={styles.wrapper}>
      <Text cx={styles.pageTitle}>{t('tendersPage.newTender.pageTitle')}</Text>
      <Panel cx={styles.contentWrapper}>
        <FlexRow>
          <FlexCell cx={styles.contentBody} width="100%">
            <FlexRow>
              <FlexCell width="100%">
                <Text cx={styles.sectionHeadline}>
                  Primary Tender Information
                </Text>

                <LabeledInput htmlFor="001" label="Tender Title">
                  <TextInput
                    id="001"
                    value={titleValue}
                    onValueChange={setTitleValue}
                    placeholder="Enter a text"
                  />
                </LabeledInput>

                <LabeledInput htmlFor="009" label="Tender Description">
                  <TextArea
                    id="009"
                    value={descriptionValue}
                    onValueChange={setDescriptionValue}
                    placeholder="Type a text"
                  />
                </LabeledInput>
              </FlexCell>
            </FlexRow>

            <FlexRow>
              <FlexCell width="100%">
                <Text cx={styles.sectionHeadline}>Tender Details</Text>
                <FlexRow>
                  <FlexCell width="auto" grow={1}>
                    <LabeledInput htmlFor="001" label="Tender Validity Period">
                      <RangeDatePicker
                        value={rangeValue}
                        onValueChange={setRangeValue}
                        format="MMM D, YYYY"
                      />
                    </LabeledInput>
                  </FlexCell>

                  <FlexCell width="auto" grow={1}>
                    <LabeledInput
                      htmlFor="001"
                      label="Expected Delivery"
                      isOptional
                    >
                      <DatePicker
                        value={date}
                        onValueChange={setDate}
                        format="MMM D, YYYY"
                      />
                    </LabeledInput>
                  </FlexCell>
                </FlexRow>

                <FlexRow>
                  <FlexCell width="auto" grow={1}>
                    <LabeledInput htmlFor="001" label="Category" isOptional>
                      <PickerInput
                        dataSource={dataSource}
                        value={categoryValue}
                        onValueChange={setCategoryValue}
                        getName={(item: categoryItemType) => item.label}
                        entityName="category"
                        selectionMode="multi"
                        valueType="id"
                        sorting={{ field: 'label', direction: 'asc' }}
                      />
                    </LabeledInput>
                  </FlexCell>
                  <FlexCell grow={1} />
                </FlexRow>
              </FlexCell>
            </FlexRow>

            <FlexRow>
              <FlexCell width="100%">
                <Text cx={styles.sectionHeadline}>Art Object Location</Text>
                <LinkButton
                  caption="Indicate location"
                  link={{ pathname: '/' }}
                />
              </FlexCell>
            </FlexRow>

            <FlexRow>
              <FlexCell width="100%">
                <Text cx={styles.sectionHeadline}>
                  Tender Owner Contact Information
                </Text>
                <Text>Contact person {`${given_name} ${family_name}`}</Text>
                <Text>Organisation Regional Culture Center</Text>
                <Text>Email {email}</Text>
                <Alert color="warning">
                  <Checkbox
                    label="Show my email as means of contact in the tender description."
                    value={checkBoxValue}
                    onValueChange={setCheckBoxValue}
                  />
                </Alert>
              </FlexCell>
            </FlexRow>

            <FlexRow>
              <FlexCell width="100%">
                <Text cx={styles.sectionHeadline}>Additional Information</Text>
                <DropSpot
                  onUploadFiles={uploadFile}
                  infoText="Up to 10 files. Limit for 1 file is 50 Mb"
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
      </Panel>
    </Panel>
  );
};
