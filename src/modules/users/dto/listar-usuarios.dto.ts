import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

//Con este dto se podra buscar, filtrar, ordenar y paginar usuarios
//definiendo parametros de busqueda y filtrado para que desde el front se puedan usar enviando query params en la URL
//todos los campos seran opcionales haciendo posible usar solo 1, combinar y usar varios o ninguno
export class ListarUsuariosDto {
  // Paginacion par acontrolar la cantidad de registros devueltos por pagina, por defecto empieza en pagina 1 y cantidad de registros por pagina 10
  //para usar: URL/usuarios?page=1&limit=10
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

  //Ordenamiento ascendente y descendente por diferentes campos
  //para usar: URL/usuarios?sortBy=apellidos&sortDir=ASC (ORDENAR LOS REGISTROS POR APELLIDO EN FORMA ASCENDENTE, SERIA POR ORDEN ALFABETICO)
  //se puede combinar con page y limit tambien: URL/usuarios?sortBy=apellidos&sortDir=ASC&page=1&limit=50 (MISMA BUSQUEDA QUE LA ANTERIOR PERO PAGINAR DE A 50 REGISTROS)
  @IsOptional()
  //campo de ordenamiento
  @IsIn(['idUsuario', 'nombres', 'apellidos', 'email', 'idCategoria'])
  sortBy?: 'idUsuario' | 'nombres' | 'apellidos' | 'email' | 'idCategoria' = 'idUsuario';
  //direccion en minusculas y mayusculas por las dudas, esto seria bueno colocar una lista desplegable en el front para evitar tipeo
  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  sortDir?: 'ASC' | 'DESC' | 'asc' | 'desc' = 'ASC';

  // Filtros por texto parciales de tipo contains
  // para usar: URL/usuarios?apellidos=gomez
  // para usar: URL/usuarios?email=test
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nombre?: string; // busca en nombres y apellidos

  @IsOptional()
  @IsString()
  @Length(1, 150)
  email?: string; // busca en los emails

  // Filtros exactos por ID del usuario
  // para usar: URL/usuarios?idCategoria=1
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idCategoria?: number;

  // Filtros por relacion, rol, estado o posicion, tambien se pueden combinar
  // para usar: URL/usuarios?idRol=2&idPosicion=2 (BUSCA ROLES JUGADOR POSICION DRIVE)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idRol?: number; // ADMIN=1, JUGADOR=2, CLUB=3

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idEstado?: number; // PENDIENTE=1, HABILITADO=2, BANEADO=3

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  idPosicion?: number; // NO DEFINIDO=1, DRIVE=2, REVES=3
}
