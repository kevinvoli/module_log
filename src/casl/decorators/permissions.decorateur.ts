// src/casl/decorators/permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Action } from '../entities/permission.entity';

export const CHECK_PERMISSIONS_KEY = 'check_permissions';

export const Permissions = (action: Action, subject: string) =>
  SetMetadata(CHECK_PERMISSIONS_KEY, { action, subject });
