import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';

export class ListarReservasTurnoDto {
  // paginación
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  // orden
  @IsOptional()
  @IsIn(['idReservaTurno', 'fecha'])
  sortBy: 'idReservaTurno' | 'fecha' = 'idReservaTurno';

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  sortDir: 'ASC' | 'DESC' | 'asc' | 'desc' = 'ASC';

  // filtros
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idCancha?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idJugador?: number;

  @IsOptional()
  @IsDateString()
  fechaDesde?: string; // YYYY-MM-DD

  @IsOptional()
  @IsDateString()
  fechaHasta?: string; // YYYY-MM-DD

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  slotIndexDesde?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  slotCountMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  slotCountMax?: number;

  @IsOptional()
  @IsBoolean()
  pagado?: boolean;
}
