import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CorbeilleService } from './corbeille.service';
import { CreateCorbeilleDto } from './dto/create-corbeille.dto';
import { UpdateCorbeilleDto } from './dto/update-corbeille.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller('corbeille')
export class CorbeilleController {
  constructor(private readonly corbeilleService: CorbeilleService) {}

  

@UsePipes(new ValidationPipe({
  transform: true, // Cela transforme les objets bruts en instances de DTO
  whitelist: true, // Cela supprime les propriétés non définies dans le DTO
  forbidNonWhitelisted: true, 
  exceptionFactory: (errors) =>{
  const formattedErrors = errors.map((err) => ({
    property: err.property,
    constraints: err.constraints,
  }));
  return new RpcException(formattedErrors);
  
}}))
  @MessagePattern({ cmd: 'handle_message' })
   async handleMessage(data: any) {
     return this.corbeilleService.handleMessage(data);
   }
   
   @UsePipes(new ValidationPipe({
    transform: true, // Cela transforme les objets bruts en instances de DTO
    whitelist: true, // Cela supprime les propriétés non définies dans le DTO
    forbidNonWhitelisted: true, 
    exceptionFactory: (errors) =>{
    const formattedErrors = errors.map((err) => ({
      property: err.property,
      constraints: err.constraints,
    }));
    return new RpcException(formattedErrors);
    
  }}))   
@MessagePattern({cmd:'create_corbeille'})
   create(@Payload() createCorbeilleDto: CreateCorbeilleDto) {
     return this.corbeilleService.create(createCorbeilleDto);
   }
 
   @UsePipes(new ValidationPipe({
    transform: true, // Cela transforme les objets bruts en instances de DTO
    whitelist: true, // Cela supprime les propriétés non définies dans le DTO
    forbidNonWhitelisted: true, 
    exceptionFactory: (errors) =>{
    const formattedErrors = errors.map((err) => ({
      property: err.property,
      constraints: err.constraints,
    }));
    return new RpcException(formattedErrors);
    
  }}))
   @MessagePattern({cmd:'findAll_corbeille'})
   async  findAll(data?:any) {
    console.log('find All',data);
    
     return await this.corbeilleService.findAll();
   }
 

   @UsePipes(new ValidationPipe({
    transform: true, // Cela transforme les objets bruts en instances de DTO
    whitelist: true, // Cela supprime les propriétés non définies dans le DTO
    forbidNonWhitelisted: true, 
    exceptionFactory: (errors) =>{
    const formattedErrors = errors.map((err) => ({
      property: err.property,
      constraints: err.constraints,
    }));
    return new RpcException(formattedErrors);
    
  }}))
   @MessagePattern({cmd:'findOne_corbeille'})
   findOne(@Payload() id: number) {
     return this.corbeilleService.findOne(id);
   }
 
   @UsePipes(new ValidationPipe({
    transform: true, // Cela transforme les objets bruts en instances de DTO
    whitelist: true, // Cela supprime les propriétés non définies dans le DTO
    forbidNonWhitelisted: true, 
    exceptionFactory: (errors) =>{
    const formattedErrors = errors.map((err) => ({
      property: err.property,
      constraints: err.constraints,
    }));
    return new RpcException(formattedErrors);
    
  }}))
   @MessagePattern({cmd:'update_corbeille'})
   update(@Payload() updateCorbeilleDto: UpdateCorbeilleDto) {
     return this.corbeilleService.update(updateCorbeilleDto.Id, updateCorbeilleDto);
   }
 
   @UsePipes(new ValidationPipe({
    transform: true, // Cela transforme les objets bruts en instances de DTO
    whitelist: true, // Cela supprime les propriétés non définies dans le DTO
    forbidNonWhitelisted: true, 
    exceptionFactory: (errors) =>{
    const formattedErrors = errors.map((err) => ({
      property: err.property,
      constraints: err.constraints,
    }));
    return new RpcException(formattedErrors);
    
  }}))
   @MessagePattern({cmd:'remove_corbeille'})
   remove(@Payload() id: number) {
     return this.corbeilleService.remove(id);
   } 
}
