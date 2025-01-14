import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  
  @MessagePattern({cmd:'create_utilisateurs'})
  create(@Payload() createUtilisateurDto: CreateUtilisateurDto) {
    return this.utilisateursService.create(createUtilisateurDto);
  }

  @MessagePattern({cmd:'findAll_utilisateurs'})
  findAll() {
    console.log('find All');
    
    return this.utilisateursService.findAll();
  }

  @MessagePattern({cmd:'findOne_utilisateurs'})
  findOne(@Payload() id: number) {
    return this.utilisateursService.findOne(id);
  }

  @MessagePattern({cmd:'update_utilisateurs'})
  update(@Payload() updateUtilisateurDto: UpdateUtilisateurDto) {
    return this.utilisateursService.update(updateUtilisateurDto.Id, updateUtilisateurDto);
  }

  @MessagePattern({cmd:'remove_utilisateurs'})
  remove(@Payload() id: number) {
    return this.utilisateursService.remove(id);
  } 
}
