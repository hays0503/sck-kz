import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Flex } from 'antd';

// Отключаем SSR для react-leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
// const useMap = dynamic(() => import('react-leaflet').then(mod => mod.useMap), { ssr: false });

// Импортируем leaflet только на клиенте
// eslint-disable-next-line @typescript-eslint/no-require-imports
const L = typeof window !== 'undefined' ? require('leaflet') : null;

const customIcon = L
  ? new L.Icon({
    iconUrl: '/sck-map.svg',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64],
  })
  : null;

interface Placemark {
  position: [number, number];
  hint: string;
  balloon: string;
}

const placemarks: Placemark[] = [
  {
    position: [51.168583, 71.513955],
    hint: 'г. Астана, Переулок Ашутас 2',
    balloon: 'Адрес склада:<br>г. Нур-Султан (Астана), ул. А 184, 5',
  },
  {
    position: [49.813666, 73.036823],
    hint: 'г. Караганда, ул. Сакена Сейфуллина, 105',
    balloon: 'Адрес склада:<br>г. Караганда, ул. Сакена Сейфуллина, 105',
  },
  {
    position: [54.890801, 69.164223],
    hint: 'г. Петропавловск, ул. Мусрепова, 34А',
    balloon: 'Адрес склада:<br>г. Петропавловск, ул. Мусрепова, 34А',
  },
  {
    position: [42.300320, 69.629234],
    hint: 'г. Шымкент, ул. Койкелди Батыра, 18/2',
    balloon: 'Адрес склада:<br>г. Шымкент, ул. Койкелди Батыра, 18/2',
  },
  {
    position: [43.258866, 76.905113],
    hint: 'г. Алматы, ул. Нурмакова, 1А',
    balloon: 'Адрес склада:<br>г. Алматы, ул. Нурмакова, 1А',
  },
  {
    position: [50.237895, 57.245357],
    hint: 'г. Актобе, 41 разъезд, 114 А',
    balloon: 'Адрес склада:<br>г. Актобе, 41 разъезд, 114 А',
  },
];


function MapsComponent() {
  // Kazakstan
  const [center, setCenter] = useState<[number, number]>([51.168583, 71.513955]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log('Ошибка получения геолокации:', error);
        }
      );
    }
  }, []);

  return (
    <Flex align="center" justify="center" style={{ height: 500, width: '80%'}}>
      <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
        {/* <ChangeView center={center} /> */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {placemarks.map((placemark, index) => (
          <Marker key={index} position={placemark.position} icon={customIcon}>
            <Popup>
              <strong>{placemark.hint}</strong>
              <br />
              <span dangerouslySetInnerHTML={{ __html: placemark.balloon }} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Flex>
  );
}

// Отключаем SSR для всей карты
const Maps = dynamic(() => Promise.resolve(MapsComponent), { ssr: false });

export default Maps;
