import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, isString, IsString, Length, Min } from 'class-validator';

export class ListarClubsDto {
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
  @IsIn(['idClub', 'cuitCuil', 'provincia', 'localidad'])
  sortBy?: 'idClub' | 'cuitCuil' | 'provincia' | 'localidad' = 'idClub';

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  sortDir?: 'ASC' | 'DESC' | 'asc' | 'desc' = 'ASC';

  // Filtros
  @IsOptional()
  @IsString()
  @Length(1, 150)
  nombre?: string; // busca en razonSocial y nombreFantasia

  @IsOptional()
  @IsString()
  @Length(1, 20)
  cuitCuil?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  provincia?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  localidad?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idEstadoClub?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idUsuario?: number;

  @IsOptional()
  @IsString()
  q?: string;
}
