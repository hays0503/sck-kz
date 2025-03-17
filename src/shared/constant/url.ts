export const ApiUrl = process.env.API_URL;
// const ApiPortV1 = `:${process.env.API_PORT_V1}`;
// const ApiAuthPortV1 = `:${process.env.API_AUTH_PORT_V1}`;
// const ApiBasketPortV1 = `:${process.env.API_BASKET_PORT_V1}`;
// const ApiAuthPortV2 = `:${process.env.API_AUTH_PORT_V2}`;
// const ApiBasketPortV2 = `:${process.env.API_BASKET_PORT_V2}`;

const UrlApiV1 = {
  getCity: `/api/v1/cities/`,
  getCategory: `/api/v1/category/`,
  
  getProducts: `/api/v1/products/`,
  getPopulates: `/api/v1/populates/`,
  getProductSpecifications: `/api/v1/specif/`,
  getProductReviews: `/api/v1/reviews/`,
  getDescription: `/api/v1/description/`,

  getBasket: `/basket_api/v1/basket/`,
  getOrder: `/basket_api/v1/order/`,

  getUser: `/auth_api/v1/`
};

const UrlApiV2 = {
  ...UrlApiV1,
  getProducts: `/api/v2/products/`, 
  getPopulates: `/api/v2/populates/`,

  getBasket: `/basket_api/v2/basket/`,
  getOrder: `/basket_api/v2/order/`,

  getUser: `/auth_api/v2/`,
};

const UrlApiWithDomainV1 = {
  getCity: `${process.env.API_URL}:${process.env.API_PORT_V1}/api/v1/citys/`, // Опечатка
  getCategory: `${process.env.API_URL}:${process.env.API_PORT_V1}/api/v1/category/`,
  getPopulates: `${process.env.API_URL}:${process.env.API_PORT_V1}/api/v1/populates/`,
  getProducts: `${process.env.API_URL}:${process.env.API_PORT_V1}/api/v1/products/`,
  getProductReviews: `${process.env.API_URL}:${process.env.API_PORT_V1}/api/v1/reviews/`,
  getProductSpecifications: `${process.env.API_URL}:${process.env.API_PORT_V1}/api/v1/specif/`,
  getProductDescription: `${process.env.API_URL}:${process.env.API_PORT_V1}/api/v1/descrip/`, // Опечатка

  getBasket: `${process.env.API_URL}:${process.env.API_BASKET_PORT_V1}/basket_api/v1/bascket/`, // Опечатка
  getOrder: `${process.env.API_URL}:${process.env.API_BASKET_PORT_V1}/basket_api/v1/order/`,

  getUser: `${process.env.API_URL}:${process.env.API_AUTH_PORT_V1}/auth_api/v1/`,
};

const UrlApiWithDomainV2 = {
  ...UrlApiWithDomainV1,
  getProducts: `${process.env.API_URL}:${process.env.API_PORT_V1}/api/v2/products_v2/`,
  getPopulates: `${process.env.API_URL}:${process.env.API_PORT_V1}/api/v2/products_v2/popular_set/`,

  getBasket: `${process.env.API_URL}:${process.env.API_BASKET_PORT_V2}/basket_api/v1/bascket/`, // Опечатка
  getOrder: `${process.env.API_URL}:${process.env.API_BASKET_PORT_V2}/basket_api/v1/order/`,

  getUser: `${process.env.API_URL}:${process.env.API_AUTH_PORT_V2}/auth_api/v1/`,
};

const revalidateDefault = 60;

const UrlRevalidateV1 = {
  getCity: {
    next: {
      tags: [UrlApiV1.getCity],
      revalidate: revalidateDefault,
    },
  },
  getCategory: {
    next: {
      tags: [UrlApiV1.getCategory],
      revalidate: revalidateDefault,
    },
  },
  getPopulates: {
    next: {
      tags: [UrlApiV1.getPopulates],
      revalidate: revalidateDefault,
    },
  },
  getProducts: {
    next: {
      tags: [UrlApiV1.getProducts],
      revalidate: revalidateDefault,
    },
  }
};

const UrlRevalidateV2 = {
  ...UrlRevalidateV1,
  getProducts: {
    next: {
      tags: [UrlApiV2.getProducts],
      revalidate: revalidateDefault,
    },
  },
  getPopulates: {
    next: {
      tags: [UrlApiV2.getPopulates],
      revalidate: revalidateDefault,
    },
  },
};

export { UrlApiV1, UrlApiWithDomainV1, UrlRevalidateV1 };
export { UrlApiV2, UrlApiWithDomainV2, UrlRevalidateV2 };
