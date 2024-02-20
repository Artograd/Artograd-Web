import { Button, FlexCell, FlexRow, Panel, Text } from '@epam/uui';
import styles from './TendersPage.module.scss';
import EmptyFolderIcon from '../../images/emptyFolderIcon.svg';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const TendersPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <Panel cx={styles.wrapper}>
      <Text cx={styles.pageTitle}>{t('tendersPage.pageTitle')}</Text>
      <Panel cx={styles.contentWrapper}>
        <FlexRow>
          <FlexCell cx={styles.emptyContent} width="100%" textAlign="center">
            <img className={styles.emptyFolderIcon} src={EmptyFolderIcon} />
            <Text cx={styles.emptyContentTitle}>
              {t('tendersPage.emptyContent.emptyContentTitle')}
            </Text>
            <Text cx={styles.emptyContentDescription}>
              {t('tendersPage.emptyContent.emptyContentDescription')}
            </Text>
            <Button
              color="accent"
              caption={t('tendersPage.emptyContent.emptyContentCta')}
              onClick={() => history.push('/')}
              rawProps={{ 'data-testid': `not-found-cta` }}
            />
          </FlexCell>
        </FlexRow>
      </Panel>
    </Panel>
  );
};
