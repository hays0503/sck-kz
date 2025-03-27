import { MappedCityType } from "api-mapping/city";

const getCity = async (): Promise<MappedCityType[]> => {

    const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : ""
    const url = `${process.env.HOST_URL}${host_port}/api-mapping/city`;
    const response = await fetch(url, {
        method: 'GET',
        next: { revalidate: 600 },
        headers: {
          'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error("getCity error", "response", response)
        return [];
    }

    const data = await response.json(); 

    return data;
}

export default getCity