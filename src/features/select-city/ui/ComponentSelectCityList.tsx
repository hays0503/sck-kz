"use client";
import { CityButton } from "@/entities/City";
import { Space } from "antd";
import { MappedCityType } from "api-mapping/city";


export default function ComponentSelectCityList({
  cities,
  setCityLocale
}: {
  cities: MappedCityType[];
  setCityLocale: (city: { city: string; locale: string }) => void;
}) {
  return (
    <>
      <Space size={[8, 16]} wrap >
        {cities?.map((city: MappedCityType, index) => (
            <CityButton City={city} key={index} setCityLocale={setCityLocale}/>
        ))}
      </Space>
    </>
  );
}
