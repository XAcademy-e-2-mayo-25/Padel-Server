import { Transform } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';

export class ListarTurnosDto {
  // Paginación
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  limit?: number = 10;

  // Orden
  @IsOptional()
  @IsIn(['idTurno', 'fecha', 'diaSemana', 'horaDesde', 'horaHasta'])
  sortBy?: 'idTurno' | 'fecha' | 'diaSemana' | 'horaDesde' | 'horaHasta' = 'idTurno';

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  sortDir?: 'ASC' | 'DESC' | 'asc' | 'desc' = 'ASC';

  // Filtros
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idClub?: number;

  @IsOptional()
  @IsDateString()
  fecha?: string; // YYYY-MM-DD

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  diaSemana?: number;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
  horaDesde?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
  horaHasta?: string;
}
