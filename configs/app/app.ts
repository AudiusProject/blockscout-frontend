import { getEnvValue } from './utils';

const appPort = getEnvValue('NEXT_PUBLIC_APP_PORT');
const appSchema = getEnvValue('NEXT_PUBLIC_APP_PROTOCOL');
const appHost = getEnvValue('NEXT_PUBLIC_APP_HOST');
const baseUrl = [
  appSchema || 'https',
  '://',
  appHost,
  appPort && ':' + appPort,
].filter(Boolean).join('');
const isDev = process.env.NODE_ENV === 'development';
const audiusEnv = getEnvValue('audius_discprov_env');

const app = Object.freeze({
  isDev,
  protocol: appSchema,
  host: appHost,
  port: appPort,
  baseUrl,
  audiusEnv,
  useProxy: getEnvValue('NEXT_PUBLIC_USE_NEXT_JS_PROXY') === 'true',
});

export default app;
