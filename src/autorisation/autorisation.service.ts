import { Injectable } from '@nestjs/common';
import { CreateAutorisationDto } from './dto/create-autorisation.dto';
import { UpdateAutorisationDto } from './dto/update-autorisation.dto';

@Injectable()
export class AutorisationService {
  create(createAutorisationDto: CreateAutorisationDto) {
    return 'This action adds a new autorisation';
  }

  findAll() {
    return `This action returns all autorisation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autorisation`;
  }

  update(id: number, updateAutorisationDto: UpdateAutorisationDto) {
    return `This action updates a #${id} autorisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} autorisation`;
  }
}
