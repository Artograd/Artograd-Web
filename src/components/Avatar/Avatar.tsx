import {
  DropdownMenuBody,
  DropdownMenuButton,
  MainMenuAvatar,
  DropdownMenuSplitter,
  DropdownMenuHeader,
  Dropdown,
  Panel,
} from '@epam/uui';
import { ReactComponent as ProfileIcon } from '@epam/assets/icons/common/social-person-18.svg';
import { ReactComponent as SettingsIcon } from '@epam/assets/icons/common/action-settings-18.svg';
import { ReactComponent as BellIcon } from '@epam/assets/icons/common/bell-18.svg';
import { ReactComponent as LogoutIcon } from '@epam/assets/icons/common/navigation-logout-18.svg';
import {
  initialState as initialIdentityState,
  saveUserData,
} from '../../store/identitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useHistory } from 'react-router-dom';
import styles from './Avatar.module.scss';
import { useTranslation } from 'react-i18next';

export const Avatar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { family_name, given_name, email, picture } = useSelector(
    (state: RootState) => state.identity.userData,
  );
  const logOut = async () => {
    // clear identity state to the initial
    dispatch(saveUserData(initialIdentityState));
    // revoke cognito token and clear tokens from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    // redirect to the cognito logout page
    window.location.replace(
      `${process.env.REACT_APP_LOGOUT_URL}&logout_uri=${encodeURIComponent(
        window.location.origin ?? '',
      )}`,
    );
  };

  return (
    <Panel rawProps={{ 'data-testid': `user-avatar` }}>
      <Dropdown
        key="avatar"
        renderTarget={(props) => (
          <MainMenuAvatar avatarUrl={picture} isDropdown {...props} />
        )}
        renderBody={(props) => (
          <DropdownMenuBody {...props} cx={styles.userMenu}>
            {given_name && family_name && (
              <DropdownMenuHeader
                caption={`${given_name} ${family_name}`}
                cx={styles.name}
              />
            )}
            <DropdownMenuHeader caption={email} cx={styles.email} />
            <DropdownMenuSplitter />
            <DropdownMenuButton
              caption={t('global.layout.header.profile')}
              cx={styles.userMenuItem}
              icon={ProfileIcon}
              onClick={() => history.push('/profile')}
            />
            <DropdownMenuButton
              caption={t('global.layout.header.settings')}
              cx={styles.userMenuItem}
              icon={SettingsIcon}
              onClick={() => history.push('/settings')}
            />
            <DropdownMenuButton
              caption={t('global.layout.header.notifications')}
              cx={styles.userMenuItem}
              icon={BellIcon}
              onClick={() => history.push('/notifications')}
            />
            <DropdownMenuSplitter />
            <DropdownMenuButton
              caption={t('global.layout.header.logOut')}
              cx={styles.userMenuItem}
              icon={LogoutIcon}
              onClick={() => logOut()}
            />
          </DropdownMenuBody>
        )}
        placement="bottom-end"
      />
    </Panel>
  );
};
