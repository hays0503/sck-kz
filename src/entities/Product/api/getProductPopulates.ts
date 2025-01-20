import { MappedPopularProductType } from "api-mapping/product/populates";



interface getProductPopulatesProps {
    city: string;
    orderBy: "avg_rating"|"-avg_rating"|"stocks__price"|"-stocks__price";
    page: number;
}

export type getProductResult = 
{
    len: number
    results: MappedPopularProductType[]
}


const getProductPopulates = async ({city,orderBy,page}: getProductPopulatesProps):Promise<getProductResult> => {

    // Поверка на корректность orderBy   
    const isCorrectOrderBy = !orderBy || ["avg_rating", "-avg_rating", "stocks__price", "-stocks__price"].includes(orderBy);

    // Пресутсвуют ли обязательные параметры   
    if (!isCorrectOrderBy || !city || !page) {
        console.error("getProductPopulates error", "isCorrectOrderBy", isCorrectOrderBy, "city", city, "page", page)
        return {
            len: 0,
            results: []
        };
    }

    const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : ""
    const url = `${process.env.HOST_URL}${host_port}/api-mapping/product/populates?order=${orderBy}&city=${city}&page=${page}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        console.error("getProductPopulates error", "response", response)
        return {
            len: 0,
            results: []
        };
    }

    return response.json();
}

export default getProductPopulates
