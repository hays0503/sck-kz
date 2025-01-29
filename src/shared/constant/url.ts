
export const ApiUrl = process.env.API_URL
const ApiPort = `:${process.env.API_PORT}`
const ApiAuthPort = `:${process.env.API_AUTH_PORT}`
const ApiBasketPort = `:${process.env.API_BASKET_PORT}`

const UrlApiV1 = {
  //Запрос всех городов
  getCity: `/api/v1/citys/`,
  getCategory: `/api/v1/category/`,
  getPopulatesId: `/api/v1/populates/`,
  getProducts: `/api/v1/products/`,
  getProductSpecificationsById: `/api/v1/specif/`,
  getProductReviewsById: `/api/v1/reviews/filter_by_prod/`,
  getDescription: `/api/v1/descrip/`,

  getBasketApi: `/basket_api/v1/bascket`,
  getOrderApi: `/basket_api/v1/order`,

  getUserInfoApi: `/auth_api/v1/user/info`,
  getUserRefreshTokenApi: `/auth_api/v1/token/refresh`,

  getUserUrlGoogle: `/auth_api/v1/auth_user/login/google`,
  getUserAuthGoogle: `/auth_api/v1/auth_user/auth/google`,

  getUserSmsUrl: `/auth_api/v1/auth_user/login/phone`,
  getUserSmsAuth: `/auth_api/v1/auth_user/auth/phone`,
};

const UrlApiV2 = {
    getProducts: `/api/v2/products_v2/`,
    getProductsPopulates: `/api/v2/products_v2/popular_set/`,
    getProductsByCategory: `/api/v2/products_v2/category/`,
    getProductsByIds:`/api/v2/products_v2/filter_by_ids/`,
    getProductsBySlug:`/api/v2/products_v2/details/`
}

const UrlApiWithDomainV1 = {
  getCity: `${ApiUrl}${ApiPort}${UrlApiV1.getCity}`,
  getCategory: `${ApiUrl}${ApiPort}${UrlApiV1.getCategory}`,
  getPopulatesId: `${ApiUrl}${ApiPort}${UrlApiV1.getPopulatesId}`,
  getProducts: `${ApiUrl}${ApiPort}${UrlApiV1.getProducts}`,
  getProductSpecificationsById: `${ApiUrl}${ApiPort}${UrlApiV1.getProductSpecificationsById}`,
  getProductReviewsById: `${ApiUrl}${ApiPort}${UrlApiV1.getProductReviewsById}`,
  getDescription: `${ApiUrl}${ApiPort}${UrlApiV1.getDescription}`,

  getBasketApi: `${ApiUrl}${ApiBasketPort}${UrlApiV1.getBasketApi}`,
  getOrderApi: `${ApiUrl}${ApiBasketPort}${UrlApiV1.getOrderApi}`,

  getUserInfoApi: `${ApiUrl}${ApiAuthPort}${UrlApiV1.getUserInfoApi}`,

  getUserUrlGoogle: `${ApiUrl}${ApiAuthPort}${UrlApiV1.getUserUrlGoogle}`,
  getUserAuthGoogle: `${ApiUrl}${ApiAuthPort}${UrlApiV1.getUserAuthGoogle}`,

  getUserSmsUrl: `${ApiUrl}${ApiAuthPort}${UrlApiV1.getUserSmsUrl}`,
  getUserSmsAuth: `${ApiUrl}${ApiAuthPort}${UrlApiV1.getUserSmsAuth}`,

  getUserRefreshTokenApi: `${ApiUrl}${ApiAuthPort}${UrlApiV1.getUserRefreshTokenApi}`,
};

const UrlApiWithDomainV2 = {
  getProducts: `${ApiUrl}${ApiPort}${UrlApiV2.getProducts}`,
  getProductsPopulates: `${ApiUrl}${ApiPort}${UrlApiV2.getProductsPopulates}`,
  getProductsByCategory: `${ApiUrl}${ApiPort}${UrlApiV2.getProductsByCategory}`,
  getProductsByIds: `${ApiUrl}${ApiPort}${UrlApiV2.getProductsByIds}`,
  getProductsBySlug: `${ApiUrl}${ApiPort}${UrlApiV2.getProductsBySlug}`,
}

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
  getPopulatesId: {
    next: {
      tags: [UrlApiV1.getPopulatesId],
      revalidate: revalidateDefault,
    },
  },
  getProducts: {
    next: {
      tags: [UrlApiV1.getProducts],
      revalidate: revalidateDefault,
    },
  },
  getProductSpecificationsById: {
    next: {
      tags: [UrlApiV1.getProductSpecificationsById],
      revalidate: revalidateDefault,
    },
  },
  getProductReviewsById: {
    next: {
      tags: [UrlApiV1.getProductReviewsById],
      revalidate: revalidateDefault,
    },
  },
};

const UrlRevalidateV2 = {
  getProducts: {
    next: {
      tags: [UrlApiV2.getProducts],
      revalidate: revalidateDefault,
    },
  },
  getProductsPopulates: {
    next: {
      tags: [UrlApiV2.getProductsPopulates],
      revalidate: revalidateDefault,
    },
  },
};

export { UrlApiV1, UrlApiWithDomainV1, UrlRevalidateV1 };
export { UrlApiV2, UrlApiWithDomainV2, UrlRevalidateV2 };
