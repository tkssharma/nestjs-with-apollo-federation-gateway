import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeResolver } from './home.resolver';
import { Home } from '../entity/home.entity';
import { LoggerModule } from '@logger/logger.module';
import { DateScalar } from '@app/scalars/date.scalar';
import { AuthModule } from '@app/auth/auth.module';


@Module({
  imports: [LoggerModule, AuthModule, TypeOrmModule.forFeature([Home])],
  providers: [HomeService, HomeResolver, DateScalar],
})
export class HomeModule {
}
