import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react';
import { Marker, useMapEvent } from 'react-leaflet';
import { LatLngLiteral, Marker as MarkerType } from 'leaflet';

export const MapCordsController = ({
  cityCords,
}: {
  cityCords?: LatLngLiteral;
}) => {
  if (cityCords) {
    const map = useMapEvent('click', () => {
      map.setView([cityCords.lat, cityCords.lng], 13);
    });

    useEffect(() => {
      map.setView([cityCords.lat, cityCords.lng], 13);
    }, [cityCords]);
  }

  return null;
};

export const DraggableMarker = ({
  position = { lat: 42.5, lng: 19.3 },
  setPosition,
}: {
  position?: LatLngLiteral;
  setPosition: Dispatch<SetStateAction<LatLngLiteral | undefined>>;
}) => {
  const markerRef = useRef<MarkerType>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        const markerCordinates = marker?.getLatLng();
        if (markerCordinates) {
          setPosition(markerCordinates);
        }
      },
    }),
    [],
  );

  const map = useMapEvent('click', () => {
    map.setView([position.lat, position.lng], 13);
  });

  useEffect(() => {
    map.setView([position.lat, position.lng], 13);
  }, [position]);

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
};
