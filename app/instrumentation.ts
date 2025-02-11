import { env } from 'process';

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      const { init } = await import('@hyperdx/node-opentelemetry');
      init({
        consoleCapture: true, // optional, default: true
        apiKey: env.HYPERDX_API_KEY, // optionally configure via `HYPERDX_API_KEY` env var
        service: 'SCK', // optionally configure via `OTEL_SERVICE_NAME` env var
        additionalInstrumentations: [], // optional, default: []
      });
    }
  }