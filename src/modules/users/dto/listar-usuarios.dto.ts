import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

//Con este dto se podra buscar, filtrar, ordenar y paginar usuarios
//definiendo parametros de busqueda y filtrado para que desde el front se puedan usar enviando query params en la URL
//todos los campos seran opcionales haciendo posible usar solo 1, combinar y usar varios o ninguno
export class ListarUsuariosDto {
  // Paginacion par acontrolar la cantidad de registros devueltos por pagina, por defecto empieza en pagina 1 y cantidad de registros por pagina 10
  //para usar: URL/usuarios?page=1&limit=10
  @ApiPropertyOptional({
    example: 1,
    description: 'Número de página para paginación. Valor mínimo 1.',
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Cantidad de registros por página. Valor mínimo 1.',
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  limit?: number = 10;

  //Ordenamiento ascendente y descendente por diferentes campos
  @ApiPropertyOptional({
    example: 'apellidos',
    description:
      'Campo para ordenar los resultados. Valores permitidos: idUsuario, nombres, apellidos, email, idCategoria.',
    enum: ['idUsuario', 'nombres', 'apellidos', 'email', 'idCategoria'],
  })
  @IsOptional()
  @IsIn(['idUsuario', 'nombres', 'apellidos', 'email', 'idCategoria'])
  sortBy?: 'idUsuario' | 'nombres' | 'apellidos' | 'email' | 'idCategoria' = 'idUsuario';

  @ApiPropertyOptional({
    example: 'ASC',
    description:
      'Dirección del ordenamiento. Valores permitidos: ASC, DESC (mayúsculas o minúsculas).',
    enum: ['ASC', 'DESC', 'asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  sortDir?: 'ASC' | 'DESC' | 'asc' | 'desc' = 'ASC';

  // Filtros por texto parciales
  @ApiPropertyOptional({
    example: 'gomez',
    description: 'Filtro por nombre o apellido (búsqueda parcial).',
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nombre?: string; // busca en nombres y apellidos

  @ApiPropertyOptional({
    example: 'test@mail.com',
    description: 'Filtro de búsqueda parcial por email.',
    minLength: 1,
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @Length(1, 150)
  email?: string; // busca en los emails

  // Filtros exactos
  @ApiPropertyOptional({
    example: 1,
    description: 'Filtro por categoría. Valor entero >= 1.',
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idCategoria?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'Filtro por rol del usuario. Valor entero >= 1.',
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idRol?: number; // ADMIN=1, JUGADOR=2, CLUB=3

  @ApiPropertyOptional({
    example: 3,
    description: 'Filtro por estado del usuario. Valor entero >= 1.',
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idEstado?: number; // PENDIENTE=1, HABILITADO=2, BANEADO=3

  @ApiPropertyOptional({
    example: 2,
    description: 'Filtro por posición del jugador. Valor entero >= 1.',
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idPosicion?: number; // NO DEFINIDO=1, DRIVE=2, REVES=3
}

