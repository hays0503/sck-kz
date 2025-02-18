export type orderByType = "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price";

export const checkOrderByType = (value: string): value is orderByType => {
  return ["avg_rating", "-avg_rating", "stocks__price", "-stocks__price","none_sort"].includes(value);
};