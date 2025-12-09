import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class ListarCanchasDto {
  // --- PAGINACIÓN ---
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

  // --- ORDEN ---
  @IsOptional()
  @IsIn(['idCancha', 'idClub', 'denominacion', 'cubierta'])
  sortBy: 'idCancha' | 'idClub' | 'denominacion' | 'cubierta' = 'idCancha';

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  sortDir: 'ASC' | 'DESC' | 'asc' | 'desc' = 'ASC';

  // --- FILTRO: idClub ---
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idClub?: number;

  // --- FILTRO: denominacion contains ---
  @IsOptional()
  @IsString()
  @Length(1, 200)
  denominacion?: string;

  // --- FILTRO: cubierta ---
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  cubierta?: boolean;
}
