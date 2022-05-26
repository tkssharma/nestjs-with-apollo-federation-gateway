/**
 * Configuration for the database connection.
 */
export interface ConfigDBData {
  url?: string;
}


export interface SendGridConfig {
  apiKey: string;
  verifiedEmail: string;
}

export interface AuthConfig {
  jwtSecret: string,
  expireIn: number;
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

  debug: string;

  port: number;

  auth: AuthConfig;

  /** Database connection details. */
  db: ConfigDBData;

  sendGrid: SendGridConfig;
  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;

  /** The New Relic key to use. */
  newRelicKey?: string;
}
