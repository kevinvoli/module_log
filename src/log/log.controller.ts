import { Controller, Logger ,Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { Action } from 'src/casl/entities/permission.entity';


@Controller('log')
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
export class LogController {
  private readonly logger = new Logger(LogController.name);
  constructor(private readonly logService: LogService) {}
  

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Create, 'logs')
  )
 @MessagePattern({cmd:'create_log'})
   async create(@Payload() createLogDto: CreateLogDto) {
     return await this.logService.create(createLogDto);
   }
 


  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'logs'),
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
     (ability) => ability.can(Action.Read, 'logs')
   )
   @MessagePattern({cmd:'findOne_log'})
   findOne(@Payload() id: number) {
     return this.logService.findOne(id);
   }  

   @UseGuards(PoliciesGuard)
   @CheckPolicies(
     (ability) => ability.can(Action.Delete, 'logs'),
   )
    @MessagePattern({cmd:'delete_log'})
    async  delete(data?:any) {
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
      (ability) => ability.can(Action.Update, 'logs'),
    )
     @MessagePattern({cmd:'update_log'})
     async  update(data?:any) {
      try {
        console.log('find All',data);
        return await this.logService.findAll();
      } catch (error) {
        console.log("mon erroe:",error); 
        return error
      }
  
     }
}
