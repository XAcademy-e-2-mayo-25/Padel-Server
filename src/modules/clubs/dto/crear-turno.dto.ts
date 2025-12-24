import { IsDateString, IsInt, IsOptional, IsPositive, IsString, Matches } from 'class-validator';

export class CrearTurnoDto {
  @IsInt()
  @IsPositive()
  idClub!: number;

  // agenda por fecha o dia de la semana, despues vemos como si usamos una o las dos
  @IsOptional()
  @IsDateString()
  fecha?: string; // YYYY-MM-DD

  @IsOptional()
  @IsInt()
  @IsPositive()
  diaSemana?: number; // 0..6 o 1..7

  // HH:mm — validacion simple por regex
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
  horaDesde!: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
  horaHasta!: string;
}
