import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}
    
  @MessagePattern({ cmd: 'handle_message' })
  async handleMessage(data: any) {
    return this.logService.handleMessage(data);
  }
  
 @MessagePattern({cmd:'create_log'})
   create(@Payload() createLogDto: CreateLogDto) {
     return this.logService.create(createLogDto);
   }
 
   @MessagePattern({cmd:'findAll_log'})
   async  findAll(data?:any) {
    console.log('find All',data);
    
     return await this.logService.findAll();
   }
 
   @MessagePattern({cmd:'findOne_log'})
   findOne(@Payload() id: number) {
     return this.logService.findOne(id);
   }
 
   @MessagePattern({cmd:'update_log'})
   update(@Payload() updateLogDto: UpdateLogDto) {
     return this.logService.update(updateLogDto.Id, updateLogDto);
   }
 
   @MessagePattern({cmd:'remove_log'})
   remove(@Payload() id: number) {
     return this.logService.remove(id);
   } 
  
  
  
  
  
  
  // @Post()
  //   async create(@Body() createLogDto: CreateLogDto) {
  //   return await this.logService.create(createLogDto);
  // }

  // @Get()
  // async findAll() {
  //   return await this.logService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.logService.findOne(+id);
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
  //   return await this.logService.update(+id, updateLogDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.logService.remove(+id);
  // }
}
