import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";


const getCategoryRoot = async (): Promise<{results:MappedCategoryWithoutChildrenType[]}|undefined> => {
  const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : "";
  const url = `${process.env.HOST_URL}${host_port}/api-mapping/category/root`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
