import styles from './ChangeProfileImageModal.module.scss'
import {
  Button,
  FlexRow,
  ModalBlocker,
  ModalFooter,
  ModalHeader,
  ModalWindow,
  Panel,
  ScrollBars,
  Text,
  FlexCell,
  Avatar,
} from '@epam/uui';
import { IModal } from '@epam/uui-core';
import { FlexSpacer } from '@epam/uui-components';
import { useTranslation } from 'react-i18next';
import { useState, createRef } from 'react';
// import { useUuiContext } from '@epam/uui-core';


export function ChangeProfileImageModal(modalProps: IModal<string>) {
  console.log(modalProps, 333);
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState<string>('');
  // const { uuiApi } = useUuiContext();

  const uploadFile = (e: any) => {
    const files = e.currentTarget.files;
    console.log(999, files[0]);

    // files.map((file: File) => {
    //   uuiApi
    //     .uploadFile(ORIGIN.concat('/upload/uploadFileMock'), file, {
    //       onProgress: (progress) => null,
    //     })
    //     .then((res) => console.log('error', res))
    //     .catch((err) => console.log('error', err));
    // });
  };

  const inputRef = createRef<HTMLInputElement>();

  const onClick = () => {
    inputRef.current?.click();
  };

  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow cx={styles.modalWrapper}>
        <Panel background="surface-main">
          <ModalHeader
            title={t('profilePage.Change Profile Image')}
            onClose={() => modalProps.abort()}
            borderBottom
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <FlexRow vPadding="24" padding="12">
              <FlexCell  width="auto" grow={1}>
                <Text>
                  Upload an image as you would like to represent you identity and appear in your Artograd profile
                </Text>
                <FlexRow>
                  <FlexCell grow={1}>
                    <Avatar cx={styles.avatar} alt="avatar" img={ imgUrl } size="90" />
                  </FlexCell>
                  <FlexCell grow={3}>
                    <FlexRow>
                      <Button cx={styles.buttonWrapper} fill="none" color="primary"
                              caption={t('profilePage.Change Photo')} onClick={onClick} />
                      <input type="file" className={styles.inputImg} ref={inputRef} onChange={uploadFile}
                             accept="image/png, image/jpeg, image/svg" />

                      <Button fill="none" color="secondary" caption={t('profilePage.Remove Photo')}
                              onClick={() => setImgUrl('')} />
                    </FlexRow>
                  </FlexCell>
                </FlexRow>
                <Text>
                  Supported formats JPG, GIF, or PNG. Maximum size 1 MB.
                </Text>
              </FlexCell>
            </FlexRow>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption={t('profilePage.Cancel')}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="accent"
              caption={t('profilePage.Change')}
              onClick={() => modalProps.success('Success action')}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
