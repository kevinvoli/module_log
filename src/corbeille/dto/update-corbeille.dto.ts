import { PartialType } from '@nestjs/mapped-types';
import { CreateCorbeilleDto } from './create-corbeille.dto';

export class UpdateCorbeilleDto extends PartialType(CreateCorbeilleDto) {}
