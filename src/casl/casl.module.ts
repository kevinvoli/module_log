import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslAbilityFactory } from './casl-ability.factory';
import { EntityLoader } from './entity-loader.service';
// import { Roles } from 'src/auth/entities/roles.entity';
// import { Permissions } from 'src/auth/entities/permission.entity';


@Module({
  imports: [

    ],
   controllers: [
     
    ],
    providers: [
      CaslAbilityFactory,
      EntityLoader,
     
    ],
})
export class CaslModule {}