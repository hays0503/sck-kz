'use client';

import { Flex, Typography, Divider, Tag, Button } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ColorBall, { getHexColorsFromRussian } from './colors';

const { Title, Text } = Typography;

// Типы для фильтров
export type Value = {
  id: number;
  value: string;
  count: number;
};
export type BrandElement = {
  id: number;
  name: string;
};
export type Specification = {
  id: number;
  name: string;
  values: Value[];
};
export type SelectFilteredValueType = {
  id: number;
  value: string;
  count: number;
};
export type SelectFilteredType = {
  id: number;              // type_id
  name: string;            // type_name
  values: SelectFilteredValueType[];
};
export type onClickLabelProps = {
  type_id: number;
  type_name: string;
  value_id: number;
  value_name: string;
};
export type FacetResponse = {
  categorys?: BrandElement[];
  brands?: BrandElement[];
  specifications?: Specification[];
};

// Специальные ID для категорий и брендов
const CATEGORY_FILTER_TYPE_ID = -1;
const BRAND_FILTER_TYPE_ID = -2;

// Секция с заголовком
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <Flex vertical gap={5} style={{ padding: '16px' }}>
    <Title level={4} style={{ margin: 0 }}>
      {title}
    </Title>
    <Divider style={{ margin: 0 }} />
    {children}
  </Flex>
);
const SectionMemo = React.memo(Section);
SectionMemo.displayName = 'SectionMemo';

