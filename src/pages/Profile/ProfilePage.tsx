// import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FlexCell, FlexRow, Panel, Text } from '@epam/uui';
import styles from './ProfilePage.module.scss';
import { ProfileOverview } from './components/ProfileOverview/ProfileOverview';
import { ProfileDelete } from './components/ProfileDelete/ProfileDelete';
import { ProfileInformation } from './components/ProfileInformation/ProfileInformation';
import { ProfileFundraising } from './components/ProfileFundraising/ProfileFundraising';

export const ProfilePage = () => {
  // const history = useHistory();
  const { t } = useTranslation();
  return (
    <Panel cx={styles.wrapper}>
      <FlexRow padding="12">
        <Text cx={styles.profileHeader}>{t('profilePage.My Profile')}</Text>
      </FlexRow>
      <FlexRow padding="12" alignItems={'top'}>
        <FlexCell grow={1} cx={styles.cell}>
          <ProfileOverview></ProfileOverview>
        </FlexCell>
        <FlexCell alignSelf={'flex-start'} grow={3} cx={styles.cell}>
          <FlexRow>
            <ProfileInformation></ProfileInformation>
          </FlexRow>
          <FlexRow>
            <ProfileFundraising></ProfileFundraising>
          </FlexRow>
          <FlexRow>
            <ProfileDelete></ProfileDelete>
          </FlexRow>
        </FlexCell>
      </FlexRow>
    </Panel>
  );
};
