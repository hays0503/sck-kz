// hooks/useSessionReminder.ts
import { useEffect } from 'react';
import { notification, Button, Flex } from 'antd';
import { LoginOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useLocalStorage } from 'usehooks-ts';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

const REMIND_TIMEOUT_MS = 5 * 60 * 1000;

function ActionsButtons({
  handleLogin,
  handleRemind,
  t,
}: {
  handleLogin: () => void;
  handleRemind: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <Flex
      gap={10}
      vertical
      justify="center"
      align="center"
      style={{ width: '100%', minWidth: 220 }}
    >
      <Button
        type="primary"
        icon={<LoginOutlined />}
        style={{ width: '100%' }}
        onClick={handleLogin}
      >
        {t('pereiti-k-avtorizacii')}
      </Button>
      <Button
        style={{ backgroundColor: 'orange', color: 'white' }}
        icon={<ClockCircleOutlined />}
        onClick={handleRemind}
      >
        {t('napomnit-pozhe')}
      </Button>
    </Flex>
  );
}

export function useSessionReminder({
  isSessionExpired,
  isLoginPage,
  cityEn,
}: {
  isSessionExpired: boolean;
  isLoginPage: boolean;
  cityEn: string;
}) {
  const [api, contextHolder] = notification.useNotification();
  const [remindLater, setRemindLater] = useLocalStorage('remindLater', false);
  const [remindTime, setRemindTime] = useLocalStorage('remindTime', 0);
  const route = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (remindLater && Date.now() >= remindTime) {
      setRemindLater(false);
    }
  }, [remindLater, remindTime, setRemindLater]);

  useEffect(() => {
    if (isSessionExpired && !remindLater && !isLoginPage) {
      const key = 'session-expired';

      const handleLogin = () => {
        api.destroy(key);
        route.push(`/city/${cityEn}/login`);
      };

      const handleRemind = () => {
        setRemindLater(true);
        setRemindTime(Date.now() + REMIND_TIMEOUT_MS);
        api.destroy(key);
      };

      api.info({
        showProgress: true,
        key,
        message: t('sessiya-istekla'),
        description: t('pozhaluista-povtorite-avtorizaciyu'),
        duration: null,
        placement: 'top',
        actions: (
          <ActionsButtons
            handleLogin={handleLogin}
            handleRemind={handleRemind}
            t={t}
          />
        ),
      });
    }
  }, [isSessionExpired, remindLater, isLoginPage, cityEn, t, api, setRemindLater, setRemindTime, route]);

  return contextHolder;
}
