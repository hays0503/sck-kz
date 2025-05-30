import { MappedCityType } from "api-mapping/city";


const searchCity = (value: string, cities: MappedCityType[], locale: string) => {
  if (!cities || !Array.isArray(cities) || cities.length === 0) {
    return [];
  }

  if (!locale) {
    return [];
  }

  const key = locale === 'en' ? 'en' : locale === 'kk' ? 'kk' : 'ru';

  const data =  cities.filter((city: MappedCityType) => {
    const cityName = city[key];
    return cityName?.toLowerCase().includes(value.toLowerCase()) ?? false;
  });
  return data;
};
export default searchCity;
