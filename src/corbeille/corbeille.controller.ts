import { Controller, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CorbeilleService } from './corbeille.service';
import { CreateCorbeilleDto } from './dto/create-corbeille.dto';
import { UpdateCorbeilleDto } from './dto/update-corbeille.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Action } from 'src/casl/entities/permission.entity';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';


@Controller('corbeille')
@UsePipes(new ValidationPipe({
  transform: true, // Cela transforme les objets bruts en instances de DTO
  whitelist: true, // Cela supprime les propriétés non définies dans le DTO
  forbidNonWhitelisted: true, 
  exceptionFactory: (errors) =>{
  return new RpcException(errors);
}}))

@UseGuards(PoliciesGuard)
export class CorbeilleController {
  constructor(private readonly corbeilleService: CorbeilleService) {}

   
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'corbeille'),
    (ability) => ability.can(Action.Create, 'corbeille'),

  )
  @MessagePattern({cmd:'create_corbeille'})
   create(@Payload() createCorbeilleDto: CreateCorbeilleDto) {
     return this.corbeilleService.create(createCorbeilleDto);
   }
 
   @CheckPolicies(
    (ability) => ability.can(Action.Read, 'corbeille'),
  )
   @MessagePattern({cmd:'findAll_corbeille'})
   async  findAll(data?:any) {
    console.log('find All',data);
    
     return await this.corbeilleService.findAll();
   }
 

   @CheckPolicies(
    (ability) => ability.can(Action.Read, 'corbeille'),
  )
   @MessagePattern({cmd:'findOne_corbeille'})
   findOne(@Payload() id: number) {
     return this.corbeilleService.findOne(id);
   }
 
   @CheckPolicies(
    (ability) => ability.can(Action.Update, 'corbeille'),
    (ability) => ability.can(Action.Read, 'corbeille'),

  )
   @MessagePattern({cmd:'update_corbeille'})
   update(@Payload() updateCorbeilleDto: UpdateCorbeilleDto) {
     return this.corbeilleService.update(updateCorbeilleDto.Id, updateCorbeilleDto);
   }
 
   @CheckPolicies(
    (ability) => ability.can(Action.Delete, 'corbeille'),
    (ability) => ability.can(Action.Read, 'corbeille'),
  )
   @MessagePattern({cmd:'remove_corbeille'})
   remove(@Payload() id: number) {
     return this.corbeilleService.remove(id);
   } 
}
