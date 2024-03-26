import { useTranslation } from "react-i18next";
import styles from './LocationInput.module.scss';
import { useArrayDataSource } from "@epam/uui-core";
import {
  LabeledInput,
  PickerInput
} from '@epam/uui';
import { useState } from 'react';
import { CityItemType } from '../../../../../../types';


export const LocationInput = ({ data = [], selectedLocation, updateLocation }: {
  data: CityItemType[],
  selectedLocation: CityItemType | string,
  updateLocation: any;
}) => {
  const { t } = useTranslation();
  console.log(222, data, selectedLocation);

  const [selected, setslelectedLocation] = useState<CityItemType | undefined>();
  const cityDataSource = useArrayDataSource(
    {
      items: data,
    },
    [],
  );

  const onCityValueChange = (city: CityItemType) => {
    setslelectedLocation(city);
    updateLocation(city);
  };

  return (
    <LabeledInput
      htmlFor="locationInput"
      label={t(
        'profilePage.Location',
      )}
      cx={styles.modalInputLabel}
    >
      <PickerInput
        id="locationInput"
        dataSource={cityDataSource}
        value={selected}
        onValueChange={onCityValueChange}
        entityName="Location"
        selectionMode="single"
        valueType="entity"
        sorting={{ field: 'name', direction: 'asc' }}
        placeholder={t(
          'tendersPage.newTender.tenderLocationModal.cityInputPlaceholder',
        )}
        rawProps={{
          input: { 'data-testid': `city-selector-input` },
        }}
      />
    </LabeledInput>
  )
}