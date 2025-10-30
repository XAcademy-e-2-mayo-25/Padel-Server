//validaciones necesarias y transform para casteo de datos
import { IsBoolean, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BajaUsuarioDto {
  //Usar el idRol del usuario para un rol especifico o usar applyAllRoles=true para todos los roles
  @ApiPropertyOptional({
    example: 3,
    description:
      'ID del rol a dar de baja. Si se usa applyAllRoles=true, este campo se ignora.',
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idRol?: number;
  //idRol es opcional, el valor String es casteado a entero, se chequea que se haya podido castear y sea mayor o igual a 1

  //campo opcional, por defecto falso, si es true, banea todos los roles del usuario ignorando idRol
  @ApiPropertyOptional({
    example: false,
    default: false,
    description:
      'Si es true, aplica la baja para todos los roles del usuario e ignora idRol.',
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  applyAllRoles?: boolean = false;
  //campo opcional, por defecto falso

  // Motivo de la baja campo requerido (no tiene isOptional), el simbolo ! indica que este dato viene del body del front
  @ApiProperty({
    example: 'Incumplimiento de normas en reiteradas ocasiones.',
    description: 'Motivo de la baja. Longitud entre 1 y 300 caracteres.',
    minLength: 1,
    maxLength: 300,
  })
  @IsString()
  @Length(1, 300)
  descripcion!: string;
}

