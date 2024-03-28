export const STANDART_ATTR = ['given_name', 'family_name', 'picture', 'email'];
enum checkboxes {
  email = 'custom:show_email',
  bankByDefault = 'custom:useBankDataByDefault',
}

export const createProfilePayload = (data: any) => {
  const payload: any = [];
  const params = Object.keys(data);

  params.forEach((propertyName) => {
    const isCustom = STANDART_ATTR.includes(propertyName);
    const name = isCustom ? propertyName : `custom:${propertyName}`;
    const value =
      name === checkboxes.email || name === checkboxes.bankByDefault
        ? Number(data[propertyName])
        : data[propertyName];

    if (propertyName === 'socialMedia') {
      value.forEach((item: any) => {
        payload.push({ name: item.id, value: item.url });
      });
    } else {
      payload.push({
        name,
        value,
      });
    }
  });
  console.log(999, payload);
  return payload;
};

export const handleProfileInfoResponse = (res: any) => {
  const data = res.data.attributes;
  const pofileInf = data.reduce((acc: any, curr: any) => {
    const attr = { [curr.name]: curr.value };
    return Object.assign(acc, attr);
  }, {});

  return pofileInf;
};

export const addCustomPreffix = (data: any) => {
  const formatted: { [key: string]: string } = {};
  const params = Object.keys(data).filter((val) => data[val]);
  params.forEach((propertyName) => {
    const isCustom = STANDART_ATTR.includes(propertyName);
    const name = isCustom ? propertyName : `custom:${propertyName}`;
    formatted[name] = data[propertyName];
  });
  return formatted;
};
