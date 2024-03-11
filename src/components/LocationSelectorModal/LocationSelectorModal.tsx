import {
  Button,
  ErrorNotification,
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
  SuccessNotification,
  TextArea,
  TextInput,
  useForm,
  Text,
} from '@epam/uui';
import styles from './LocationSelectorModal.module.scss';

import { IModal, useArrayDataSource, useUuiContext } from '@epam/uui-core';
import 'dayjs/locale/ru';
import { FlexSpacer } from '@epam/uui-components';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngLiteral } from 'leaflet';
import citiesDB from './cities.json';
import { AddressItemType, CityItemType } from '../../types';
import { useTranslation } from 'react-i18next';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
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

const getCityById = (city?: number) => {
  return cityList.find((cityArray) => cityArray.id === city);
};

export type LocationSelectorModalType = {
  modalProps: IModal<string>;
  cityName?: CityItemType;
  addressValue?: AddressItemType;
  commentsValue: string;
  locationCoordinates: LatLngLiteral | undefined;
  setCommentsValue: Dispatch<SetStateAction<string>>;
  setCityName: Dispatch<SetStateAction<CityItemType | undefined>>;
  setAddressValue: Dispatch<SetStateAction<AddressItemType | undefined>>;
  setLocationCoordinates: Dispatch<SetStateAction<LatLngLiteral | undefined>>;
};

type LocationSelectorFormType = {
  country?: string;
  city?: string;
  address?: string;
  comments?: string;
};

export function LocationSelectorModal({
  modalProps,
  cityName,
  addressValue,
  commentsValue,
  locationCoordinates,
  setCommentsValue,
  setCityName,
  setAddressValue,
  setLocationCoordinates,
}: LocationSelectorModalType) {
  const portalTargetRef = useRef<HTMLDivElement>();
  const [cityNameModal, setCityNameModal] = useState<CityItemType | undefined>(
    cityName,
  );
  const [addressModalValue, setAddressModalValue] = useState<
    AddressItemType | undefined
  >(addressValue);
  const [commentsModalValue, setCommentsModalValue] = useState(commentsValue);
  const [locationCoordinatesModal, setLocationCoordinatesModal] = useState<
    LatLngLiteral | undefined
  >(locationCoordinates);

  const { t } = useTranslation();
  const svc = useUuiContext();
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
    save();
    if (cityNameModal) {
      setCommentsValue(commentsModalValue);
      setCityName(cityNameModal);
      setAddressValue(addressModalValue);
      setLocationCoordinates(locationCoordinatesModal);
      modalProps.success('Success action');
    }
  };

  const onCityValueChange = (city: CityItemType) => {
    setCityNameModal(city);
    const selectedCity = getCityById(city?.id);
    setLocationCoordinatesModal(
      selectedCity ?? { lat: 42.44714809298988, lng: 19.260063171386722 },
    );
  };

  const { lens, save } = useForm<LocationSelectorFormType>({
    value: {},
    onSave: (location) =>
      Promise.resolve({ form: location }) /* place your save api call here */,
    onSuccess: () =>
      svc.uuiNotifications.show((props) => (
        <SuccessNotification {...props}>
          <Text>Form saved</Text>
        </SuccessNotification>
      )),
    onError: () =>
      svc.uuiNotifications.show((props) => (
        <ErrorNotification {...props}>
          <Text>Error on save</Text>
        </ErrorNotification>
      )),
    getMetadata: () => ({
      props: {
        country: { isRequired: false },
        city: { isRequired: true },
        address: { isRequired: false },
        comments: { isRequired: false },
      },
    }),
    settingsKey: 'location-selector-form',
  });

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
                    {...lens.prop('country').toProps()}
                  >
                    <TextInput
                      id="countryInput"
                      {...lens.prop('country').toProps()}
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
                    {...lens.prop('city').toProps()}
                    ref={portalTargetRef}
                  >
                    <PickerInput
                      id="cityInput"
                      {...lens.prop('city').toProps()}
                      dataSource={cityDataSource}
                      value={cityNameModal}
                      onValueChange={onCityValueChange}
                      entityName="City"
                      selectionMode="single"
                      valueType="entity"
                      sorting={{ field: 'name', direction: 'asc' }}
                      placeholder={t(
                        'tendersPage.newTender.tenderLocationModal.cityInputPlaceholder',
                      )}
                      rawProps={{
                        input: { 'data-testid': `city-selector-input` },
                      }}
                      portalTarget={portalTargetRef.current}
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
                    {...lens.prop('address').toProps()}
                  >
                    <PickerInput
                      id="addressInput"
                      dataSource={addressDataSource}
                      {...lens.prop('address').toProps()}
                      value={addressModalValue}
                      onValueChange={setAddressModalValue}
                      entityName="Address"
                      selectionMode="single"
                      valueType="entity"
                      sorting={{ field: 'name', direction: 'asc' }}
                      placeholder={t(
                        'tendersPage.newTender.tenderLocationModal.addressInputPlaceholder',
                      )}
                      rawProps={{
                        input: { 'data-testid': `address-selector-input` },
                      }}
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
                    {...lens.prop('comments').toProps()}
                  >
                    <TextArea
                      {...lens.prop('comments').toProps()}
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
