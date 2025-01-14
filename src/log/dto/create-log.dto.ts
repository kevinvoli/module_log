import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateLogDto {
    
    @IsNumber()
    @IsNotEmpty()
    userId: number | null;

    @IsNumber()
    Id: number | null;
  
    @IsNotEmpty()
    @IsString()
    typeAction: string | null;
  
    @IsNotEmpty()
    @IsString()
    module: string | null;
  
    @IsNotEmpty()
    @IsString()
    description: string | null;
  
   
}
