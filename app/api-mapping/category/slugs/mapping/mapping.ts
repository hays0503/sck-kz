import { rawTypeCategory } from "api-mapping/category/_type/rawTypeCategory";

function collectSlugs(category: rawTypeCategory): string[] {
  const slugs: string[] = [category.slug];

  if (category.children && category.children.length > 0) {
    for (const child of category.children) {
      slugs.push(...collectSlugs(child));
    }
  }

  return slugs;
}

const mapping = (rawData: rawTypeCategory[]): { results: string[] } => {
  const slugs = rawData
    .map((category: rawTypeCategory) => collectSlugs(category))
    .flat();

  return {
    results: slugs,
  };
};

export default mapping;
