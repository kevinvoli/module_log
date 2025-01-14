import { Module } from '@nestjs/common';
import { CorbeilleService } from './corbeille.service';
import { CorbeilleController } from './corbeille.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Corbeille } from './entities/corbeille.entity';

@Module({
  imports:[
      TypeOrmModule.forFeature([
        Corbeille,
      ])
    ],
  controllers: [CorbeilleController],
  providers: [CorbeilleService],
})
export class CorbeilleModule {}
