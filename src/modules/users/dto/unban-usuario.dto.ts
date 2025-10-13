import { IsBoolean, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UnbanUsuarioDto {
  //Usar el idRol del usuario para un rol especifico sino usar applyAllRoles=true para todos.
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idRol?: number;

  //Si applyAllRoles es true desbanea todos los roles del usuario ignorando idRol
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  applyAllRoles?: boolean = false;

  //Nota/motivo campo opcional
  @IsOptional()
  @IsString()
  @Length(1, 300)
  descripcion?: string;
}
