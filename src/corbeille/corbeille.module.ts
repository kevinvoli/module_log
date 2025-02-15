import { Module } from '@nestjs/common';
import { CorbeilleService } from './corbeille.service';
import { CorbeilleController } from './corbeille.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Corbeille } from './entities/corbeille.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { EntityLoader } from 'src/casl/entity-loader.service';

@Module({
  imports:[
      TypeOrmModule.forFeature([
        Corbeille,
      ])
    ],
  controllers: [CorbeilleController],
  providers: [
    CorbeilleService,
    CaslAbilityFactory,
    EntityLoader

  ],
})
export class CorbeilleModule {}
