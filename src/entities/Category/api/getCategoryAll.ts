import { MappedCategoryType } from "api-mapping/category/all/type";

const getCategoryAll = async (): Promise<{results:MappedCategoryType[]}> => {
  const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : "";
  const url = `${process.env.HOST_URL}${host_port}/api-mapping/category/all`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("getCategory error", "response", response);
    return {results:[]};
  }

  const data = await response.json();

  return data;
};

export default getCategoryAll;
