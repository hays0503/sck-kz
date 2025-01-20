import { getCategorySlugs } from "./api/getCategorySlugs";



export async function GET(): Promise<Response> {
    return getCategorySlugs()
};

