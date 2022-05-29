/**
 * Configuration for the database connection.
 */
export interface ConfigDBData {
  url?: string;
}

export interface AuthConfig {
  jwtSecret: string,
  expireIn: number;
}

export interface SendGridConfig {
  apiKey: string;
  verifiedEmail: string;
}
/**
 * Configuration data for the app.
 */
export interface ConfigData {
  /**
   * The name of the environment.
   * @example 'production'
   */
  env: string;

  port: number;

  /** Database connection details. */
  db: ConfigDBData;

  sendGrid: SendGridConfig;

  auth: AuthConfig;
  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;

  /** The New Relic key to use. */
  newRelicKey?: string;
}
