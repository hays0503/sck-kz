

export interface MappedCategoryType {
    slug: string;
    name:{
        readonly [key: string]: string
    }
    img: string[]|[];
    banner: string[]|[]
    children: MappedCategoryType[]|[]
}

