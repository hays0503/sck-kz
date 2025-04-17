import { MappedBasketType } from "../../get-products/type/MappedBasketType";


const delProduct = (
  basket: MappedBasketType,
  prod_ids: number[],
): MappedBasketType => {
  // Удаляем вхождение
  const filtered = basket.items.filter(
    (item) => !prod_ids.includes(item.prod.id),
  );
  return { items: filtered };
};
export default delProduct;
