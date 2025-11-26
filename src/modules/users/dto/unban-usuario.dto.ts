import { IsBoolean, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UnbanUsuarioDto {
  //Usar el idRol del usuario para un rol especifico sino usar applyAllRoles=true para todos.
  @ApiPropertyOptional({
    example: 3,
    description:
      'ID del rol a desbanear. Si se usa applyAllRoles=true, este campo es ignorado.',
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idRol?: number;

  //Si applyAllRoles es true desbanea todos los roles del usuario ignorando idRol
  @ApiPropertyOptional({
    example: false,
    default: false,
    description:
      'Si es true, se desbanean todos los roles del usuario e ignora idRol.',
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  applyAllRoles?: boolean = false;

  //Nota/motivo campo opcional
  @ApiPropertyOptional({
    example: 'Revisión realizada. Se revierte la sanción.',
    description: 'Motivo del desbaneo (opcional, longitud 1 a 300 caracteres).',
    minLength: 1,
    maxLength: 300,
  })
  @IsOptional()
  @IsString()
  @Length(1, 300)
  descripcion?: string;
}

