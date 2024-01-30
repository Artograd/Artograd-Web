import { Panel, Text, Button } from '@epam/uui';
import styles from './NotFoundPage.module.scss';
import ErrorIcon from './assets/error.svg';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ErrorPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <Panel cx={styles.wrapper}>
      <img src={ErrorIcon} />
      <Text>{t('notFoundPage.title')}</Text>
      <Button
        color="accent"
        caption={t('notFoundPage.cta')}
        onClick={() => history.push('/')}
      />
    </Panel>
  );
};
