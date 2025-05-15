'use client';

import Image from 'next/image';
import { useRouter } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Button, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { useLocalStorage } from 'usehooks-ts';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const { Title } = Typography;

// Плавный градиент фона
const gradient = keyframes`
  0%   { background-position: 0% 50% }
  50%  { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Плавающие круги
const FloatShape = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !['$size', '$top', '$left'].includes(prop as string),
})<{
  $size: number;
  $top: string;
  $left: string;
}>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
`;

// Основной контейнер
const Page = styled(motion.div)`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding: 4rem 2rem 2rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3, #fc5c7d);
  background-size: 300% 300%;
  animation: ${gradient} 20s ease infinite;
  text-align: center;
`;

// Логотип по центру
const Logo = styled(motion.div)`
  position: relative;      /* для корректной работы Image fill */
  width: 100dvw;
  height: 100px;
  margin-bottom: 2rem;
  flex-shrink: 0;
`;

export default function Logout() {
  const currentCity = useGetCityParams();
  const router = useRouter();
  const [, , removeAccessToken] = useLocalStorage('accessToken', { token: '' });
  const [, , removeRefreshToken] = useLocalStorage('refreshToken', { token: '' });
  const [, , removeUuid] = useLocalStorage('uuid_id', { token: '' });
  const t = useTranslations('Logout');

  const handleLogout = () => {
    removeAccessToken();
    removeRefreshToken();
    removeUuid();
    router.replace(`/city/${currentCity}/main`);
  };

  return (
    <AnimatePresence>
      <Page
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Логотип */}
        <Logo
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: [1, 1.02, 1] }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <Image src="/logo.svg" alt="Logo" fill style={{ objectFit: 'contain' }} />
        </Logo>

        {/* Плавающие круги */}
        <FloatShape
          $size={180}
          $top="15%"
          $left="10%"
          animate={{ y: ['0%', '25%', '0%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <FloatShape
          $size={250}
          $top="65%"
          $left="75%"
          animate={{ y: ['0%', '-20%', '0%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Вопрос */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Title style={{ color: '#fff', fontSize: '2.5rem' }}>
            {t('vy-deistvitelno-khotite-vyi-ti')}?
          </Title>
        </motion.div>

        {/* Кнопки */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={handleLogout}
              style={{ background: '#fff', color: '#6e8efb', border: 'none' }}
            >
              {t('da')}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="default"
              size="large"
              shape="round"
              onClick={() => router.back()}
              style={{
                background: 'rgba(255,255,255,0.3)',
                color: '#fff',
                border: 'none',
              }}
            >
              {t('net')}
            </Button>
          </motion.div>
        </motion.div>
      </Page>
    </AnimatePresence>
  );
}
