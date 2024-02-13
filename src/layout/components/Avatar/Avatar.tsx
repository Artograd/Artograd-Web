import {
  DropdownMenuBody,
  DropdownMenuButton,
  MainMenuAvatar,
  DropdownMenuSplitter,
  DropdownMenuHeader,
  Dropdown,
} from '@epam/uui';
import { ReactComponent as ProfileIcon } from '@epam/assets/icons/common/social-person-18.svg';
import { ReactComponent as SettingsIcon } from '@epam/assets/icons/common/action-settings-18.svg';
import { ReactComponent as BellIcon } from '@epam/assets/icons/common/bell-18.svg';
import { ReactComponent as LogoutIcon } from '@epam/assets/icons/common/navigation-logout-18.svg';
import { identityState, saveUserData } from '../../../store/identitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useHistory } from 'react-router-dom';
import styles from './Avatar.module.scss';
import { useTranslation } from 'react-i18next';

export const Avatar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { family_name, name, email } = useSelector(
    (state: RootState) => state.identity,
  );
  const logOut = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    // clear identity state to the initial
    dispatch(saveUserData(identityState));
    // revoke cognito token and clear tokens from localStorage
    await fetch(
      `${process.env.REACT_APP_COGNITO_URL}/oauth2/revoke?token=${refreshToken}&client_id=${process.env.REACT_APP_CLIENT_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
      .then(() => {
        localStorage.removeItem('id_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
      })
      .finally(() => history.push('/'));
  };

  return (
    <Dropdown
      key="avatar"
      renderTarget={(props) => (
        <MainMenuAvatar
          avatarUrl="https://api.dicebear.com/7.x/pixel-art/svg?seed=Coco&radius=50&backgroundColor=b6e3f4"
          isDropdown
          {...props}
        />
      )}
      renderBody={(props) => (
        <DropdownMenuBody {...props} cx={styles.userMenu}>
          <DropdownMenuHeader
            caption={`${name} ${family_name}`}
            cx={styles.name}
          />
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
  );
};
