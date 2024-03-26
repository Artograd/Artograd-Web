import { Panel, Text } from '@epam/uui';
import { useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { saveUserData, userLogin, UserData } from '../../store/identitySlice';
import { useQuery } from '../../utils/useQuery';
import { getProfile, handleProfileInfoResponse } from '../../services/api/profile.api'
import { updateProfileInformation } from '../../store/slices/profileInformationSlice';


const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
};

export const CallbackPage = () => {
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  // TODO: REPLACE WITH AXIOS
  fetch(
    `${process.env.REACT_APP_TOKEN_URL}&redirect_uri=${
      window.location.origin + process.env.REACT_APP_REDIRECT_PAGE
    }&code=${query.get('code')}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.id_token) {
        const decoded: UserData = jwtDecode(data.id_token);
        console.log(111, decoded);
        dispatch(saveUserData(decoded));
        dispatch(userLogin(true));
        console.log(data);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('id_token', data.id_token);
        localStorage.setItem('expires_in', data.expires_in);

        //TODO probably need to move into middleware. RxJS combineLatest?
        getProfile(decoded['cognito:username']).then((res: any) => {
          dispatch(updateProfileInformation(handleProfileInfoResponse(res)));
        });;
      }
    })
    .catch(() => history.push('/error'))
    .finally(() => history.push('/'));

  return (
    <Panel>
      <Text>Redirecting...</Text>
    </Panel>
  );
};
