import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";


const getCategoryRoot = async (city:string): Promise<{results:MappedCategoryWithoutChildrenType[]}|undefined> => {
  const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : "";
  const url = `${process.env.HOST_URL}${host_port}/api-mapping/category/root/?city=${city}`;
  console.log({url})
  const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 600 },
      headers: {
        'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
    console.error("getCategory error", "response", response);
    return undefined;
  }

  const results = await response.json();

  return results;
};

export default getCategoryRoot;
