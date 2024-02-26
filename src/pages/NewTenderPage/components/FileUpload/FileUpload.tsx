import { DropSpot, FileCard, FileCardItem, i18n } from '@epam/uui';
import { useUuiContext } from '@epam/uui-core';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

const ORIGIN = process.env.REACT_APP_PUBLIC_URL || '';

let tempIdCount = 0;

export const FileUpload = ({
  attachments,
  setAttachments,
}: {
  attachments: FileCardItem[];
  setAttachments: Dispatch<SetStateAction<FileCardItem[]>>;
}) => {
  const { t } = useTranslation();
  const { uuiApi } = useUuiContext();

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

  i18n.fileUpload = {
    ...i18n.fileUpload,
    labelStart: t('tendersPage.newTender.tenderAdditionalInformationLabelText'),
    browse: t('tendersPage.newTender.tenderAdditionalInformationLink'),
  };

  return (
    <>
      <DropSpot
        onUploadFiles={uploadFile}
        infoText={t(
          'tendersPage.newTender.tenderAdditionalInformationInfotext',
        )}
      />

      {attachments.map((file, index) => (
        <FileCard key={index} file={file} onClick={() => deleteFile(file)} />
      ))}
    </>
  );
};