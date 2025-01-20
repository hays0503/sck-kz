import { useRouter } from "@/i18n/routing";
import { Button } from "antd";
import { MappedCityType } from "api-mapping/city"
import { useLocale } from "next-intl";


interface CityButtonProps {
    City: MappedCityType
    setCityLocale: (city: { city: string; locale: string }) => void;
}

const CityButton: React.FC<CityButtonProps> = ({City, setCityLocale}) => {
    const locale = useLocale();
    const router = useRouter();
    return <Button
                onClick={() => {
                    router.push(`/city/${City['en']}/main`);
                    setCityLocale({city: City['en'], locale});            
                }}
            >
            {City[locale]}
            </Button>
}
export default CityButton