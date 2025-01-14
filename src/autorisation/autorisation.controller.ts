import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AutorisationService } from './autorisation.service';
import { CreateAutorisationDto } from './dto/create-autorisation.dto';
import { UpdateAutorisationDto } from './dto/update-autorisation.dto';

@Controller()
export class AutorisationController {
  constructor(private readonly autorisationService: AutorisationService) {}

  @MessagePattern('createAutorisation')
  create(@Payload() createAutorisationDto: CreateAutorisationDto) {
    return this.autorisationService.create(createAutorisationDto);
  }

  @MessagePattern('findAllAutorisation')
  findAll() {
    return this.autorisationService.findAll();
  }

  @MessagePattern('findOneAutorisation')
  findOne(@Payload() id: number) {
    return this.autorisationService.findOne(id);
  }

  @MessagePattern('updateAutorisation')
  update(@Payload() updateAutorisationDto: UpdateAutorisationDto) {
    return this.autorisationService.update(updateAutorisationDto.id, updateAutorisationDto);
  }

  @MessagePattern('removeAutorisation')
  remove(@Payload() id: number) {
    return this.autorisationService.remove(id);
  }
}
