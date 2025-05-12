

export interface MappedCategoryWithoutChildrenType {
    id: number;
    slug: string;
    name:{
        readonly [key: string]: string
    }
    img: string[]|[];
    banner: string[]|[]
}

