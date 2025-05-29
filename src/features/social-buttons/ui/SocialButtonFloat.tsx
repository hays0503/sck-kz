import { Flex, FloatButton } from 'antd';
import { CSSProperties, memo, useState } from 'react';
import { CommentOutlined, PhoneFilled } from '@ant-design/icons';
import { FaWhatsapp } from 'react-icons/fa';
import { RiInstagramLine, RiTelegram2Line } from 'react-icons/ri';
// interface SocialButtonFloatProps {
// readonly children: React.ReactNode;
// }

const SocialButtonFloat: React.FC =
  // <
  // SocialButtonFloatProps
  // >
  (
    {
      // children
    },
  ) => {
    const [open, setOpen] = useState(false);
    const TimeOutClose = () => {
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    };
    return (
      <>
        <style jsx global>{`
          .container .ant-float-btn-body {
            --ant-color-bg-elevated: black;
            --ant-color-text: white;
          }
          .container .ant-float-btn-body:hover {
            background: black;
            --ant-color-text: white;
          }

          .container .whatsapp .ant-float-btn-body {
            --ant-color-bg-elevated: green;
          }
          .container .whatsapp .ant-float-btn-body:hover {
            background: green;
          }
          .container .telegram .ant-float-btn-body {
            --ant-color-bg-elevated: #0088cc;
          }
          .container .telegram .ant-float-btn-body:hover {
            background: #0088cc;
          }
          .container .instagram .ant-float-btn-body {
            --ant-color-bg-elevated: #c13584;
            background: linear-gradient(
              45deg,
              #f09433 0%,
              #e6683c 25%,
              #dc2743 50%,
              #cc2366 75%,
              #bc1888 100%
            );
          }
          .container .instagram .ant-float-btn-body:hover {
            --ant-color-bg-elevated: #c13584;
            background: linear-gradient(
              45deg,
              #f09433 0%,
              #e6683c 25%,
              #dc2743 50%,
              #cc2366 75%,
              #bc1888 100%
            );
          }
        `}</style>
        <Flex className='container'>
          <FloatButton.Group
            open={open}
            key={'SocialButtonFloat'}
            trigger='click'
            placement={'left'}
            icon={<PhoneFilled key={'PhoneFilled'} />}
            style={
              {
                position: 'fixed',
                bottom: '12dvh',
              } as CSSProperties
            }
            onClick={() => {
              setOpen(!open);
            }}
          >
            <FloatButton
              icon={<CommentOutlined />}
              href={'sms:77056550000'}
              onClick={TimeOutClose}
            />
            <FloatButton
              onClick={TimeOutClose}
              className='whatsapp'
              icon={<FaWhatsapp />}
              href='https://api.whatsapp.com/send/?phone=77056550000&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5'
            />
            <FloatButton
              onClick={TimeOutClose}
              className='instagram'
              icon={<RiInstagramLine className='instagram' />}
              href='https://www.instagram.com/sck_1.kz'
            />
            <FloatButton
              onClick={TimeOutClose}
              className='telegram'
              icon={<RiTelegram2Line />}
              href='https://t.me/sck_1.kz'
            />
          </FloatButton.Group>
        </Flex>
      </>
    );
  };

export default memo(SocialButtonFloat);
