import {
  Button,
  FlexCell,
  FlexRow,
  LabeledInput,
  ModalBlocker,
  ModalFooter,
  ModalHeader,
  ModalWindow,
  Panel,
  PickerInput,
  ScrollBars,
  TextArea,
  TextInput,
} from '@epam/uui';
import styles from './LocationSelectorModal.module.scss';

import { Dispatch, SetStateAction, useState } from 'react';
import { IModal, useArrayDataSource } from '@epam/uui-core';
import 'dayjs/locale/ru';
import { FlexSpacer } from '@epam/uui-components';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import citiesDB from './cities.json';
import { pickerItemType } from '../../../../types';
import { MapCordsController } from '../MapCordsController/MapCordsController';
import { useTranslation } from 'react-i18next';

const cityList: pickerItemType[] = citiesDB;
const addressList: pickerItemType[] = [{ id: 1, name: 'Mediteranska, 8525' }];

export function LocationSelectorModal({
  modalProps,
  commentsValue,
  cityValue,
  addressValue,
  cordsValue,
  setCommentsValue,
  setCityValue,
  setAddressValue,
  setCordsValue,
}: {
  modalProps: IModal<string>;
  commentsValue: string;
  cityValue?: pickerItemType;
  addressValue?: pickerItemType;
  cordsValue: LatLngExpression;
  setCommentsValue: Dispatch<SetStateAction<string>>;
  setCityValue: Dispatch<SetStateAction<pickerItemType | undefined>>;
  setAddressValue: Dispatch<SetStateAction<pickerItemType | undefined>>;
  setCordsValue: Dispatch<SetStateAction<LatLngExpression>>;
}) {
  const { t } = useTranslation();
  const [commentsModalValue, setCommentsModalValue] = useState(commentsValue);
  const [cordsModalValue] = useState(cordsValue);
  const [cityModalValue, setCityModalValue] = useState<
    pickerItemType | undefined
  >(cityValue);
  const [addressModalValue, setAddressModalValue] = useState<
    pickerItemType | undefined
  >(addressValue);
  const cityDataSource = useArrayDataSource(
    {
      items: cityList,
    },
    [],
  );

  const addressDataSource = useArrayDataSource(
    {
      items: addressList,
    },
    [],
  );

  const saveValues = () => {
    setCommentsValue(commentsModalValue);
    setCityValue(cityModalValue);
    setAddressValue(addressModalValue);
    setCordsValue(cordsModalValue);
    modalProps.success('Success action');
  };

  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow width={753}>
        <Panel background="surface-main">
          <ModalHeader
            title={t('tendersPage.newTender.tenderLocationModal.modalTitle')}
            onClose={() => modalProps.abort()}
            borderBottom
          />
          <ScrollBars hasTopShadow hasBottomShadow>
            <Panel margin="24">
              <FlexRow alignItems="top">
                <FlexCell width="100%">
                  <LabeledInput
                    htmlFor="countryInput"
                    label={t(
                      'tendersPage.newTender.tenderLocationModal.countryInputLabel',
                    )}
                    cx={styles.modalInputLabel}
                  >
                    <TextInput
                      id="countryInput"
                      value={process.env.REACT_APP_LOCATION}
                      onValueChange={(e) => e}
                      placeholder="Please type text"
                      isDisabled
                    />
                  </LabeledInput>
                  <LabeledInput
                    htmlFor="cityInput"
                    label={t(
                      'tendersPage.newTender.tenderLocationModal.cityInputLabel',
                    )}
                    cx={styles.modalInputLabel}
                  >
                    <PickerInput
                      id="cityInput"
                      dataSource={cityDataSource}
                      value={cityModalValue}
                      onValueChange={setCityModalValue}
                      getName={(item: pickerItemType | undefined) => item!.name}
                      entityName="City"
                      selectionMode="single"
                      valueType="entity"
                      sorting={{ field: 'name', direction: 'asc' }}
                      emptyValue={null}
                      placeholder={t(
                        'tendersPage.newTender.tenderLocationModal.cityInputPlaceholder',
                      )}
                    />
                  </LabeledInput>
                  <LabeledInput
                    htmlFor="addressInput"
                    label={t(
                      'tendersPage.newTender.tenderLocationModal.addressInputLabel',
                    )}
                    sidenote={t(
                      'tendersPage.newTender.tenderLocationModal.addressInputLabelSidenote',
                    )}
                    cx={styles.modalInputLabel}
                  >
                    <PickerInput
                      id="addressInput"
                      dataSource={addressDataSource}
                      value={addressModalValue}
                      onValueChange={setAddressModalValue}
                      getName={(item: pickerItemType | undefined) => item!.name}
                      entityName="Address"
                      selectionMode="single"
                      valueType="entity"
                      sorting={{ field: 'name', direction: 'asc' }}
                      placeholder={t(
                        'tendersPage.newTender.tenderLocationModal.addressInputPlaceholder',
                      )}
                      emptyValue={null}
                    />
                  </LabeledInput>
                </FlexCell>
                <FlexCell width="100%">
                  <Panel cx={styles.mapWrapper}>
                    {cityModalValue && (
                      <MapContainer
                        center={[cityModalValue.lat!, cityModalValue.lng!]}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: '234px', width: '100%' }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapCordsController cityCords={cityModalValue} />
                      </MapContainer>
                    )}
                  </Panel>
                </FlexCell>
              </FlexRow>
              <FlexRow>
                <FlexCell width="100%">
                  <LabeledInput
                    label={t(
                      'tendersPage.newTender.tenderLocationModal.commentsInputLabel',
                    )}
                    sidenote={t(
                      'tendersPage.newTender.tenderLocationModal.commentsInputLabelSidenote',
                    )}
                    htmlFor="commentsInput"
                    cx={styles.commentsInputWrapper}
                  >
                    <TextArea
                      value={commentsModalValue}
                      onValueChange={setCommentsModalValue}
                      placeholder={t(
                        'tendersPage.newTender.tenderLocationModal.commentsInputPlaceholder',
                      )}
                      id="commentsInput"
                    />
                  </LabeledInput>
                </FlexCell>
              </FlexRow>
            </Panel>
          </ScrollBars>
          <ModalFooter borderTop>
            <FlexSpacer />
            <Button
              color="secondary"
              fill="outline"
              caption={t('tendersPage.newTender.tenderLocationModal.cancelCta')}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="accent"
              caption={t(
                'tendersPage.newTender.tenderLocationModal.confirmCta',
              )}
              onClick={() => saveValues()}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
