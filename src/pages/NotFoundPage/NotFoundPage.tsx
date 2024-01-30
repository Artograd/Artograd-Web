import { Panel, Text, Button } from '@epam/uui';
import styles from './NotFoundPage.module.scss';
import ErrorIcon from './assets/error.svg';
import { useHistory } from 'react-router-dom';

export const ErrorPage = () => {
  const history = useHistory();
  return (
    <Panel cx={styles.wrapper}>
      <img src={ErrorIcon} />
      <Text>Page not found!</Text>
      <Button
        color="accent"
        caption="Return to homepage"
        onClick={() => history.push('/')}
      />
    </Panel>
  );
};
