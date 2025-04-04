// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

if (process.env.DISABLE_SENTRY !== 'true') {
  Sentry.init({
    dsn: 'https://621a083fd8692e69ed97b7d61987fe62@o4509040544251904.ingest.de.sentry.io/4509044989231184',

    // Add optional integrations for additional features
    integrations: [
      Sentry.replayIntegration({
        networkCaptureBodies: true,
        networkDetailAllowUrls: [/.*/],
        networkRequestHeaders: ['X-Custom-Header'],
        networkResponseHeaders: ['X-Custom-Header'],
        maskAllText: false,
        maskAllInputs: false,
        blockAllMedia: false,
      }),
      Sentry.replayCanvasIntegration({
        // Enabling the following will ensure your canvas elements are not forced
        // into `preserveDrawingBuffer`.
        enableManualSnapshot: true,
      }),
    ],

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Define how likely Replay events are sampled.
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 1,

    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
