import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityLoader } from './entity-loader.service'; // Service de chargement dynamique
import { getMetadataArgsStorage } from 'typeorm';
import { Action } from 'src/casl/entities/permission.entity';
import { CreatePermissionDto } from 'src/casl/dto/create-permission.dto';





@Injectable()
export class CaslAbilityFactory {
  private subjects: string[];

  constructor(
    private entityLoader: EntityLoader, // Injection du loader dynamique
  ) {
    // Charge toutes les entités disponibles
    this.subjects = this.entityLoader.getAllEntities();
  }
  

  async createForUser(user: CreatePermissionDto[]) {
    
    console.log("mes  ",user,this.subjects);        
    
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, string]> // On utilise `string` pour les sujets
    >(Ability as AbilityClass<Ability<[Action, string]>>);

    // Applique chaque permission dynamiquement
    user.forEach((permission) => {

  const action = permission.action ;
  const resource = permission.module ;
  const conditions = permission.conditions || {};

      // Vérifie si la ressource existe dans les entités connues
      
      if (this.subjects.includes(resource)) {
      console.log("le subjects",this.subjects);
        can(action, resource, conditions);
      }
    });
    

    return build({
      detectSubjectType: (item) => (item as any).constructor.name,
    });
  }
}
