import { Metadata } from 'next';

const basicMetadata = (): Metadata => {
  return {
    title: 'sck.kz',
    description: 'Зона уникальных цен sck.kz',
    manifest: '/manifest.json',
    icons: '/icon/android-chrome-192x192.png',
    openGraph: {
      title: 'sck.kz',
      description: 'Зона уникальных цен sck.kz',
      images: [
        {
          url: 'https://sck.kz/icon/android-chrome-192x192.png',
          width: 192,
          height: 192,
        },
        {
          url: 'https://sck.kz/icon/android-chrome-512x512.png',
          width: 512,
          height: 512,
        },
      ],
      siteName: 'sck.kz',
      url: 'https://sck.kz',
      locale: 'ru_RU',
      type: 'website',
    },
    category: 'shopping',
  } as Metadata;
};

export default basicMetadata;
