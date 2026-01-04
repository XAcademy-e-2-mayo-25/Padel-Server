import { IsOptional, IsString, Length } from 'class-validator';

export class AprobarClubDto {
  @IsOptional()
  @IsString()
  @Length(1, 300)
  descripcion?: string;
}
