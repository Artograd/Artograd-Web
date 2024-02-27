import { useEffect } from 'react';
import { useMapEvent } from 'react-leaflet';
import { pickerItemType } from '../../../../types';

export const MapCordsController = ({
  cityCords,
}: {
  cityCords: pickerItemType;
}) => {
  const map = useMapEvent('click', () => {
    map.setView({ lat: cityCords.lat!, lng: cityCords.lng! });
  });

  useEffect(() => {
    map.setView({ lat: cityCords.lat!, lng: cityCords.lng! });
  }, [cityCords]);

  return null;
};
