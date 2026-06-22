const config = require('./src/config/env.js');
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0,
  enabled: Boolean(process.env.SENTRY_DNS),
});
