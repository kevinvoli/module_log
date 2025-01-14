import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUtilisateurDto {
    @IsNotEmpty()
    @IsString()
    nom: string;
  
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    motDePasse: string;
    
    @IsNumber()
    Id:number;
}
