import { Button, FlexCell, FlexRow, FlexSpacer, Panel, Text } from '@epam/uui';
import styles from './TendersPage.module.scss';
import EmptyFolderIcon from '../../images/emptyFolderIcon.svg';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const tendersListLength = 1;

export const TendersPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
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
          {tendersListLength >= 1 && (
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
        </FlexRow>
      </Panel>
    </Panel>
  );
};
