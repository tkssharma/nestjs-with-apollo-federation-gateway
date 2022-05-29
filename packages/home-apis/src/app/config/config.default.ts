import { ConfigData } from './config.interface';

// tslint:disable:no-hardcoded-credentials

export const DEFAULT_CONFIG: ConfigData = {
  env: 'development',
  db: {
    url: process.env.DATABASE_URL,
  },
  sendGrid: {
    apiKey: '',
    verifiedEmail: ''
  },
  auth: {
    jwtSecret: '',
    expireIn: 0
  },
  port: 3000,
  logLevel: 'info',
  newRelicKey: '',
};
