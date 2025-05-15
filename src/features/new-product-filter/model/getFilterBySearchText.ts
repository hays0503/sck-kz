import { UrlApiWithDomainV1, UrlApiWithDomainV2 } from "@/shared/constant/url";

type SpecificationType = Map<
  string,
  Map<string, { disabled: boolean; productIds: Set<number>,a:string }>
>;
type ProductSpecsType = {
  id: number;
  name_specification: {
    id: number;
    additional_data: {
      en: string;
      kk: string;
    };
    name_specification: string;
  };
  value_specification: {
    id: number;
    additional_data: {
      en: string;
      kk: string;
    };
    value_specification: string;
  };
  product: number;
};

class GetFilterBySearchText {
  queryText: string;


  constructor(slugCategory: string) {
    this.queryText = slugCategory;
  }

  // Получаем список продуктов из категории
  async getProductIdsBySearchText(searchText: string): Promise<number[]> {

    const urlProductsBySearchText = `${UrlApiWithDomainV2.getProducts}?search=${searchText}&limit=9999999999`;

    let responseProductsBySearchText: Response;
    
    try {
      // Запрос продуктов по категории
      responseProductsBySearchText = await fetch(urlProductsBySearchText,{
        cache:"force-cache",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }        
      });
    } catch (error) {
      console.log("Ошибка при запросе продуктов", error);
      return [];
    }

    try {
      // Парсим данные
      const {results:data} = await responseProductsBySearchText.json();
      try {
        // Получаем из массива продуктов id продуктов
        if (!Array.isArray(data)) {
          throw new Error("Запрашиваемы данные не является массивом");
        }
        if (Array.isArray(data) && data.length === 0) {
          throw new Error("Запрашиваемы данные являются пустым массивом ");
        }
        const productIds = data.map((product) => product.id);
        return productIds;
      } catch (error) {
        console.error("Ошибка при получении id продуктов", error);
        return [];
      }
    } catch (error) {
      console.error("Ошибка при парсинге продуктов", error);
      return [];
    }
  }

  async getRawSpecsByProductIds(productIds: number[]): Promise<ProductSpecsType[]> {
    if (!productIds.length) {
      console.error("Список идентификаторов продуктов пуст");
      return [];
    }
  
    // Разделение массива на порции (если API не поддерживает слишком длинный запрос)
    const batchSize = 50; // Максимальное количество ID за один запрос
    const batches = [];
    for (let i = 0; i < productIds.length; i += batchSize) {
      batches.push(productIds.slice(i, i + batchSize));
    }
  
    let allSpecs: ProductSpecsType[] = [];
  
    for (const batch of batches) {
      const url = `${UrlApiWithDomainV1.getProductSpecifications}configurations/${batch.join(",")}/`;
      try {
        const response = await Promise.race([
          fetch(url, {
            cache: "force-cache",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 10000) // Тайм-аут 10 секунд
          ),
        ]);
  
        if (!response.ok) {
          console.error(`Ошибка запроса: ${response.status} ${response.statusText}`);
          continue;
        }
  
        const data: ProductSpecsType[] = await response.json();
        allSpecs = allSpecs.concat(data);
      } catch (error) {
        console.error("Ошибка при обработке запроса", error);
      }
    }
  
    return allSpecs;
  }

  // Получаем сырые данные спецификаций и разбираем их
  async getRawSpecsByProductIdsAndParse(
    productIds: number[]
  ): Promise<SpecificationType | undefined> {
    // Получаем сырые данные спецификаций
    const productSpecs = await this.getRawSpecsByProductIds(productIds);

    let specifications: SpecificationType;
    try {
      specifications = this.parseSpecifications(productSpecs);
    } catch (error) {
      console.log("Ошибка при разборе спецификации по продуктам", error);
      return undefined;
    }

    return specifications;
  }

  intersection(setA: Set<number>, setB: number[]):Set<number> {
    const _intersection = new Set<number>();
    for (const elem of setB) {
      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }
    return _intersection;
  }


  union(setA: Set<number>, setB:number[]):Set<number> {
    const _union = new Set<number>(setA);
    for (const elem of setB) {
      _union.add(elem);
    }
    return _union;
  }

  // Получаем активные фильтры
  getActiveFilters(
    Specifications: SpecificationType,
    ActiveFilter: number[]
  ): {filter:SpecificationType,ids:Set<number>} {
    const newFilter = new Map()
    const idsActive = new Set<number>()
    Specifications.forEach((valueType,keyType)=>{
      const newValue = new Map();
      let trashCount = 0;
      valueType.forEach((value,key)=>{
        const intersection:Set<number> = this.intersection(value.productIds,ActiveFilter)
        if(intersection.size>0){
          intersection.forEach((i)=>idsActive.add(i))
          newValue.set(key,{disabled:false,productIds:intersection,a:Array.from(intersection).join(',')})
        }else{
          trashCount=trashCount+1;
          newValue.set(key,{disabled:true,productIds:new Set<number>()})
        }
      })
      if(trashCount!==newValue.size)
        newFilter.set(keyType,newValue)
    })


    return {filter:newFilter,ids:idsActive}
  }
  


  //Разбор спецификаций
  parseSpecifications(productSpecs: ProductSpecsType[]): SpecificationType {
    const specifications: SpecificationType = new Map();

    productSpecs.forEach((item: ProductSpecsType) => {
      const specKey = item.name_specification.name_specification; // Имя спецификации
      const specValue = item.value_specification.value_specification; // Значение спецификации

      if (specKey && specValue) {
        // Получаем текущую карту значений для ключа спецификации или создаем новую
        const valueMap =
          specifications.get(specKey) ??
          new Map<string, { disabled: boolean; productIds: Set<number>,a:string }>();

        // Получаем текущий набор ID продуктов для значения спецификации или создаем новый
        const productIdSet =
          valueMap.get(specValue)?.productIds ?? new Set<number>();

        // Добавляем ID продукта
        productIdSet.add(item.product);

        // Обновляем карту значений
        valueMap.set(specValue, { disabled: false, productIds: productIdSet,a:Array.from(productIdSet).join(',') });

        // Обновляем спецификацию
        specifications.set(specKey, valueMap);
      }
    });

    return specifications;
  }

  specificationsMapToObject = (map: SpecificationType) =>
    Array.from(map).map(([key, value]) => {
      return {
        key,
        value: Array.from(value).map(([_key, _value]) => {
          return {
            key: _key,
            value: {
              disabled: _value.disabled,
              productIds: Array.from(_value.productIds),
            },
          };
        }),
      };
    });
}

export default GetFilterBySearchText;
