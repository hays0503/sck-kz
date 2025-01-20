
const getCategorySlugs = async (): Promise<{results:string[]}|undefined> => {
  const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : "";
  const url = `${process.env.HOST_URL}${host_port}/api-mapping/category/slugs`;
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

export default getCategorySlugs;
