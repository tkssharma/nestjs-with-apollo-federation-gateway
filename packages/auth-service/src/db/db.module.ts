import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigDBData } from '../config/config.interface';
import { ConfigService } from '../config/config.service';

import { Logger } from '../logger/logger';
import { LoggerModule } from '../logger/logger.module';
import { DbConfigError } from './db.errors';
import { DbConfig } from './db.interface';
@Module({})
export class DbModule {
  private static getConnectionOptions(config: ConfigService, dbconfig: DbConfig): TypeOrmModuleOptions {
    const dbdata = config.get().db;
    if (!dbdata) {
      throw new DbConfigError('Database config is mSissing');
    }
    const connectionOptions = DbModule.getConnectionOptionsPostgres(dbdata);
    return {
      ...connectionOptions,
      entities: dbconfig.entities,
      synchronize: true,
      logging: false,
    };
  }

  private static getConnectionOptionsPostgres(dbdata: ConfigDBData): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: dbdata.url,
      keepConnectionAlive: true,
      ssl: (process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'test')
        ? { rejectUnauthorized: false }
        : false,
    };
  }

  public static forRoot(dbconfig: DbConfig): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule, LoggerModule],
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          useFactory: (configService: ConfigService, logger: Logger) => DbModule.getConnectionOptions(configService, dbconfig),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
