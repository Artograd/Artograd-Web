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

import { IModal, useArrayDataSource } from '@epam/uui-core';
import 'dayjs/locale/ru';
import { FlexSpacer } from '@epam/uui-components';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngLiteral } from 'leaflet';
import citiesDB from './cities.json';
import { AddressItemType, CityItemType } from '../../../../types';
import { useTranslation } from 'react-i18next';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Dispatch, SetStateAction, useState } from 'react';
import { DraggableMarker } from '../MapCordsController/MapCordsController';

const DefaultIcon = L.icon({
  iconUrl: MarkerIcon,
  shadowUrl: MarkerIconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export const cityList: CityItemType[] = citiesDB;
export const addressList: AddressItemType[] = [
  { id: 1, name: 'Mediteranska, 8525' },
];

const getCityById = (id: number) => {
  return cityList.find((city) => city.id === id);
};

type LocationSelectorModalType = {
  modalProps: IModal<string>;
  cityId?: number;
  addressValue?: number;
  commentsValue: string;
  locationCoordinates: LatLngLiteral | undefined;
  setCommentsValue: Dispatch<SetStateAction<string>>;
  setCityId: Dispatch<SetStateAction<number | undefined>>;
  setAddressValue: Dispatch<SetStateAction<number | undefined>>;
  setLocationCoordinates: Dispatch<SetStateAction<LatLngLiteral | undefined>>;
};

export function LocationSelectorModal({
  modalProps,
  cityId,
  addressValue,
  commentsValue,
  locationCoordinates,
  setCommentsValue,
  setCityId,
  setAddressValue,
  setLocationCoordinates,
}: LocationSelectorModalType) {
  const [cityIdModal, setCityIdModal] = useState<number | undefined>(cityId);
  const [addressModalValue, setAddressModalValue] = useState<
    number | undefined
  >(addressValue);
  const [commentsModalValue, setCommentsModalValue] = useState(commentsValue);
  const [locationCoordinatesModal, setLocationCoordinatesModal] = useState<
    LatLngLiteral | undefined
  >(locationCoordinates);

  const { t } = useTranslation();
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
    if (cityIdModal) {
      setCommentsValue(commentsModalValue);
      setCityId(cityIdModal);
      setAddressValue(addressModalValue);
      setLocationCoordinates(locationCoordinatesModal);
      modalProps.success('Success action');
    }
  };

  const onCityValueChange = (id: number) => {
    setCityIdModal(id);
    const selectedCity = getCityById(id);
    setLocationCoordinatesModal(selectedCity ?? { lat: 0, lng: 0 });
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
                      value={cityIdModal}
                      onValueChange={onCityValueChange}
                      entityName="City"
                      selectionMode="single"
                      valueType="id"
                      sorting={{ field: 'name', direction: 'asc' }}
                      placeholder={t(
                        'tendersPage.newTender.tenderLocationModal.cityInputPlaceholder',
                      )}
                      isRequired
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
                      entityName="Address"
                      selectionMode="single"
                      valueType="id"
                      sorting={{ field: 'name', direction: 'asc' }}
                      placeholder={t(
                        'tendersPage.newTender.tenderLocationModal.addressInputPlaceholder',
                      )}
                    />
                  </LabeledInput>
                </FlexCell>
                <FlexCell width="100%">
                  <Panel cx={styles.mapWrapper}>
                    {locationCoordinatesModal && (
                      <MapContainer
                        center={locationCoordinatesModal}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: '234px', width: '100%' }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <DraggableMarker
                          position={locationCoordinatesModal}
                          setPosition={setLocationCoordinatesModal}
                        />
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
                      value={commentsModalValue ?? ''}
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
