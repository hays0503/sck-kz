"use client";
import { useParams } from "next/navigation";

export const useGetCityParams = () => {
  const params = useParams<{ city: string }>();
  return params?.city??"";
};
