import { useTranslation, Trans } from 'react-i18next';
import styles from './LocationInput.module.scss';
import { useArrayDataSource } from '@epam/uui-core';
import { LabeledInput, PickerInput } from '@epam/uui';
import { useState } from 'react';
import { CityItemType } from '../../../../../../types';

export const LocationInput = ({
  data,
  selectedLocation,
  updateLocation,
}: {
  data: CityItemType[];
  selectedLocation: CityItemType | undefined;
  updateLocation: any;
}) => {
  const cityDataSource = useArrayDataSource(
    {
      items: data,
    },
    [],
  );

  const { t } = useTranslation();
  const [selected, setSelectedLocation] = useState<CityItemType | undefined>(
    selectedLocation,
  );

  const onCityValueChange = (city: CityItemType) => {
    setSelectedLocation(city);
    updateLocation(city?.id);
  };

  return (
    <LabeledInput
      htmlFor="locationInput"
      label={t('profilePage.Location')}
      sidenote={
        <Trans
          components={{
            i: <span className={styles.sideNote} />,
          }}
          i18nKey="optionalSidenote"
        />
      }
      cx={styles.modalInputLabel}
    >
      <PickerInput
        id="locationInput"
        dataSource={cityDataSource}
        value={selected || selectedLocation}
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
  );
};
