// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

if (process.env.DISABLE_SENTRY !== 'true') {
  Sentry.init({
    dsn: 'https://621a083fd8692e69ed97b7d61987fe62@o4509040544251904.ingest.de.sentry.io/4509044989231184',

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
