import styles from './ProfileOverview.module.scss';
import {
  Avatar,
  FlexCell,
  FlexRow,
  LinkButton,
  Panel,
  SuccessNotification,
  Text,
  WarningNotification,
} from '@epam/uui';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';
// import { ChangeAvatarModal } from '../../modals/Modal';
import { useUuiContext } from '@epam/uui-core';
import { ChangeAvatarModal } from '../../modals/Modal';

export const ProfileOverview = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const {
    avatarUrl,
    firstName,
    lastName,
    activeTenders,
    others,
    activeArtObjects,
    readyArtObjects,
    company,
  } = useSelector(
    (state: RootState) => state.profileOverview.profileOverview,
  );

  const { uuiModals, uuiNotifications } = useUuiContext();
  const modalHandler = () => {
    console.log(123);
    uuiModals
      .show<string>((props) => <ChangeAvatarModal {...props} />)
      .then((result) => {
        uuiNotifications
          .show((props) => (
            <SuccessNotification {...props}>
              <FlexRow alignItems="center">
                <Text>{result}</Text>
              </FlexRow>
            </SuccessNotification>
          ))
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
          });
      });
  };

  return (
    <Panel cx={styles.wrapper} shadow>
      <FlexRow>
        <Avatar
          cx={styles.avatar}
          img={avatarUrl}
          size={'90'}
          onClick={modalHandler}
        ></Avatar>
      </FlexRow>
      <FlexRow>
        <Text cx={styles.profileName}>
          {firstName} {lastName}
        </Text>
      </FlexRow>
      <FlexRow>
        <Text cx={styles.profileRole}>{company}</Text>
      </FlexRow>
      <FlexRow>
        <div className={styles.divider} />
      </FlexRow>
      <FlexRow padding="24">
        <Text cx={styles.overviewSectionName}>
          {t('profilePage.My Tenders')}
        </Text>
      </FlexRow>
      <FlexRow padding="24">
        <FlexCell grow={3}>
          <LinkButton
            onClick={() => history.push('/home')}
            caption={t('profilePage.Active tenders')}
          />
        </FlexCell>
        <FlexCell grow={1} textAlign={'right'}>
          <Text cx={styles.overviewSectionItemValue}>{activeTenders}</Text>
        </FlexCell>
      </FlexRow>
      <FlexRow padding="24">
        <FlexCell grow={3}>
          <LinkButton
            onClick={() => history.push('/home')}
            caption={t('profilePage.Others')}
          />
        </FlexCell>
        <FlexCell grow={1} textAlign={'right'}>
          <Text cx={styles.overviewSectionItemValue}>{others}</Text>
        </FlexCell>
      </FlexRow>
      <FlexRow padding="24">
        <Text cx={styles.overviewSectionName}>
          {t('profilePage.My Art Objects')}
        </Text>
      </FlexRow>
      <FlexRow padding="24">
        <FlexCell grow={3}>
          <LinkButton
            onClick={() => history.push('/home')}
            caption={t('profilePage.Active art objects')}
          />
        </FlexCell>
        <FlexCell grow={1} textAlign={'right'}>
          <Text cx={styles.overviewSectionItemValue}>{activeArtObjects}</Text>
        </FlexCell>
      </FlexRow>
      <FlexRow padding="24">
        <FlexCell grow={3}>
          <LinkButton
            cx={styles.overviewSectionItem}
            onClick={() => history.push('/home')}
            caption={t('profilePage.Ready art objects')}
          />
        </FlexCell>
        <FlexCell grow={1} textAlign={'right'}>
          <Text cx={styles.overviewSectionItemValue}>{readyArtObjects}</Text>
        </FlexCell>
      </FlexRow>
    </Panel>
  );
};
