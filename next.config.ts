import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';
import rewritesUrl from './rewritesUrl';
import { NextConfig } from 'next';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  webpack: (
    config
  ) => {
    config.optimization.minimize = false;
    config.compress = false;
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
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental: {
    // reactCompiler: {
    //   // Поддержка компилятора react
    //   compilationMode: 'all',
    //   panicThreshold: 'ALL_ERRORS',
    // },
    viewTransition: true, // Для плавного перехода между страницами
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

export default withSentryConfig(withNextIntl(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'sergey-tc',
  project: 'sck-next',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
