import { IsEnum, IsOptional, IsString, IsObject } from 'class-validator';
import { Action } from '../entities/permission.entity';

export class CreatePermissionDto {
  @IsString()
  module: string;

  @IsEnum(Action)
  action: Action;

  @IsOptional()
  @IsObject()
  conditions?: object | null;
}