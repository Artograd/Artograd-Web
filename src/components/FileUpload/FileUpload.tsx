import {
  DropSpot,
  FileCard,
  FileCardItem,
  i18n,
  Text,
  ErrorAlert,
} from '@epam/uui';
import { useUuiContext } from '@epam/uui-core';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { isPageLoading } from '../../store/helpersSlice';

let tempIdCount = 0;
const fileSizeLimit = 1024 * 1024 * 1;
const fileAmountLimit = 10;
const idToken = localStorage.getItem('id_token');

export const FileUpload = ({
  attachments,
  filesDirectoryId,
  setAttachments,
}: {
  attachments: FileCardItem[];
  filesDirectoryId: string;
  setAttachments: Dispatch<SetStateAction<FileCardItem[]>>;
}) => {
  const { t } = useTranslation();
  const { uuiApi } = useUuiContext();
  const dispatch = useDispatch();
  const [isFileLimitReached, setIsFileLimitReached] = useState(false);
  const [isFileSizeLimitReached, setIsFileSizeLimitReached] = useState(false);

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
    setIsFileLimitReached(false);
    setAttachments((deleteAttachments) =>
      deleteAttachments.filter((item) => item.id !== file.id),
    );
  };

  const uploadFile = (files: File[]) => {
    setIsFileLimitReached(false);
    setIsFileSizeLimitReached(false);
    if (
      files.length <= fileAmountLimit &&
      attachments.length <= fileAmountLimit - 1
    ) {
      dispatch(isPageLoading(true));
      const newAttachments = [...attachments];
      files.map((file: File) => {
        if (file.size <= fileSizeLimit) {
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
            .uploadFile(
              `${process.env.REACT_APP_BACKEND_URL}/uploadFile/${filesDirectoryId}/docs`,
              file,
              {
                onProgress: (progress) => trackProgress(progress, tempId),
                getXHR: (xhr) => {
                  xhr.setRequestHeader('Authorization', `Bearer ${idToken}`);
                  xhr.withCredentials = false;
                  newFile.abortXHR = () => xhr.abort();
                },
              },
            )
            .then((res) => updateFile({ ...res, progress: 100 }, tempId))
            .catch((err) => {
              updateFile(
                { ...newFile, progress: 100, error: err.error },
                tempId,
              );
              dispatch(isPageLoading(false));
            })
            .finally(() => dispatch(isPageLoading(false)));
        } else {
          setIsFileSizeLimitReached(true);
          dispatch(isPageLoading(false));
        }
      });
      setAttachments(newAttachments);
    } else {
      dispatch(isPageLoading(false));
      setIsFileLimitReached(true);
    }
  };

  i18n.fileUpload = {
    ...i18n.fileUpload,
    labelStart: t(
      'tendersPages.newTender.tenderAdditionalInformationLabelText',
    ),
    browse: t('tendersPages.newTender.tenderAdditionalInformationLink'),
  };

  i18n.fileCard = {
    ...i18n.fileCard,
    failedUploadErrorMessage: t('global.fileUpload.uploadFailed'),
  };

  return (
    <>
      <DropSpot
        onUploadFiles={uploadFile}
        infoText={t(
          'tendersPages.newTender.tenderAdditionalInformationInfotext',
          { fileSizeLimit: fileSizeLimit / 1024 / 1024, fileAmountLimit },
        )}
      />

      {attachments.map((file, index) => (
        <FileCard key={index} file={file} onClick={() => deleteFile(file)} />
      ))}
      {isFileLimitReached && (
        <ErrorAlert>
          <Text size="30">{t('global.fileUpload.fileLimitErrorText')}</Text>
        </ErrorAlert>
      )}
      {isFileSizeLimitReached && (
        <ErrorAlert>
          <Text size="30">{t('global.fileUpload.fileSizeLimitErrorText')}</Text>
        </ErrorAlert>
      )}
    </>
  );
};
