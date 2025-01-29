

export interface MappedCategoryType {
    id: number;
    slug: string;
    name:{
        readonly [key: string]: string
    }
    parent: number | null;
    img: string[]|[];
    banner: string[]|[]
    children: MappedCategoryType[]|[]
}

