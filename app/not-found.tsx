'use client';

import React from 'react';
import { useState } from 'react';
import styles from './NotFound.module.css';
import Link from 'next/link';



export default function NotFound() {
  const [hover, setHover] = useState(false);

  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <div className={`${styles.illustration} ${styles.bounce}`}>🤔</div>
          <h1 className={styles.heading}>404</h1>
          <p className={styles.text}>Как вы здесь очутились?</p>
          <Link
            href="/"
            className={`${styles.link} ${hover ? styles.linkHover : ''}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Вернуться на главную
          </Link>
        </div> </body>
    </html>
  );
}
