'use client';
import Image from 'next/image';
import './loading.css'; // Подключаем стили

export default function LoadingPage() {
  return (
    <div className='loading-container'>
      <div className='loading-spinner'></div>
      <div
        style={{
          position: 'absolute',
          width: '80%',
          height: '100%',
          zIndex: 3,
        }}
      >
        <Image
          src='/logo.svg'
          alt='Logo'
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
        <div className='loading-text'>Зона Уникальных Цен</div>
    </div>
  );
}
