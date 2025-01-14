import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateurs } from './entities/utilisateur.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UtilisateursService {
  constructor(
        @InjectRepository(Utilisateurs)
        private readonly utilisateursRepository: Repository<Utilisateurs>,
       
      ){  }
      async create(createUtilisateurDto: CreateUtilisateurDto) {
        
    
         try {
          const utilisateurs= new Utilisateurs()
          utilisateurs.nom = createUtilisateurDto.nom
          utilisateurs.email = createUtilisateurDto.email
          utilisateurs.motDePasse = createUtilisateurDto.motDePasse
          
          const ligne = await this.utilisateursRepository.save(utilisateurs)
          console.log("ddd ",ligne);
    
          return ligne
        } catch (error) {
          throw new HttpException("echec de la creation de l'article", HttpStatus.BAD_REQUEST)
        }
      }
    
      async findAll() {
        try {
          const ligne = await this.utilisateursRepository.find({
           
          })
          return ligne
        } catch (error) {
          throw new HttpException("echec de la creation de article", HttpStatus.NOT_FOUND)
    
        }
      }
    
      async findOne(artcileId:number) {
        try {
          const ligne = await this.utilisateursRepository.findOne({  where: {
            id:artcileId,
          }})
          return ligne
        } catch (error) {
          throw new HttpException("echec de la creation de panier", HttpStatus.NOT_FOUND)
        }
      }
    
      async findOneByPanier(artcileId:number) {
        try {
          const ligne = await this.utilisateursRepository.findOne({  where: {
            id:artcileId,
          }})
          return ligne
        } catch (error) {
          throw new HttpException("echec de la creation de panier", HttpStatus.NOT_FOUND)
        }
      }
    
    
    
      async findOneById(artcileId:number){
    try {
          const ligne = await this.utilisateursRepository.findOne({  where: {
           id:artcileId
          }})
          return ligne
        } catch (error) {
          throw new HttpException("echec de la creation de panier", HttpStatus.NOT_FOUND)
        }
      }
    
      async update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
        try {
          const ligne = await this.utilisateursRepository.findOne({
            where:{id:id}
          })
          if(!ligne) throw new NotFoundException('ligne')
          Object.assign(ligne, updateUtilisateurDto)
          return await this.utilisateursRepository.save(ligne)
        } catch (error) {
          throw new HttpException("echec de la creation de panier", HttpStatus.BAD_REQUEST)
        }
      }
    
      async remove(id: number) {
        try {
          const ligne = await this.utilisateursRepository.findOne({
            where: {id}
          });
          if(!ligne) throw new NotFoundException('ligne' );
      
          await this.utilisateursRepository.delete({id});
          return true
        } catch (error) {
          throw new HttpException("echec de la creation de panier", HttpStatus.BAD_REQUEST)
    
        }
      }
}
