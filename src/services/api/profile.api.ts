import { useUuiContext } from '@epam/uui-core';
import axios from 'axios';

export const STANDART_ATTR = ['given_name', 'family_name', 'picture', 'email'];
export const uploadImage = (username: string, file: File) => {
  const { uuiApi } = useUuiContext();
  return uuiApi
    .uploadFile(`${process.env.REACT_APP_BACKEND_URL}/uploadFile/pics/${username}`, file, {
      onProgress: () => null,
    });
};

export const getProfile = (username: string) => {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/users/${username}`,
  )
};

export const saveProfileData = (username: string, params: any) => {
  const idToken = localStorage.getItem('id_token');
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/users/${username}`,
    params,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  )
}

export const createProfilePayload = (data: any) => {
  const payload: any = [];
  const params = Object.keys(data);

  params.forEach(propertyName=> {
    const isCustom = STANDART_ATTR.includes(propertyName);
    const name = isCustom ? propertyName : `custom:${propertyName}`;
    const value = name === 'custom:show_email' ? Number(data[propertyName]) : data[propertyName];
    const attr = {
      name,
      value
    };
    payload.push(attr)
  })

  console.log(999, payload)
  return payload;
}

export const handleProfileInfoResponse = (res: any) => {
  const data = res.data.attributes;
  const pofileInf = data.reduce((acc: any, curr: any) => {
    const attr = {[curr.name]: curr.value}
    return Object.assign(acc, attr);
  }, {})

  return pofileInf;
}

export const addCustomPref = (data: any) => {
  const formatted: {[key: string]: string} = {};
  const params = Object.keys(data).filter(val=> data[val]);
  params.forEach(propertyName=> {
    const isCustom = STANDART_ATTR.includes(propertyName);
    const name = isCustom ? propertyName : `custom:${propertyName}`;
    formatted[name] = data[propertyName];
  })
  return formatted;
}


