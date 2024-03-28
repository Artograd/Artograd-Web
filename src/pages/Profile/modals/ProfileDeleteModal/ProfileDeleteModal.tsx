import { IModal } from '@epam/uui-core';
import {
  Button,
  FlexCell,
  FlexRow,
  LabeledInput,
  ModalBlocker,
  ModalFooter,
  ModalHeader,
  ModalWindow,
  Panel,
  ScrollBars,
  Text,
  TextInput,
  useForm,
} from '@epam/uui';
import { FlexSpacer } from '@epam/uui-components';
import { useTranslation } from 'react-i18next';
import { userLogin } from '../../../../store/identitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { userApi } from '../../../../services/api/userAPI';

export function DeleteProfileModal(modalProps: IModal<{ delete: string }>) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );
  const { lens, save } = useForm<{ delete: string }>({
    value: { delete: '' },
    onSave: (confirm) => Promise.resolve({ form: confirm }),
    onSuccess: (res) => {
      userApi.delete(username).then(() => {
        dispatch(userLogin(false));
        modalProps.success(res);
      });
    },
    getMetadata: () => ({
      props: {
        delete: {
          validators: [(val) => [val !== t('Delete') && 'Incorrect value']],
        },
      },
    }),
  });

  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow>
        <Panel background="surface-main">
          <ModalHeader
            title={t('Delete Account') + '?'}
            borderBottom
            onClose={() => modalProps.abort()}
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <FlexRow padding="24">
              <Text>
                When you delete account, all created tenders and related
                proposals will be permanently removed. This action cannot be
                undone.
              </Text>
            </FlexRow>
            <FlexRow padding="24" vPadding="12">
              <FlexCell grow={1}>
                <LabeledInput
                  label="Type ‘Delete’ to confirm action"
                  {...lens.prop('delete').toProps()}
                >
                  <TextInput
                    placeholder="Delete"
                    {...lens.prop('delete').toProps()}
                  />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption={t('Cancel')}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="accent"
              caption={t('Delete Account')}
              onClick={save}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
