import { PartialType } from '@nestjs/swagger';
import { CrearUsuarioDto } from './crear-usuario.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class EditarUsuarioDto extends PartialType(CrearUsuarioDto) {
  @ApiPropertyOptional({
    example: '3515123456',
    description: 'Teléfono del usuario (opcional)',
    minLength: 5,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  telefono?: string;

  @ApiPropertyOptional({
    example: 'Av. San Martín 1234',
    description: 'Dirección del usuario (opcional)',
    minLength: 1,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  direccion?: string;
}

