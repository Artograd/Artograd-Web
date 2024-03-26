import { useUuiContext } from '@epam/uui-core';
import axios from 'axios';

export const uploadImage = (url: string, file: File) => {
  const { uuiApi } = useUuiContext();
  return uuiApi
    .uploadFile(url, file, {
      onProgress: () => null,
    });
};

export const getProfile = (username: string) => {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/users/${username}`,
  )
};

export const saveProfileData = (username: string) => {
  const idToken = localStorage.getItem('id_token');
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/users/${username}`,
    [
      {
        'name': 'given_name',
        'value': 'AlexTest',
      }, {
      'name': 'family_name',
      'value': 'Family',
      },
    ],
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  )
}

export const handleProfileInfoResponse = (res: any) => {
  const data = res.data.attributes;
  const pofileInf = data.reduce((acc: any, curr: any) => {
    const attr = {[curr.name]: curr.value}
    return Object.assign(acc, attr);
  }, {})

  return pofileInf;
}


