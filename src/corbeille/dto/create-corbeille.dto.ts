import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCorbeilleDto {

    @IsNumber()
    Id:number

    @IsNotEmpty()
    @IsString()
    typeElement: string | null;

    @IsNotEmpty()
    @IsString()
    contenu: string | null;
}
