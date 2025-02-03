import { Link} from "@/i18n/routing";
import { Button } from "antd";
import { MappedCityType } from "api-mapping/city"
import { useLocale } from "next-intl";


interface CityButtonProps {
    City: MappedCityType
    setCityLocale: (city: { city: string; locale: string }) => void;
}

const CityButton: React.FC<CityButtonProps> = ({ City, setCityLocale }) => {
    const locale = useLocale();
    const url = `/city/${City['en']}/main`;
    const click = () => setCityLocale({ city: City['en'], locale });
    return <Link href={url} about={`Go to ${City['en']} shop sck` } onClick={click}><Button>{City[locale]}</Button>
    </Link>
}
export default CityButton