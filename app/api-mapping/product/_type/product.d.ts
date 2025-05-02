export interface TagType {
  id: number;
  tag_text: string;
  font_color: string;
  fill_color: string;
  additional_data: Record<string, string|null>;
}


export interface MappedProductType {
    id: number;
    slug: string;
    name: Record<string, string|null>;
    img: string[];
    rating: number|null;
    price: number;
    oldPrice: number|null;
    reviews: number;
    discount: string|null;
    brand: Record<string, string|null>;
    tags: TagType[];
}