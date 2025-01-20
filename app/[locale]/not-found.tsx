"use client";
import React from 'react';
import { useState } from 'react';
import styles from '../NotFound.module.css';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
    const t = useTranslations('NotFound');
    const [hover, setHover] = useState(false);

    return (
        <div className={styles.container}>
            <div className={`${styles.illustration} ${styles.bounce}`}>🤔</div>
            <h1 className={styles.heading}>404</h1>
            <p className={styles.text}>{t('kak-vy-zdes-ochutilis')}</p>
            <Link
                href="/city/Karaganda/main"
                className={`${styles.link} ${hover ? styles.linkHover : ''}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {t('vernutsya-na-glavnuyu')}
            </Link>
        </div>
    );
}
