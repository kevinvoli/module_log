import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PolicyHandler } from '../interface/policies.interface';
import { CHECK_POLICIES_KEY } from '../decorators/policies.decorator';
import { CaslAbilityFactory } from '../casl-ability.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions } from 'src/auth/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionServcie: Repository<Permissions> ,
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,


  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];
      console.log("les handje", handlers);
      console.log("les permision", );
    
    const request = context.switchToRpc().getData();
    // console.log("les user", request.user);
    const {user} = request

    console.log("les permision", user);

    if (!user) {
      throw new ForbiddenException("L'utilisateur n'est pas authentifié");
    }
    
    
    const permissions = await this.permissionServcie.find(user?.roleId)
    // Créer les permissions pour l'utilisateur
    
    const ability = await this.caslAbilityFactory.createForUser(permissions);
    handlers.forEach((handler, index) => {
        
      const result = handler(ability);
    });
    console.log("every handler: ", handlers.every((handler) => handler(ability)));
    
    // Vérifier les permissions en utilisant les handlers
    return handlers.every((handler) => handler(ability));
  }
}
