import styles from './ProfileOverview.module.scss';
import { Avatar, FlexCell, FlexRow, LinkButton, Panel, Text } from '@epam/uui';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { useUuiContext } from '@epam/uui-core';
import { ChangeProfileImageModal } from '../../modals/ChangeProfileImageModal/ChangeProfileImageModal';
import { createProfilePayload } from '../../../../services/helpers/profileHelper';
import { userApi } from '../../../../services/api/userAPI';
import { profileAvatarChanged } from '../../../../store/slices/profileInformationSlice';

export const ProfileOverview = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const {
    picture,
    given_name,
    family_name,
    activeTenders,
    others,
    activeArtObjects,
    readyArtObjects,
  } = useSelector(
    (state: RootState) => state.profileInformation.profileInformation,
  );
  const organization = useSelector(
    (state: RootState) =>
      state.profileInformation.profileInformation['custom:organization'],
  );
  const username = useSelector(
    (state: RootState) => state.identity.userData['cognito:username'],
  );
  const { uuiModals } = useUuiContext();
  const dispatch = useDispatch();

  const modalHandler = () => {
    uuiModals
      .show<string>((props) => (
        <ChangeProfileImageModal modalProps={props} picture={picture} />
      ))
      .then((picture) => {
        userApi
          .put(username, createProfilePayload({ picture: picture || '' }))
          .then(() => {
            dispatch(profileAvatarChanged({ picture: picture || '' }));
          });
      })
      .catch(() => null);
  };

  return (
    <Panel cx={styles.wrapper} shadow>
      <FlexRow justifyContent={'center'}>
        <Avatar img={picture} size={'90'} onClick={modalHandler}></Avatar>
      </FlexRow>
      <FlexRow>
        <Text cx={styles.profileName}>
          {given_name} {family_name}
        </Text>
      </FlexRow>
      <FlexRow>
        <Text cx={styles.profileRole}>{organization}</Text>
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
            rawProps={{ 'data-testid': `others-id` }}
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
