import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class CrearCanchaDto {
  @IsInt()
  @IsPositive()
  idClub!: number;

  @IsString()
  @Length(1, 200)
  denominacion!: string;

  @IsOptional()
  @IsBoolean()
  cubierta?: boolean;

  @IsOptional()
  @IsString()
  @Length(1, 300)
  observaciones?: string;
}
