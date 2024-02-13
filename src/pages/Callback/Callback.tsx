import { Panel, Text } from '@epam/uui';
import { useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { saveUserData, userLogin } from '../../store/identitySlice';
import { useQuery } from '../../utils/useQuery';

const grantType = 'authorization_code';
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
};

const cognitoLoginUrl = `${
  process.env.REACT_APP_LOGIN_URL
}&redirect_uri=${encodeURIComponent(
  window.location.origin + process.env.REACT_APP_REDIRECT_PAGE ?? '',
)}`;

export const CallbackPage = () => {
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  fetch(
    `${
      process.env.REACT_APP_COGNITO_URL
    }/oauth2/token?grant_type=${grantType}&client_id=${
      process.env.REACT_APP_CLIENT_ID
    }&redirect_uri=${
      window.location.origin + process.env.REACT_APP_REDIRECT_PAGE
    }&code=${query.get('code')}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.id_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('id_token', data.id_token);

        const decoded = jwtDecode(data.id_token);
        dispatch(saveUserData(decoded));
        dispatch(userLogin(true));
      }
    })
    .catch(() => window.location.replace(cognitoLoginUrl))
    .finally(() => history.push('/'));

  return (
    <Panel>
      <Text>Redirecting...</Text>
    </Panel>
  );
};
