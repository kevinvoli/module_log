import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from './entities/log.entity';
import { Utilisateurs } from 'src/utilisateurs/entities/utilisateur.entity';
import { UtilisateursService } from 'src/utilisateurs/utilisateurs.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Logs,
      Utilisateurs,
    ])
  ],
  controllers: [LogController],
  providers: [LogService, UtilisateursService],
})
export class LogModule {}
