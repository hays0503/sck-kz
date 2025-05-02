import { Flex, Tag, Typography } from 'antd';
import { MappedProductType } from 'api-mapping/product/_type';
import { TagType } from 'api-mapping/product/_type/product';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import React, { CSSProperties, JSX } from 'react';

const { Text } = Typography;

interface ILevel1Props {
  readonly addToFavoriteSlot: JSX.Element;
  readonly Swiper: JSX.Element;
  readonly discount: number | string | null | undefined;
  readonly tags: MappedProductType['tags'];
}

// Первый уровень карты (скидка и слайдер)
const Level1: React.FC<ILevel1Props> = (props) => {
  const { discount, tags, Swiper, addToFavoriteSlot } = props;

  const AddFavorite = () => (
    <Flex
      align='center'
      justify='space-between'
      wrap
      style={{
        width: '100%',
        height: 0,
        flexDirection: 'row-reverse',
        position: 'absolute',
        top: 0,
        zIndex: 999,
      }}
    >
      <>{addToFavoriteSlot}</>
      {discount && (
        <Flex style={{ padding: '5px' }}>
          <Tag
            style={{
              backgroundColor: 'red',
              textTransform: 'uppercase',
              color: '#fff',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              borderRadius: '6px',
              maxWidth: '100%',
              padding: '1px 4px',
              fontSize: '12px',
              fontWeight: '600',
              lineHeight: '14px',
              overflow: 'hidden',
            }}
          >{`-${Math.round(Number(discount))}%`}</Tag>
        </Flex>
      )}
    </Flex>
  );

  const TagsFabric: React.FC<{ tag: TagType; index: number }> = ({
    tag,
    index,
  }) => {
    const locale = useLocale();
    const text =
      locale === 'ru'
        ? tag.tag_text
        : locale === 'kz'
          ? tag.additional_data['kz']
          : tag.additional_data['en'];

    const styleTags: CSSProperties = {
      position: 'absolute',
      zIndex: 999,
      opacity: 0.95,
      borderRadius: '0px 30px 30px 0px',
    };

    const TagRoot: React.FC<{ children: JSX.Element }> = ({ children }) => (
      <Tag
        key={tag.id}
        style={{
          ...styleTags,
          backgroundColor: tag.fill_color,
          padding: '0px 5px 0px 5px',
          bottom: `${10 + index * 30}px`,
        }}
      >
        {children}
      </Tag>
    );

    switch (tag.tag_text) {
      case 'Made in KZ': {
        return (
          <TagRoot>
            <Flex align='center' gap={3}>
              <Text
                style={{
                  color: tag.font_color,
                  backgroundColor: 'inherit',
                  fontSize: '12px',
                }}
              >
                {text}
              </Text>
              <Image
                src={'/iconKZ/kz.png'}
                alt={tag.tag_text}
                width={20}
                height={20}
              />
            </Flex>
          </TagRoot>
        );
      }
      default: {
        return (
          <TagRoot>
            <Flex align='center' gap={3}>
              <Text
                style={{
                  color: tag.font_color,
                  backgroundColor: 'inherit',
                  fontSize: '12px',
                }}
              >
                {text}
              </Text>
            </Flex>
          </TagRoot>
        );
      }
    }
  };

  const Tags: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const containerStyle: CSSProperties = {
      position: 'relative',
      zIndex: 998,
      padding: 0,
    };

    return (
      <Flex style={containerStyle} vertical justify='left'>
        {tags &&
          tags.map((tag, index) => (
            <TagsFabric key={`${tag.id}-${index}`} tag={tag} index={index} />
          ))}
        {children}
      </Flex>
    );
  };

  return (
    <Flex
      vertical={true}
      gap={10}
      align='center'
      style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        backgroundColor: 'red',
      }}
    >
      <AddFavorite />
      <Tags>{Swiper}</Tags>
    </Flex>
  );
};

export default Level1;
