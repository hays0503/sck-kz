import { Flex, message, Typography } from "antd";
import { useTranslations } from "next-intl";
import { motion } from 'framer-motion';
import { Link } from "@/i18n/routing";
import Image from "next/image";

const { Title } = Typography;

const ElementList: React.FC<{
  title: string;
  href: string;
  disabled?: boolean;
  color?: string;
  icon?: React.ReactNode;
}> = (props) => {
  const t = useTranslations('ProfileMobile');
  const { title, href, disabled, color, icon } = props;
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <motion.div
        whileTap={
          !disabled
            ? {
                y: 4, // Более заметный сдвиг вниз
                boxShadow: 'inset 0px 4px 6px rgba(0, 0, 0, 0.15)', // Вдавливание
              }
            : {}
        }
        transition={{ type: 'spring', stiffness: 280, damping: 18 }} // Упругое движение
        style={{
          width: '100%',
          backgroundColor: disabled ? '#f0f0f0' : '#fff',
          border: '1px solid #d7d7d7',
          padding: '12px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          borderRadius: '10px',
          transition: 'background-color 0.2s ease',
        }}
        onClick={() => {
          if (disabled) {
            messageApi.open({
              type: 'error',
              content: t('vy-ne-avtorizovany'),
            });
          }
        }}
      >
        <Link
          href={disabled ? '#' : href}
          prefetch={true}
          style={{ width: '100%' }}
        >
          <Flex
            align='center'
            justify='space-between'
            style={{ width: '100%' }}
          >
            <Flex align='center' justify='space-between' gap={10}>
              {icon}
              <Title level={5} style={{ color }}>
                {title}
              </Title>
            </Flex>
            <Flex align='center' justify='center'>
              <Image src={'/arrow.svg'} alt='arrow' width={36} height={36} />
            </Flex>
          </Flex>
        </Link>
      </motion.div>
    </>
  );
};

export default ElementList;