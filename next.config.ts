import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  // staticPageGenerationTimeout: 1000,
  env:{
    HOST_URL:process.env.HOST_URL,
    HOST_PORT:process.env.HOST_PORT,
    API_URL:process.env.API_URL,
    API_PORT:process.env.API_PORT,
    API_AUTH_PORT:process.env.API_AUTH_PORT,
    API_BASKET_PORT:process.env.API_BASKET_PORT
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental: {
    turbo: {
      rules: {
        "*.scss": {
          loaders: [`sass-loader`],
          as: `*.css`,
        },
      },
    },
  },
  pageExtensions: [`mdx`, `md`, `jsx`, `js`, `tsx`, `ts`],
  
  async redirects() {
    return [
      {
        source: `/`,
        destination: `/ru/city/Karaganda/main`,
        permanent: true,
      },
      {
        source: `/:lang/city/:city/catalog/menu`,
        destination: `/:lang/city/:city/catalog/menu/main`,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Запрос городов
      {
        source: `/api/v1/citys`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/api/v1/citys/`,
      },
      // Запрос категории
      {
        source: `/api/v1/category`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/api/v1/category/`,
      },
      //Список всех популярных продуктов
      {
        source: `/api/v1/populates`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/api/v1/populates/`,
      },
      // Список всех продуктов
      {
        source: `/api/v1/products`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/api/v1/products/`,
      },
      // Детали конкретного продукта по его слагу
      {
        source: `/api/v1/products/:slug_prod`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/api/v1/products/:slug_prod/`,
      },
      // Фильтрация продуктов по категории
      {
        source: `/api/v1/products/filter_by_cat/:slug_cat`,
        destination:
          `${process.env.API_URL}:${process.env.API_PORT}/api/v1/products/filter_by_cat/:slug_cat/`,
      },
      // Получение списка слагов всех продуктов
      {
        source: `/api/v1/products/all/slugs`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/api/v1/products/all/slugs/`,
      },
      //Получение продуктов по списку идентификаторов
      {
        source: `/api/v1/products/by_ids/:ids`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/api/v1/products/by_ids/:ids/`,
      },
      //Фильтрация продуктов по различным параметрам
      {
        source: `/api/v1/products/set/filter`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/api/v1/products/set/filter/`,
      },
      // ревью (обзоры)
      {
        source: `/api/v1/reviews/filter_by_prod/:prod_pk`,
        destination:
          `${process.env.API_URL}:${process.env.API_PORT}/api/v1/reviews/filter_by_prod/:prod_pk/`,
      },
      //Спецификации на товар
      {
        source: `/api/v1/specif/filter_by_prod/:prod_pk`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/api/v1/specif/filter_by_prod/:prod_pk/`,
      },
      //Спецификации на товар
      {
        source: `/api/v1/specif/configurations/:prod_pk*`,
        destination: `http://185.100.67.246:${process.env.API_PORT}/api/v1/specif/configurations/:prod_pk*/`,
      },
      //Поиск продуктов
      {
        source: `/search/product/:search_text`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/search/product/:search_text/`,
      },

      // Обработка картинок (проксирование)
      {
        source: `/media/product_images/:patch*`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/media/product_images/:patch*/`,
      },

      // api корзины
      // Запрос данных их корзины
      {
        source: `/basket_api/v1/bascket/:url*`,
        destination: `${process.env.API_URL}:${process.env.API_BASKET_PORT}/basket_api/v1/bascket/:url*/`,
      },

      // api заказа
      {
        source: `/basket_api/v1/order/:url*`,
        destination: `${process.env.API_URL}:${process.env.API_BASKET_PORT}/basket_api/v1/order/:url*/`,
      },

      //api по работе с пользователем
      // Запрос данных пользователя (инфо)
      {
        source: `/auth_api/v1/user/info`,
        destination: `${process.env.API_URL}:${process.env.API_AUTH_PORT}/auth_api/v1/user/info`,
      },
      {
        source: `/auth_api/v1/token/refresh`,
        destination: `${process.env.API_URL}:${process.env.API_AUTH_PORT}/auth_api/v1/token/refresh`,
      },

      //api по работе с пользователем
      //Получение ссылки на авторизацию google
      {
        source: `/auth_api/v1/auth_user/login/google`,
        destination:
          `${process.env.API_URL}:${process.env.API_AUTH_PORT}/auth_api/v1/auth_user/login/google/`,
      },
      //api по работе с пользователем
      // Создаем пользователя через акаунт google
      {
        source: `/auth_api/v1/auth_user/auth/google`,
        destination: `${process.env.API_URL}:${process.env.API_AUTH_PORT}/auth_api/v1/auth_user/auth/google`,
      },

      //api по работе с пользователем
      //Endpoint для отправки sms-кода
      {
        source: `/auth_api/v1/auth_user/login/phone`,
        destination: `${process.env.API_URL}:${process.env.API_AUTH_PORT}/auth_api/v1/auth_user/login/phone`,
      },
      //api по работе с пользователем
      //Через данный endpoint будут выданы ключи доступа.
      {
        source: `/auth_api/v1/auth_user/auth/phone`,
        destination: `${process.env.API_URL}:${process.env.API_AUTH_PORT}/auth_api/v1/auth_user/auth/phone`,
      },
      //api по работе с пользователем
      //Endpoint для обновления токенов
      {
        source: `/auth_api/v1/token/refresh`,
        destination: `${process.env.API_URL}:${process.env.API_AUTH_PORT}/auth_api/v1/token/refresh`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
