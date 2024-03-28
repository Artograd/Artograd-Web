import styles from './ChangeProfileImageModal.module.scss';
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
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useUuiContext } from '@epam/uui-core';

const fileSizeLimit = 1024 * 1024 * 1;

export function ChangeProfileImageModal({
  modalProps,
  picture,
}: {
  modalProps: IModal<string>;
  picture: string;
}) {
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState<string>(picture);
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );
  const { uuiApi } = useUuiContext();

  const uploadFile = (e: any) => {
    const idToken = localStorage.getItem('id_token');
    const file = e.currentTarget.files[0];
    if (file.size <= fileSizeLimit) {
      uuiApi
        .uploadFile(
          `${process.env.REACT_APP_BACKEND_URL}/uploadFile/pics/${username}`,
          file,
          {
            onProgress: () => null,
            getXHR: (xhr) => {
              xhr.setRequestHeader('Authorization', `Bearer ${idToken}`);
              xhr.withCredentials = false;
            },
          },
        )
        .then((res) => {
          setImgUrl(res.path || '');
        });
    }
  };

  const inputRef = createRef<HTMLInputElement>();
  const onClick = () => inputRef.current?.click();

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
            <FlexRow vPadding="24" padding="24">
              <FlexCell width="auto" grow={1}>
                <Text>
                  Upload an image as you would like to represent you identity
                  and appear in your Artograd profile
                </Text>
                <FlexRow>
                  <FlexCell grow={1}>
                    <Avatar
                      cx={styles.avatar}
                      alt="avatar"
                      img={imgUrl}
                      size="90"
                    />
                  </FlexCell>
                  <FlexCell grow={3}>
                    <FlexRow>
                      <Button
                        cx={styles.buttonWrapper}
                        fill="none"
                        color="primary"
                        caption={t('profilePage.Change Photo')}
                        onClick={onClick}
                      />
                      <input
                        type="file"
                        className={styles.inputImg}
                        ref={inputRef}
                        onChange={uploadFile}
                        accept="image/png, image/jpeg, image/svg"
                      />

                      <Button
                        fill="none"
                        color="secondary"
                        caption={t('profilePage.Remove Photo')}
                        onClick={() => setImgUrl('')}
                      />
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
              onClick={() => modalProps.success(imgUrl)}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
