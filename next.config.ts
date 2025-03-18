import createNextIntlPlugin from 'next-intl/plugin';
import rewritesUrl from './rewritesUrl';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  // staticPageGenerationTimeout: 1000,
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com',
      },
      {
        hostname: 'sck-kz',
      },
      {
        hostname: 'sck.kz',
      },
      {
        hostname: '185.100.67.246',
      },
      {
        hostname: '127.0.0.1',
      },
      {
        hostname: 'resources.cdn-kaspi.kz',
      },
    ],
  },
  env: {
    HOST_URL: process.env.HOST_URL,
    HOST_PORT: process.env.HOST_PORT,
    API_URL: process.env.API_URL,
    API_PORT_V1: process.env.API_PORT_V2,
    API_AUTH_PORT_V2: process.env.API_AUTH_PORT_V2,
    API_BASKET_PORT_V2: process.env.API_BASKET_PORT_V2,

    HYPERDX_API_KEY: process.env.HYPERDX_API_KEY,
    OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (
    config: { ignoreWarnings: { module: RegExp }[] },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { isServer }: any,
  ) => {
    if (isServer) {
      config.ignoreWarnings = [{ module: /opentelemetry/ }];
    }
    return config;
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental: {
    turbo: {
      rules: {
        '*.scss': {
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
    return await rewritesUrl();
  },
};

export default withNextIntl(nextConfig);
