import { MappedProductDetailType } from "api-mapping/product/_type/productDetail";


interface getProductByCategoryProps {
    slug:string;
    city: string;
}

type responseTypeProductBySlug = {
    url: string;
    data: MappedProductDetailType | object;
    statusCode: number;
}


const getProductBySlug = async ({slug,city}: getProductByCategoryProps):Promise<responseTypeProductBySlug> => {

    // Пресутсвуют ли обязательные параметры   
    if (!slug ||  !city ) {
        console.error("getProductBySlug error", "slug", slug, "city", city)
        return {
            url: "",
            data: {},
            statusCode: 400
        }
    }

    const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : ""
    const url = `${process.env.HOST_URL}${host_port}/api-mapping/product/by_slug/?slug=${slug}&city=${city}`;
    console.log(url)
    let response:Response;
    try {
        response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
    
        if (!response.ok) {
            return {
                url: "",
                data: response.json(),
                statusCode: response.status
            };        
        }
    
        return {
            url: url,
            data: await response.json(),
            statusCode: response.status
        }
    } catch (error) {
        return {
            url: "",
            data: {detail:JSON.stringify(error)},
            statusCode: 500
        }
    }

}

export default getProductBySlug
