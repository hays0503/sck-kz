import { Link } from '@/i18n/routing';
import { Button, Tooltip } from 'antd';
import { MappedCityType } from 'api-mapping/city';
import { useLocale, useTranslations } from 'next-intl';

interface CityButtonProps {
  City: MappedCityType;
  setCityLocale: (city: { city: string; locale: string }) => void;
}

const CityButton: React.FC<CityButtonProps> = ({ City, setCityLocale }) => {
  const locale = useLocale();
  const url = `/city/${City['en']}/main`;
  const click = () => setCityLocale({ city: City['en'], locale });
  const t = useTranslations('CityButton');
  const key = locale === 'en' ? 'en' : locale === 'kk' ? 'kk' : 'ru';

  return (
    <Link href={url} about={`Go to ${City['en']} shop sck`} onClick={click}>
      {City['disabled'] ? (
        <Tooltip title={t('v-etom-gorode-zakonchilis-tovary')}>
          <Button disabled={City['disabled']}>{City[key] as string}</Button>
        </Tooltip>
      ) : (
        <Button>{City[key] as string}</Button>
      )}
    </Link>
  );
};
export default CityButton;
