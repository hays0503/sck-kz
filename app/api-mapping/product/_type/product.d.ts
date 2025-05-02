export interface MappedProductType {
    results: any;
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
}