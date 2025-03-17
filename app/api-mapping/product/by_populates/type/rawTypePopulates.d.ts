export interface rawTypePopulates {
    count: number
    next: string
    previous: string
    results: rawResult[]| []
  }
  
export interface rawResult {
  id: number
  vendor_code: string
  slug: string
  name_product: string
  additional_data: rawAdditionalData
  category: rawCategory
  brand: rawBrand
  images: rawImage[]
  related_edges: object[] | []
  avg_rating: object | null
  reviews_count: number
  stocks: rawStocks
  discount?: rawDiscount
  tags: object[]  | []
  specifications: rawSpecification[]
  reviews: object[]  | []
  reviews_url: string
  desc_url: string
  related_products_url: string
  configuration_url: string
}
  
export interface rawAdditionalData {
    [key: string]: string
}
  
export interface rawCategory {
  id: number
  name_category: string
  slug: string
  parent: number
  parent_category_name: string
  additional_data: rawAdditionalData
}
export interface rawBrand {
  id: number
  name_brand: string
  additional_data: rawAdditionalData
}
  
export interface rawImage {
  image: string
}
  
  export interface rawStocks {
    [key: string]: rawGeneratedType
  }
  
  export interface rawGeneratedType {
    price: number
    price_before_discount: number
    quantity: number
    edge: boolean
    transportation_cost: object | null
    estimated_delivery_days: object | null
  }  
  
  export interface rawDiscount {
    id: number
    name: string
    amount: string
    description: string
  }
  
  export interface rawSpecification {
    id: number
    name_specification: NameSpecification
    value_specification: ValueSpecification
    product: number
  }
  
  export interface rawNameSpecification {
    id: number
    additional_data: rawAdditionalData
    name_specification: string
  }

  
  export interface rawValueSpecification {
    id: number
    additional_data: rawAdditionalData
    value_specification: string
  }
