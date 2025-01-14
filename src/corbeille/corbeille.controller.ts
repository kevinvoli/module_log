import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorbeilleService } from './corbeille.service';
import { CreateCorbeilleDto } from './dto/create-corbeille.dto';
import { UpdateCorbeilleDto } from './dto/update-corbeille.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('corbeille')
export class CorbeilleController {
  constructor(private readonly corbeilleService: CorbeilleService) {}

  @MessagePattern({ cmd: 'handle_message' })
   async handleMessage(data: any) {
     return this.corbeilleService.handleMessage(data);
   }
   
@MessagePattern({cmd:'create_corbeille'})
   create(@Payload() createCorbeilleDto: CreateCorbeilleDto) {
     return this.corbeilleService.create(createCorbeilleDto);
   }
 
   @MessagePattern({cmd:'findAll_corbeille'})
   async  findAll(data?:any) {
    console.log('find All',data);
    
     return await this.corbeilleService.findAll();
   }
 
   @MessagePattern({cmd:'findOne_corbeille'})
   findOne(@Payload() id: number) {
     return this.corbeilleService.findOne(id);
   }
 
   @MessagePattern({cmd:'update_corbeille'})
   update(@Payload() updateCorbeilleDto: UpdateCorbeilleDto) {
     return this.corbeilleService.update(updateCorbeilleDto.Id, updateCorbeilleDto);
   }
 
   @MessagePattern({cmd:'remove_corbeille'})
   remove(@Payload() id: number) {
     return this.corbeilleService.remove(id);
   } 
}
