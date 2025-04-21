'use client';
import React from 'react';
import { Collapse, Flex, Typography, Divider } from 'antd';
import { CollapseProps } from 'antd/lib';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneOutlined, MailOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const MobileFooterMenu = () => {
  const t = useTranslations('FooterSCK');
  const cityEn = useGetCityParams();
  const [activeKey, setActiveKey] = React.useState<string | string[]>();
  
  // Анимации для контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5 
      } 
    }
  };
  
  // Анимации для элементов
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: {
      y: 10,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Анимации для содержимого аккордеона
  const accordionContentVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };
  
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <Text strong>{t('kompaniya')}</Text>,
      children: (
        <motion.div 
          variants={accordionContentVariants} 
          initial="hidden"
          animate="visible"
          exit="exit"
          className="footer-menu-links"
        >
          <Link href={`/city/${cityEn}/about`}>
            <Text className="footer-link">{t('o-nas')}</Text>
          </Link>
          <Link href={`/city/${cityEn}/about-our-guarantees`}>
            <Text className="footer-link">{t('nashi-garantii')}</Text>
          </Link>
          <Link href={`/city/${cityEn}/contact`}>
            <Text className="footer-link">{t('kontakty')}</Text>
          </Link>
        </motion.div>
      ),
      className: 'footer-collapse-item',
    },
    {
      key: '2',
      label: <Text strong>{t('pomosh')}</Text>,
      children: (
        <motion.div 
          variants={accordionContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="footer-menu-links"
        >
          <Link href={`/city/${cityEn}/about-pays`}>
            <Text className="footer-link">{t('oplata')}</Text>
          </Link>
        </motion.div>
      ),
      className: 'footer-collapse-item',
    },
    {
      key: '3',
      label: <Text strong>{t('internet-magazin')}</Text>,
      children: (
        <motion.div 
          variants={accordionContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="footer-menu-contact"
        >
          <Text className="contact-title">{t('svyazhites-s-nami')}</Text>
          <Flex align="center" className="contact-item">
            <PhoneOutlined className="contact-icon" />
            <Text strong className="contact-text">+7 705 655 00 00</Text>
          </Flex>
          <Flex align="center" className="contact-item">
            <MailOutlined className="contact-icon" />
            <Text className="contact-text">info@sck.kz</Text>
          </Flex>
          <Flex align="center" className="contact-item">
            <ClockCircleOutlined className="contact-icon" />
            <Text className="contact-text">9:00 - 18:00, Пн-Пт</Text>
          </Flex>
        </motion.div>
      ),
      className: 'footer-collapse-item',
    },
    {
      key: '4',
      label: <Text strong>{t('yuridicheskaya-informaciya')}</Text>,
      children: (
        <motion.div 
          variants={accordionContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="footer-menu-legal"
        >
          <div className="legal-company-info">
            <Text strong className="company-name">TOO «SCK» (ЭсСиКей)</Text>
            <Text className="company-desc">Sales Center of Kazakhstan</Text>
            <Text className="company-bin">БИН 160 440 027 443</Text>
          </div>
          
          <Divider className="footer-divider" />
          
          <div className="footer-menu-links legal-links">
            <Link href={`/city/${cityEn}/user-agreement`}>
              <Text className="footer-link">{t('polzovatelskoe-soglashenie')}</Text>
            </Link>
            <Link href={`/city/${cityEn}/privacy-policy`}>
              <Text className="footer-link">{t('politika-konfidencialnosti')}</Text>
            </Link>
          </div>
        </motion.div>
      ),
      className: 'footer-collapse-item',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mobile-footer-wrapper"
    >
      <Flex vertical className="mobile-footer-container">
        <AnimatePresence mode="wait">
          <Collapse
            items={items}
            ghost
            accordion
            expandIconPosition='end'
            className="footer-collapse"
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
          />
        </AnimatePresence>
        
        <motion.div 
          className="footer-copyright"
          variants={itemVariants}
        >
          <Text>{`© ${new Date().getFullYear()} ${t('sck-essikei-zona-unikalnykh-cen')}`}</Text>
        </motion.div>
        
        <style jsx global>{`
          .mobile-footer-wrapper {
            background: linear-gradient(to bottom, #fafafa, #f0f2f5);
            border-radius: 16px 16px 0 0;
            box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }
          
          .mobile-footer-container {
            padding: 16px 12px;
          }
          
          .footer-collapse {
            padding: 0;
            border-radius: 8px;
          }
          
          .footer-collapse-item {
            border-radius: 10px;
            margin-bottom: 8px;
            overflow: hidden;
          }
          
          .footer-collapse-item .ant-collapse-header {
            padding: 12px 16px !important;
            background-color: #fff;
            border-radius: 8px !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          }
          
          .footer-collapse-item .ant-collapse-content {
            background-color: #fff;
            border-radius: 0 0 8px 8px;
            overflow: hidden;
          }
          
          .footer-collapse-item .ant-collapse-content-box {
            padding: 12px 16px !important;
          }
          
          .footer-menu-links {
            display: flex;
            flex-direction: column;
          }
          
          .footer-link {
            margin-bottom: 12px;
            color: #555;
            position: relative;
            padding-left: 12px;
          }
          
          .footer-link:before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 4px;
            background-color: #1677ff;
            border-radius: 50%;
          }
          
          .footer-menu-contact .contact-title {
            margin-bottom: 12px;
            color: #555;
          }
          
          .contact-item {
            margin-bottom: 10px;
          }
          
          .contact-icon {
            margin-right: 12px;
            color: #1677ff;
            font-size: 16px;
          }
          
          .contact-text {
            color: #333;
          }
          
          .footer-menu-legal {
            display: flex;
            flex-direction: column;
          }
          
          .legal-company-info {
            display: flex;
            flex-direction: column;
            margin-bottom: 6px;
          }
          
          .company-name {
            margin-bottom: 4px;
            color: #333;
          }
          
          .company-desc, .company-bin {
            color: #666;
            margin-bottom: 4px;
          }
          
          .footer-divider {
            margin: 12px 0;
            background-color: #eee;
          }
          
          .legal-links {
            margin-top: 6px;
          }
          
          .footer-copyright {
            margin-top: 24px;
            text-align: center;
            color: #666;
            padding: 12px 0;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          }
        `}</style>
      </Flex>
    </motion.div>
  );
};

export default MobileFooterMenu;
