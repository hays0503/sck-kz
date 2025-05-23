'use client';
import { Flex, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { CSSProperties } from 'react';
import { BasketProductCounter } from '@/entities/Basket';
import { Property } from 'csstype';
const { Text } = Typography;

type TLength = (string & {}) | 0;
interface BasketLabelProps {
  styleActive: CSSProperties;
  styleActiveAccent: string;
  text?: string;
  size?: Property.Width<TLength | undefined>;
}

export const Label: React.FC<BasketLabelProps> = (props) => {
  const { styleActive, styleActiveAccent, text, size } = props;
  const t = useTranslations('Label');

  const imageContainerStyle: CSSProperties = {
    width: '100%',
    height: size,
    contain: 'strict',
  };
  return (
    <Flex vertical={true} gap={5} id='basket-icon'>
      <Flex align='center' justify='center' style={imageContainerStyle}>
        {/* <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6.30847 18.71L4.70847 10.71H20.2685L18.6685 18.71H6.30847ZM5.48847 20.71H19.4885C20.0285 20.71 20.3685 20.42 20.4685 19.91L22.4285 10.11C22.5385 9.58 22.4385 9.24 22.0485 8.85L15.1985 2L13.7785 3.42L18.1085 7.74C18.8285 8.46 19.5085 8.59 20.5285 8.59V8.71H4.45847V8.59C5.47847 8.59 6.15847 8.46 6.87847 7.74L11.1985 3.42L9.77847 2L2.90847 8.82C2.49847 9.23 2.43847 9.57 2.54847 10.11L4.50847 19.91C4.60847 20.42 4.94847 20.71 5.48847 20.71Z"
                    fill={styleActiveBg}
                />
                <path
                    d="M9.49847 23C10.3289 23 10.9985 22.3284 10.9985 21.5C10.9985 20.6716 10.3289 20 9.49847 20C8.67006 20 7.99847 20.6716 7.99847 21.5C7.99847 22.3284 8.67006 23 9.49847 23Z"
                    fill={styleActiveAccent}
                />
                <path
                    d="M16.9985 23C17.8289 23 18.4985 22.3284 18.4985 21.5C18.4985 20.6716 17.8289 20 16.9985 20C16.1701 20 15.4985 20.6716 15.4985 21.5C15.4985 22.3284 16.1701 23 16.9985 23Z"
                    fill={styleActiveAccent}
                />
            </svg> */}
        <svg
          width={size}
          height={size}
          viewBox='0 0 21 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='Project Icon'>
            <path
              // fill={styleActiveBg}
              id='Vector'
              d='M15.7941 16.3791H8.53905C8.15483 16.3791 7.96237 16.3791 7.80418 16.3108C7.66464 16.2505 7.54358 16.1534 7.45537 16.0296C7.35651 15.8908 7.31675 15.7052 7.23805 15.3379L5.1429 4.3859C5.06237 4.01006 5.02156 3.82235 4.92155 3.68197C4.83335 3.55816 4.71231 3.46071 4.57276 3.4004C4.41455 3.33203 4.22316 3.33203 3.83878 3.33203H3.25M5.75 5.83203H16.4777C17.0792 5.83203 17.3796 5.83203 17.5815 5.95733C17.7583 6.06708 17.8878 6.23921 17.9442 6.43953C18.0086 6.66822 17.9259 6.957 17.7592 7.53491L16.4777 12.082C16.378 12.4276 16.3282 12.6 16.227 12.7282C16.1378 12.8414 16.0201 12.93 15.8866 12.9844C15.7358 13.0458 15.5566 13.0458 15.1991 13.0458H7.06444'
              stroke={styleActiveAccent}
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
        </svg>
      </Flex>
      <Text
        style={{
          ...{ ...styleActive },
          textAlign: 'center',
          lineHeight: '1em',
          minWidth: '50px',
        }}
      >
        {t('korzina')}{' '}
        {text && (
          <>
            <br />
            {text}
          </>
        )}
      </Text>
    </Flex>
  );
};

const BasketLabelBadger: React.FC<BasketLabelProps> = (props) => {
  return (
    <BasketProductCounter>
      <Label {...props} />
    </BasketProductCounter>
  );
};

export const BasketLabel: React.FC<BasketLabelProps> = (props) => {
  return <BasketLabelBadger {...props} />;
};
