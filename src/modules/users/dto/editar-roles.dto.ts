import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EstadoDescripcionPorRol {
  @IsInt()
  @Min(1)
  idRol!: number; //Seran los idRol que definimos en los registros semillas

  @IsInt()
  @Min(1) //Seran los idEstado que definimos en los registros semillas
  @Max(3)
  idEstado!: number;

  @IsOptional()
  @IsString()
  descripcion?: string; //El motivo es opcional
}

export class EditarRolesDto {
  //array no vacio de numeros enteros con valores de 1 a 3
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
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EstadoDescripcionPorRol)
  estados?: EstadoDescripcionPorRol[];

  // Opcional estado por defecto para nuevos roles si no se especifica en el item anterior
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  defaultEstado?: number; // si no viene usa PENDIENTE (1)
}
