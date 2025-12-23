import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class ListarCanchasDto {
  //paginacion
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
  @IsIn([
    'idCancha',
    'idClub',
    'denominacion',
    'cubierta',
    'precio',
    'rangoSlotMinutos',
  ])
  sortBy:
    | 'idCancha'
    | 'idClub'
    | 'denominacion'
    | 'cubierta'
    | 'precio'
    | 'rangoSlotMinutos' = 'idCancha';

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  sortDir: 'ASC' | 'DESC' | 'asc' | 'desc' = 'ASC';

  // filtros basicos
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idClub?: number;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  denominacion?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  cubierta?: boolean;

  // filtro por dia puntual
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(6)
  dia?: number;

  // slot en minutos
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([30, 60])
  rangoSlotMinutos?: number;

  // rango de precio
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  precioMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  precioMax?: number;
}