// Анимированный Tag
const tagVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};
const AnimatedTag: React.FC<React.ComponentProps<typeof Tag>> = ({
  children,
  ...props
}) => (
  <motion.div
    variants={tagVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    layout
    transition={{ duration: 0.2 }}
  >
    <Tag {...props}>{children}</Tag>
  </motion.div>
);

// Универсальный список тэгов
const MemoizedRenderList = React.memo(
  <T extends { id: number; name: string }>({
    renderData,
  }: {
    renderData: T[] | undefined;
  }) => (
    <AnimatePresence initial={false}>
      {renderData?.map(({ id, name }) => (
        <AnimatedTag key={id}>{name}</AnimatedTag>
      ))}
    </AnimatePresence>
  ),
);
MemoizedRenderList.displayName = 'MemoizedRenderList';

// --- Кликалка для категорий ---
const CategoriesRenderListTags: React.FC<{
  categories: BrandElement[];
  onClickLabel: (props: onClickLabelProps) => void;
}> = ({ categories, onClickLabel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(
    () => setIsExpanded((prev) => !prev),
    []
  );
  const renderData = useMemo(
    () => (isExpanded ? categories : categories.slice(0, 5)),
    [isExpanded, categories]
  );
  const showToggle = categories.length > 5;

  return (
    <SectionMemo title="Категории">
      <Flex wrap gap={10}>
        <AnimatePresence initial={false}>
          {renderData.map(({ id, name }) => (
            <AnimatedTag
              key={id}
              onClick={() =>
                onClickLabel({
                  type_id: CATEGORY_FILTER_TYPE_ID,
                  type_name: 'Категории',
                  value_id: id,
                  value_name: name,
                })
              }
              style={{ cursor: 'pointer' }}
            >
              {name}
            </AnimatedTag>
          ))}
        </AnimatePresence>
        {showToggle && (
          <motion.div layout>
            <Tag
              onClick={toggleExpanded}
              color={isExpanded ? 'red' : '#9999'}
              style={{ color: 'black', cursor: 'pointer' }}
            >
              {isExpanded ? 'Скрыть' : '...'}
            </Tag>
          </motion.div>
        )}
      </Flex>
    </SectionMemo>
  );
};
CategoriesRenderListTags.displayName = 'CategoriesRenderListTags';

// --- Кликалка для брендов ---
const BrandsRenderListTags: React.FC<{
  brands: BrandElement[];
  onClickLabel: (props: onClickLabelProps) => void;
}> = ({ brands, onClickLabel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(
    () => setIsExpanded((prev) => !prev),
    []
  );
  const renderData = useMemo(
    () => (isExpanded ? brands : brands.slice(0, 5)),
    [isExpanded, brands]
  );
  const showToggle = brands.length > 5;

  return (
    <SectionMemo title="Бренды">
      <Flex wrap gap={10}>
        <AnimatePresence initial={false}>
          {renderData.map(({ id, name }) => (
            <AnimatedTag
              key={id}
              onClick={() =>
                onClickLabel({
                  type_id: BRAND_FILTER_TYPE_ID,
                  type_name: 'Бренды',
                  value_id: id,
                  value_name: name,
                })
              }
              style={{ cursor: 'pointer' }}
            >
              {name}
            </AnimatedTag>
          ))}
        </AnimatePresence>
        {showToggle && (
          <motion.div layout>
            <Tag
              onClick={toggleExpanded}
              color={isExpanded ? 'red' : '#9999'}
              style={{ color: 'black', cursor: 'pointer' }}
            >
              {isExpanded ? 'Скрыть' : '...'}
            </Tag>
          </motion.div>
        )}
      </Flex>
    </SectionMemo>
  );
};
BrandsRenderListTags.displayName = 'BrandsRenderListTags';

// Основной компонент ExpandedSpecification

const ExpandedSpecification = React.memo(
  ({
    specification,
    onClickLabel,
  }: {
    specification: Specification;
    onClickLabel: (props: onClickLabelProps) => void;
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = useCallback(
      () => setIsExpanded((prev) => !prev),
      [],
    );

    const renderData = useMemo(
      () =>
        isExpanded ? specification.values : specification.values.slice(0, 5),
      [isExpanded, specification],
    );

    const showTagExpanded = specification.values.length > 5;

    return (
      <Flex wrap gap={8}>
        <AnimatePresence initial={false}>
          {renderData.map(({ id, value, count }) => {
            const colors = getHexColorsFromRussian(value); // Извлекаем цвета из value

            return (
              <AnimatedTag
                key={id}
                onClick={() =>
                  onClickLabel({
                    type_id: specification.id,
                    type_name: specification.name,
                    value_id: id,
                    value_name: value,
                  })
                }
              >
                <Flex gap={4}>
                  {colors.length > 0 && <ColorBall colors={colors} />}
                  {/* Отображаем шарик, если есть цвета */}
                  <Text>{value}</Text>
                  <Text style={{ color: '#808185', opacity: '0.5' }}>
                    ({count})
                  </Text>
                </Flex>
              </AnimatedTag>
            );
          })}
        </AnimatePresence>
        {showTagExpanded && (
          <motion.div layout>
            <Tag
              onClick={toggleExpanded}
              color={isExpanded ? 'red' : '#9999'}
              style={{ color: 'black' }}
            >
              {isExpanded ? 'Скрыть' : '...'}
            </Tag>
          </motion.div>
        )}
      </Flex>
    );
  },
);

ExpandedSpecification.displayName = 'ExpandedSpecification';

// Элемент характеристики
const SpecificationsRenderItem = React.memo(
  ({
    specification,
    onClickLabel,
  }: {
    specification: Specification;
    onClickLabel: (props: onClickLabelProps) => void;
  }) => (
    <Flex vertical gap={4}>
      <Text strong>{specification.name}</Text>
      <ExpandedSpecification
        specification={specification}
        onClickLabel={onClickLabel}
      />
    </Flex>
  ),
);
SpecificationsRenderItem.displayName = 'SpecificationsRenderItem';

// Список характеристик
const SpecificationsRenderList = React.memo(
  ({
    specifications,
    onClickLabel,
  }: {
    specifications: Specification[];
    onClickLabel: (props: onClickLabelProps) => void;
  }) => (
    <SectionMemo title='Характеристики'>
      <Flex vertical gap={16}>
        <AnimatePresence>
          {specifications.map((spec) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div layout>
                <SpecificationsRenderItem
                  specification={spec}
                  onClickLabel={onClickLabel}
                />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </Flex>
    </SectionMemo>
  ),
);
SpecificationsRenderList.displayName = 'SpecificationsRenderList';

const tagMotionProps = {
  initial: { opacity: 0, scale: 0.8, x: 20 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.8, x: -20 },
  transition: { duration: 0.2 },
};

const RenderTagsList: React.FC<{
  selectedFilters: SelectFilteredType[];
  onClickLabel: (props: onClickLabelProps) => void;
  onClear: () => void;
}> = ({ selectedFilters, onClickLabel, onClear }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [selectedFilters]);

  return (
    <Flex
      gap={10}
      vertical
      style={{
        background: '#f5f5f5',
        padding: '16px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Кнопка сброса */}
      <div
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}
      >
        <Button
          type='primary'
          style={{
            width: '100%',
            backgroundColor: '#3D7BFF',
            border: 'none',
          }}
          onClick={onClear}
        >
          <Text style={{ color: '#fff' }}>Сбросить</Text>
        </Button>
      </div>

      {/* Прокручиваемый список тегов */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: 8,
          paddingBottom: 4,
        }}
      >
        <AnimatePresence initial={false}>
          {selectedFilters.map((filter) => (
            <motion.div
              key={filter.id}
              layout
              style={{ display: 'flex', gap: 4, flexShrink: 0 }}
              {...tagMotionProps}
            >
              <Text strong>{`${filter.name}:`}</Text>
              {filter.values.map(({ id, value }) => {
                const colors = getHexColorsFromRussian(value);
                return (
                  <div key={id}>
                    <Tag
                      closable
                      style={{display:"flex"}}
                      onClose={(e) => {
                        e.preventDefault();
                        onClickLabel({
                          type_id: filter.id,
                          type_name: filter.name,
                          value_id: id,
                          value_name: value,
                        });
                      }}
                    >
                      {colors.length > 0 && <ColorBall colors={colors} />}
                      <Text>{value}</Text>
                    </Tag>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Flex>
  );
};

// Главный компонент
export const FilterRenderMobile: React.FC<{ fetchData: FacetResponse }> = ({
  fetchData,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectFilteredType[]>(
    []
  );

  const onClickLabel = useCallback(
    ({ type_id, type_name, value_id, value_name }: onClickLabelProps) => {
      setSelectedFilters((prev) => {
        const existing = prev.find((t) => t.id === type_id);
        if (!existing) {
          return [
            ...prev,
            {
              id: type_id,
              name: type_name,
              values: [{ id: value_id, value: value_name, count: 0 }],
            },
          ];
        }
        const has = existing.values.find((v) => v.id === value_id);
        if (has) {
          const newVals = existing.values.filter((v) => v.id !== value_id);
          if (newVals.length === 0) {
            return prev.filter((t) => t.id !== type_id);
          }
          return prev.map((t) =>
            t.id === type_id ? { ...t, values: newVals } : t
          );
        } else {
          return prev.map((t) =>
            t.id === type_id
              ? {
                  ...t,
                  values: [
                    ...t.values,
                    { id: value_id, value: value_name, count: 0 },
                  ],
                }
              : t
          );
        }
      });
    },
    []
  );

  return (
    <Flex vertical gap={10} style={{ padding: '0', position: 'relative' }}>
      <AnimatePresence mode="wait">
        {selectedFilters.length > 0 && (
          <motion.div
            key="tags-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              zIndex: 2000,
              top: 0,
              position: 'sticky',
            }}
          >
            <RenderTagsList
              selectedFilters={selectedFilters}
              onClickLabel={onClickLabel}
              onClear={() => setSelectedFilters([])}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!!fetchData.categorys?.length && (
        <CategoriesRenderListTags
          categories={fetchData.categorys}
          onClickLabel={onClickLabel}
        />
      )}
      {!!fetchData.brands?.length && (
        <BrandsRenderListTags
          brands={fetchData.brands}
          onClickLabel={onClickLabel}
        />
      )}
      {!!fetchData.specifications?.length && (
        <SpecificationsRenderList
          specifications={fetchData.specifications}
          onClickLabel={onClickLabel}
        />
      )}
    </Flex>
  );
};