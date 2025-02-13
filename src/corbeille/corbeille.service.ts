import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCorbeilleDto } from './dto/create-corbeille.dto';
import { UpdateCorbeilleDto } from './dto/update-corbeille.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Corbeille } from './entities/corbeille.entity';
import { Repository } from 'typeorm';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class CorbeilleService {
  handleMessage(data: any) {
    throw new Error('Method not implemented.');
  }
  private stockServiceClient: ClientProxy;
  constructor(
    @InjectRepository(Corbeille)
    private readonly corbeilleRepository: Repository<Corbeille>,
  ){this.stockServiceClient = ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: 3003, // Port où `stockService` écoute
          },
        });  }
  async create(createCorbeilleDto: CreateCorbeilleDto) {
    

     try {

      const corbeille= new Corbeille()
      corbeille.contenu = createCorbeilleDto.contenu
      corbeille.typeElement = createCorbeilleDto.typeElement
      const ligne = await this.corbeilleRepository.save(corbeille)
      console.log("ddd ",ligne);

      return ligne
    } catch (error) {
      throw new HttpException("echec de la creation de l'article", HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    try {
      const ligne = await this.corbeilleRepository.find({
       
      })
      return ligne
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

  async update(id: number, updateCorbeilleDto: UpdateCorbeilleDto) {
    try {
      const ligne = await this.corbeilleRepository.findOne({
        where:{id:id}
      })
      if(!ligne) throw new NotFoundException('ligne')
      Object.assign(ligne, updateCorbeilleDto)
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
