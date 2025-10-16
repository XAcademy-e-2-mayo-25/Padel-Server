//validaciones necesarias y transform para casteo de datos
import { IsBoolean, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class BajaUsuarioDto {
  //Usar el idRol del usuario para un rol especifico o usar applyAllRoles=true para todos los roles
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idRol?: number;
  //idRol es opcional, el valor String es casteado a entero, se chequea que se haya podido castear y sea mayor o igual a 1

  //campo opcional, por defecto falso, si es true, banea todos los roles del usuario ignorando idRol
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  applyAllRoles?: boolean = false;
  //campo opcional, por defecto falso

  // Motivo de la baja campo requerido (no tiene isOptional), el simbolo ! indica que este dato viene del body del front
  @IsString()
  @Length(1, 300)
  descripcion!: string;
}
