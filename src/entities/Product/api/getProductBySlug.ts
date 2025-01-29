import { MappedProductDetailType } from "api-mapping/product/_type/productDetail";


interface getProductByCategoryProps {
    slug:string;
    city: string;
}


const getProductBySlug = async ({slug,city}: getProductByCategoryProps):Promise<MappedProductDetailType> => {

    // Пресутсвуют ли обязательные параметры   
    if (!slug ||  !city ) {
        console.error("getProductBySlug error", "slug", slug, "city", city)
        return {} as MappedProductDetailType;
    }

    const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : ""
    const url = `${process.env.HOST_URL}${host_port}/api-mapping/product/by_slug/?slug=${slug}&city=${city}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        console.error("getProductPopulates error", "response", response)
        return {} as MappedProductDetailType;;
    }

    return response.json();
}

export default getProductBySlug
