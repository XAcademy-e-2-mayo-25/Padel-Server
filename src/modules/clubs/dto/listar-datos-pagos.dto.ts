import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class ListarDatosPagosDto {
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
  @IsIn(['idDatosPago', 'idClub', 'metodoPago', 'activo'])
  sortBy?: 'idDatosPago' | 'idClub' | 'metodoPago' | 'activo' = 'idDatosPago';

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
  @IsString()
  @Length(1, 80)
  metodoPago?: string; // búsqueda contains

  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : value))
  @IsBoolean()
  activo?: boolean;
}
