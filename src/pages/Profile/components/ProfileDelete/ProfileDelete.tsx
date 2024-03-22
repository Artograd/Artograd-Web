import {
  Button,
  FlexRow,
  Panel,
  SuccessNotification,
  Text,
  WarningAlert,
  WarningNotification,
} from '@epam/uui';
import styles from './ProfileDelete.module.scss';
import { useTranslation } from 'react-i18next';
import { ReactComponent as l } from '@epam/assets/icons/common/action-deleteforever-18.svg';
import { DeleteProfileModal } from '../../modals/ProfileDeleteModal/ProfileDeleteModal';
import { useUuiContext } from '@epam/uui-core';

export const ProfileDelete = () => {
  const { t } = useTranslation();
  const { uuiModals, uuiNotifications } = useUuiContext();
  const deleteModal = () => {
    uuiModals
      .show((props) => <DeleteProfileModal {...props} />)
      .then(() => {
        uuiNotifications
          .show((props) => (
            <SuccessNotification {...props}>
              <FlexRow alignItems="center">
                <Text>{'result'}</Text>
              </FlexRow>
            </SuccessNotification>
          ))
          .catch(() => {
            uuiNotifications
              .show((props) => {
                return (
                  <WarningNotification {...props}>
                    <FlexRow alignItems="center">
                      <Text>Close action</Text>
                    </FlexRow>
                  </WarningNotification>
                );
              })
              .catch(() => null);
          });
      });
  };

  return (
    <Panel cx={styles.wrapper} shadow>
      <Text fontSize={'18'} fontWeight={'600'}>
        {t('Delete account')}
      </Text>
      <WarningAlert>
        <Text fontSize={'12'}>
          {' '}
          If you delete account, your personal information and all your activity
          will be eliminated from the servers. This action cannot be undone.{' '}
        </Text>
      </WarningAlert>
      <FlexRow vPadding="24">
        <Button
          fill="outline"
          color="critical"
          icon={l}
          caption={t('Delete account')}
          onClick={deleteModal}
        />
      </FlexRow>
    </Panel>
  );
};
