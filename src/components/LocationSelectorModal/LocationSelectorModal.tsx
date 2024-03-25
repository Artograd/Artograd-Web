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
import { CityItemType } from '../../types';
import { Trans, useTranslation } from 'react-i18next';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Dispatch, SetStateAction, useState } from 'react';
import { DraggableMarker } from '../MapCordsController/MapCordsController';

const MapMarkerIcon = L.icon({
  iconUrl: MarkerIcon,
  shadowUrl: MarkerIconShadow,
});

L.Marker.prototype.options.icon = MapMarkerIcon;

export type LocationSelectorModalType = {
  modalProps: IModal<string>;
  cityName?: CityItemType;
  addressValue?: string;
  commentsValue: string;
  locationCoordinates: LatLngLiteral | undefined;
  listOfCities?: CityItemType[];
  setCommentsValue: Dispatch<SetStateAction<string>>;
  setCityName: Dispatch<SetStateAction<CityItemType | undefined>>;
  setAddressValue: Dispatch<SetStateAction<string | undefined>>;
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
  listOfCities = [],
  setCommentsValue,
  setCityName,
  setAddressValue,
  setLocationCoordinates,
}: LocationSelectorModalType) {
  const [cityNameModal, setCityNameModal] = useState<CityItemType | undefined>(
    cityName,
  );
  const [addressModalValue, setAddressModalValue] = useState<
    string | undefined
  >(addressValue);
  const [commentsModalValue, setCommentsModalValue] = useState(commentsValue);
  const [locationCoordinatesModal, setLocationCoordinatesModal] = useState<
    LatLngLiteral | undefined
  >(locationCoordinates);

  const { t } = useTranslation();
  const svc = useUuiContext();
  const cityDataSource = useArrayDataSource(
    {
      items: listOfCities,
    },
    [],
  );

  const getCityById = (city?: number) => {
    return listOfCities.find((cityArray) => cityArray.id === city);
  };

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
        city: {
          validators: [
            (value) => [
              !value && !value && t('global.lenses.isRequiredMessage'),
            ],
          ],
        },
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
            title={t('tendersPages.newTender.tenderLocationModal.modalTitle')}
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
                      'tendersPages.newTender.tenderLocationModal.countryInputLabel',
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
                      'tendersPages.newTender.tenderLocationModal.cityInputLabel',
                    )}
                    cx={styles.modalInputLabel}
                    {...lens.prop('city').toProps()}
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
                        'tendersPages.newTender.tenderLocationModal.cityInputPlaceholder',
                      )}
                      rawProps={{
                        input: { 'data-testid': `city-selector-input` },
                      }}
                    />
                  </LabeledInput>
                  <LabeledInput
                    htmlFor="addressInput"
                    label={t(
                      'tendersPages.newTender.tenderLocationModal.addressInputLabel',
                    )}
                    sidenote={
                      <Trans
                        i18nKey="tendersPages.newTender.tenderLocationModal.addressInputLabelSidenote"
                        components={{
                          i: <span className={styles.sideNote} />,
                        }}
                      />
                    }
                    cx={styles.modalInputLabel}
                    {...lens.prop('address').toProps()}
                  >
                    <TextInput
                      id="addressInput"
                      {...lens.prop('address').toProps()}
                      value={addressModalValue}
                      onValueChange={setAddressModalValue}
                      placeholder={t(
                        'tendersPages.newTender.tenderLocationModal.addressInputPlaceholder',
                      )}
                      rawProps={{ 'data-testid': `address-input` }}
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
                      'tendersPages.newTender.tenderLocationModal.commentsInputLabel',
                    )}
                    sidenote={
                      <Trans
                        i18nKey="tendersPages.newTender.tenderLocationModal.commentsInputLabelSidenote"
                        components={{
                          i: <span className={styles.sideNote} />,
                        }}
                      />
                    }
                    htmlFor="commentsInput"
                    cx={styles.commentsInputWrapper}
                    {...lens.prop('comments').toProps()}
                  >
                    <TextArea
                      {...lens.prop('comments').toProps()}
                      value={commentsModalValue ?? ''}
                      onValueChange={setCommentsModalValue}
                      placeholder={t(
                        'tendersPages.newTender.tenderLocationModal.commentsInputPlaceholder',
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
              caption={t(
                'tendersPages.newTender.tenderLocationModal.cancelCta',
              )}
              onClick={() => modalProps.abort()}
            />
            <Button
              color="accent"
              caption={t(
                'tendersPages.newTender.tenderLocationModal.confirmCta',
              )}
              onClick={() => saveValues()}
            />
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
