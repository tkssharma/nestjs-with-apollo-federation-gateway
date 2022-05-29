import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Logger } from '@logger/logger';

@Controller('/api/v1/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private logger: Logger,
  ) { }

  @ApiTags('health')
  @Get()
  @HealthCheck()
  public check() {
    this.logger.log('checking health check :: test log message');
    return this.health.check([
      async () => this.db.pingCheck('typeorm'),
    ]);
  }
}
