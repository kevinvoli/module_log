import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCorbeilleDto {

    @IsNumber()
    @IsOptional()
    Id:number

    @IsNotEmpty()
    @IsString()
    typeElement: string | null;

    @IsNotEmpty()
    @IsString()
    contenu: string | null;
}
