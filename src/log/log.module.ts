import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from './entities/log.entity';

import { Permissions } from 'src/auth/entities/permission.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { ConfigService } from '@nestjs/config';
import { EntityLoader } from 'src/casl/entity-loader.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Logs,
      Permissions
    ])
  ],
  controllers: [LogController],
  providers: [
    LogService,
    CaslAbilityFactory,
    ConfigService,
    EntityLoader
  ],
})
export class LogModule {}
