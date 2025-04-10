import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PolicyHandler } from '../interface/policies.interface';
import { CHECK_POLICIES_KEY } from '../decorators/policies.decorator';
import { CaslAbilityFactory } from '../casl-ability.factory';



@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,


  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];
 
    const request = context.switchToRpc().getData();
    // console.log("les user", request.user);
    const {permission,user} = request?.user || {}

    if (!permission) {
      throw new ForbiddenException("L'utilisateur n'est pas authentifié");
    }
    
    const ability = await this.caslAbilityFactory.createForPermissions(permission);
    const isAllowed = handlers.every((handler) => {
      return handler(ability);
    });
    
    if (!isAllowed) {
      throw new ForbiddenException("Vous n'avez pas les permissions nécessaires");
    }
    return true
  }
}
