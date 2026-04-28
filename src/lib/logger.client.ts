// TODO: Replace with a proper client logging library when needed. e.g. sentry - https://docs.sentry.io/platforms/javascript/guides/nextjs/logs/
export const logger = {
  info: (...args: unknown[]) => console.log(...args),
  warn: (...args: unknown[]) => console.warn(...args),
  error: (...args: unknown[]) => console.error(...args),
}
