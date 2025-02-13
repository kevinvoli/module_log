import { Controller, Logger ,Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { Action } from 'src/auth/entities/permission.entity';

@Controller('log')
export class LogController {
  private readonly logger = new Logger(LogController.name);
  constructor(private readonly logService: LogService) {}



  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'Utilisateurs')
  )
  @MessagePattern('process_data') // Pattern du message attendu
    async processData(data: any) {
      console.log("sa marche trop bien",data);
      
      // Log les données reçues
      return { status: 'success', received: data };
    }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'Utilisateurs')
  )
  @MessagePattern({cmd:'process_data'})
  async handleMessage(data: any) {
    console.log("sa marche propre", data);
    return this.logService.handleMessage(data);
  }
  

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'Utilisateurs')
  )
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
 @MessagePattern({cmd:'create_log'})
   create(@Payload() createLogDto: CreateLogDto) {
     return this.logService.create(createLogDto);
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

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'Utilisateurs')
  )
   @MessagePattern({cmd:'findAll_log'})
   
   async  findAll(data?:any) {
    try {
      console.log('find All',data);
    
      return await this.logService.findAll();
    } catch (error) {
      console.log("mon erroe:",error);
      
      return error
    }

   }

   @UseGuards(PoliciesGuard)
   @CheckPolicies(
     (ability) => ability.can(Action.Read, 'Utilisateurs')
   )
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
   @MessagePattern({cmd:'findOne_log'})
   findOne(@Payload() id: number) {
     return this.logService.findOne(id);
   }  
}
