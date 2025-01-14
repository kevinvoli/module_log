import { Module } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursController } from './utilisateurs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Corbeille } from 'src/corbeille/entities/corbeille.entity';
import { Utilisateurs } from './entities/utilisateur.entity';

@Module({
  imports:[
      TypeOrmModule.forFeature([
        Utilisateurs
      ])
    ],
  controllers: [UtilisateursController],
  providers: [UtilisateursService],
})
export class UtilisateursModule {}
