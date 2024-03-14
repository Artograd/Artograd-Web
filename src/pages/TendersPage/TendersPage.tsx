import { Button, FlexCell, FlexRow, FlexSpacer, Panel, Text } from '@epam/uui';
import styles from './TendersPage.module.scss';
import EmptyFolderIcon from '../../images/emptyFolderIcon.svg';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const tendersListLength = 1;

export const TendersPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const userRoles = useSelector(
    (state: RootState) => state?.identity?.['cognito:groups'],
  );
  const isOfficer = userRoles?.includes('Officials');

  return (
    <Panel cx={styles.wrapper}>
      <FlexRow>
        <FlexCell width="100%">
          <Text cx={styles.pageTitle}>
            {t('tendersPage.tenders.pageTitle')}
          </Text>
        </FlexCell>
        <FlexSpacer />
        <FlexCell width="100%">
          {tendersListLength >= tendersListLength && isOfficer && (
            <Button
              color="accent"
              caption={t('tendersPage.tenders.tendersCta')}
              onClick={() => history.push('/tenders/new')}
              rawProps={{ 'data-testid': `header-create-new-tender-cta` }}
              cx={styles.headerTendersCta}
            />
          )}
        </FlexCell>
      </FlexRow>
      <Panel cx={styles.contentWrapper}>
        <FlexRow>
          {isOfficer && (
            <FlexCell cx={styles.tenders} width="100%" textAlign="center">
              <img className={styles.emptyFolderIcon} src={EmptyFolderIcon} />
              <Text cx={styles.tendersTitle}>
                {t('tendersPage.tenders.tendersTitle')}
              </Text>
              <Text cx={styles.tendersDescription}>
                {t('tendersPage.tenders.tendersDescription')}
              </Text>

              <Button
                color="accent"
                caption={t('tendersPage.tenders.tendersCta')}
                onClick={() => history.push('/tenders/new')}
                rawProps={{ 'data-testid': `content-create-new-tender-cta` }}
              />
            </FlexCell>
          )}
        </FlexRow>
      </Panel>
    </Panel>
  );
};
