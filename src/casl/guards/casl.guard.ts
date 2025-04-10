// src/casl/guards/casl.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../casl-ability.factory';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { CHECK_PERMISSIONS_KEY } from '../decorators/permissions.decorateur';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissionMeta = this.reflector.get<{ action; subject }>(
      CHECK_PERMISSIONS_KEY,
      context.getHandler()
    );

    if (!permissionMeta) {
      return true; // pas de restriction
    }

    const request = context.switchToHttp().getRequest();

    const userPermissions: CreatePermissionDto[] = request.user?.permission;

    if (!userPermissions) {
      throw new ForbiddenException('Aucune permission trouvée');
    }

    const ability = await this.caslAbilityFactory.createForPermissions(userPermissions);

    const isAllowed = ability.can(permissionMeta.action, permissionMeta.subject);

    if (!isAllowed) {
      throw new ForbiddenException('Accès refusé');
    }

    return true;
  }
}
