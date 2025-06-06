import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';
import rewritesUrl from './rewritesUrl';
import { NextConfig } from 'next';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';

const withNextIntl = createNextIntlPlugin();

const isSentryDisabled = process.env.DISABLE_SENTRY === 'true';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.scss': {
        loaders: [`sass-loader`],
        as: `*.css`,
      },
    },
  },
  trailingSlash: true,
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
    DISABLE_SENTRY: process.env.DISABLE_SENTRY,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental: {
    scrollRestoration: true,
    viewTransition: true, // Для плавного перехода между страницами
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

// Оборачиваем Sentry только если не отключён
const finalConfig = isSentryDisabled
  ? withNextIntl({
      webpack: (config, { isServer }) => {
        if (isSentryDisabled) {
          config.plugins = config.plugins.filter(
            (plugin: { constructor: { name: string } }) =>
              plugin.constructor.name !== 'SentryWebpackPlugin',
          );
          if (isSentryDisabled && isServer) {
            config.externals = [...(config.externals || []), '@sentry/node'];
          }
        }
        return config;
      },
      ...nextConfig,
    })
  : withSentryConfig(
      withNextIntl({
        webpack: (config) => {
          config.optimization.minimize = false;
          config.devtool = 'source-map';
          config.plugins.push(
            sentryWebpackPlugin({
              org: 'sergey-tc',
              project: 'sck-next',
              authToken: process.env.SENTRY_AUTH_TOKEN,
            }),
          );
          return config;
        },
        ...nextConfig,
      }),
      {
        org: 'sergey-tc',
        project: 'sck-next',
        silent: !process.env.CI,
        widenClientFileUpload: true,
        tunnelRoute: '/monitoring',
        disableLogger: true,
        automaticVercelMonitors: true,
      },
    );

export default finalConfig;
