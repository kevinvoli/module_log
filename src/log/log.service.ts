import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Logs } from './entities/log.entity';
import { Repository } from 'typeorm';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LogService {
  private stockServiceClient: ClientProxy;
  constructor(
      @InjectRepository(Logs)
      private readonly corbeilleRepository: Repository<Logs>,
      private readonly utilisateursService : UtilisateursService,
     
    ){ 
      this.stockServiceClient = ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3003, // Port où `stockService` écoute
        },
      });
     }

     async handleMessage(message: any) {
      console.log('Message reçu dans LogServcie:', message);
      return { message: 'Réponse du LogServcie', data: message };
    }

    async create(createLogDto: CreateLogDto) {
      
  
       try {
        const user = await this.utilisateursService.findOne(createLogDto.userId)
  
        const log= new Logs()
        log.module = createLogDto.module
        log.user = user
        log.description = createLogDto.description
        log.typeAction = createLogDto.typeAction
        
        const ligne = await this.corbeilleRepository.save(log)
        console.log("ddd ",ligne);
  
        return ligne
      } catch (error) {
        throw new HttpException("echec de la creation de l'article", HttpStatus.BAD_REQUEST)
      }
    }
  
    async findAll() {
      try {
        const logs = await this.corbeilleRepository.find({
        })
        return logs
      } catch (error) {
        throw new HttpException("echec de la creation de article", HttpStatus.NOT_FOUND)
  
      }
    }
  
    async findOne(artcileId:number) {
      try {
        const ligne = await this.corbeilleRepository.findOne({  where: {
          id:artcileId,
        }})
        return ligne
      } catch (error) {
        throw new HttpException("echec de la creation de panier", HttpStatus.NOT_FOUND)
      }
    }
  
    async findOneByPanier(artcileId:number) {
      try {
        const ligne = await this.corbeilleRepository.findOne({  where: {
          id:artcileId,
        }})
        return ligne
      } catch (error) {
        throw new HttpException("echec de la creation de panier", HttpStatus.NOT_FOUND)
      }
    }
  
  
  
    async findOneById(artcileId:number){
  try {
        const ligne = await this.corbeilleRepository.findOne({  where: {
         id:artcileId
        }})
        return ligne
      } catch (error) {
        throw new HttpException("echec de la creation de panier", HttpStatus.NOT_FOUND)
      }
    }
  
    async update(id: number, updateLogDto: UpdateLogDto) {
      try {
        const ligne = await this.corbeilleRepository.findOne({
          where:{id:id}
        })
        if(!ligne) throw new NotFoundException('ligne')
        Object.assign(ligne, updateLogDto)
        return await this.corbeilleRepository.save(ligne)
      } catch (error) {
        throw new HttpException("echec de la creation de panier", HttpStatus.BAD_REQUEST)
      }
    }
  
    async remove(id: number) {
      try {
        const ligne = await this.corbeilleRepository.findOne({
          where: {id}
        });
        if(!ligne) throw new NotFoundException('ligne' );
    
        await this.corbeilleRepository.delete({id});
        return true
      } catch (error) {
        throw new HttpException("echec de la creation de panier", HttpStatus.BAD_REQUEST)
  
      }
    }
}
