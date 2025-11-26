import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiExtraModels, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EstadoDescripcionPorRol {
  @ApiProperty({
    example: 2,
    description: 'ID del rol (semilla). Debe ser entero ≥ 1.',
    minimum: 1,
    type: Number,
  })
  @IsInt()
  @Min(1)
  idRol!: number; //Seran los idRol que definimos en los registros semillas

  @ApiProperty({
    example: 1,
    description: 'ID de estado (semilla). Rango permitido: 1 a 3.',
    minimum: 1,
    maximum: 3,
    type: Number,
  })
  @IsInt()
  @Min(1) //Seran los idEstado que definimos en los registros semillas
  @Max(3)
  idEstado!: number;

  @ApiPropertyOptional({
    example: 'Asignado temporalmente por el administrador.',
    description: 'Motivo/nota opcional asociado al cambio de estado.',
  })
  @IsOptional()
  @IsString()
  descripcion?: string; //El motivo es opcional
}

@ApiExtraModels(EstadoDescripcionPorRol)
export class EditarRolesDto {
  //array no vacio de numeros enteros con valores de 1 a 3
  @ApiProperty({
    example: [1, 2],
    description:
      'Lista de roles a asignar. Debe ser un array no vacío de enteros entre 1 y 3. Acepta [1,2], ["1","2"], 1, "1" (se transforman a números).',
    isArray: true,
    minItems: 1,
    type: Number,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(3, { each: true })
  @Transform(({ value }) => {
    // acepta [1,2], ["1","2"], 1, "1"
    if (Array.isArray(value)) return value.map((v) => Number(v));
    if (value === undefined || value === null) return [];
    return [Number(value)];
  })
  roles!: number[];

  // Opcional estado por rol para nuevos o existentes
  @ApiPropertyOptional({
    description:
      'Estados específicos por rol (opcional). Si se envía, cada item debe incluir idRol (≥1), idEstado (1..3) y una descripción opcional.',
    isArray: true,
    type: () => EstadoDescripcionPorRol,
    example: [
      { idRol: 1, idEstado: 2, descripcion: 'Verificado por admin' },
      { idRol: 2, idEstado: 1 },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EstadoDescripcionPorRol)
  estados?: EstadoDescripcionPorRol[];

  // Opcional estado por defecto para nuevos roles si no se especifica en el item anterior
  @ApiPropertyOptional({
    example: 1,
    description:
      'Estado por defecto para roles nuevos si no se indicó en "estados". Rango permitido: 1 a 3. Si no viene, se usará PENDIENTE (1).',
    minimum: 1,
    maximum: 3,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  defaultEstado?: number; // si no viene usa PENDIENTE (1)
}

