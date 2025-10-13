//Archivo servicios para codear la logica de negocio referida al modulo usuarios, exponiendo los metodos que se llaman en el controller
//import para logica de la bd con sequelize
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

//import de clases de los dto y model necesarios
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { BajaUsuarioDto } from './dto/baja-usuario.dto';
import { Usuario } from '../../database/models/usuario.model';
import { UsuarioRol } from '../../database/models/usuariorol.model';
import { UsuarioPosicion } from '../../database/models/usuarioposicion.model';
import { Rol } from '../../database/models/rol.model';
import { Estado } from '../../database/models/Estado.model';
import { Posicion } from '../../database/models/posicion.model';
import { UnbanUsuarioDto } from './dto/unban-usuario.dto';
import { EditarUsuarioDto } from './dto/editar-usuario.dto';
import { EditarPosicionesDto } from './dto/editar-posiciones.dto';
import { EditarRolesDto } from './dto/editar-roles.dto';
import { ListarUsuariosDto } from './dto/listar-usuarios.dto';

// Valores por defecto en la creación de un usuario
const ROL_JUGADOR = 2;
const ESTADO_HABILITADO = 2;
const POSICION_NO_DEFINIDA = 1;

// Para ban
const ESTADO_BANEADO = 3;

//Posiciones definidas en la tabla Posiciones por semilla
const POS_NO_DEFINIDO = 1;
const POS_DRIVE = 2;
const POS_REVES = 3;

// Para cambios de estado
const ESTADO_PENDIENTE = 1;

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario) private readonly usuarioModel: typeof Usuario,
    @InjectModel(UsuarioRol) private readonly usuarioRolModel: typeof UsuarioRol,
    @InjectModel(UsuarioPosicion) private readonly usuarioPosModel: typeof UsuarioPosicion,
    @InjectModel(Posicion) private readonly posicionModel: typeof Posicion,
    private readonly sequelize: Sequelize,
  ) {}

  //Funcion para crear usuario con rol jugador (id 2), estado habilitado (id 2) y posicion no definida (id 1)
  //requiere un dto con al menos nombres, apellidos y email, el resto de los campos son opcionales
  async crearUsuario(dto: CrearUsuarioDto) {
    //validacion de mail existente, si la constante existente contiene un valor (un mail traido de la consulta a la bd) se lanza una excepcion interrumpiendo el flujo del metodo
    const existente = await this.usuarioModel.findOne({ where: { email: dto.email } });
    if (existente) throw new BadRequestException('El email ya está registrado');

    //constante user para super transaccion de tipo sequelize, si el create de algun model falla sequelize hace un rollback automatico, si todo sale bien hace un commit y guarda los cambios en la bd
    const usr = await this.sequelize.transaction(async (t) => {
      //Creacion de usuario con campos obligatorios y otros que pueden venir vacios del front, se agrega a t
      const nuevo = await this.usuarioModel.create(
        {
          nombres: dto.nombres,
          apellidos: dto.apellidos,
          dni: dto.dni ?? null,
          email: dto.email,
          fotoPerfil: dto.fotoPerfil ?? null,
          provincia: dto.provincia ?? null,
          localidad: dto.localidad ?? null,
          idCategoria: dto.idCategoria ?? null,
        },
        { transaction: t },
      );

      //alta de rol, estado y descripcion por defecto para completar el registro de la tabla usuarioRol, luego se agrega al t
      await this.usuarioRolModel.create(
        { idUsuario: nuevo.idUsuario, idRol: ROL_JUGADOR, idEstado: ESTADO_HABILITADO, descripcion: null },
        { transaction: t },
      );

      //alta de posicion por defecto del usuario que se crea para completar el registro en la tabla usuarioPosicion, y se agrega al t
      await this.usuarioPosModel.create(
        { idUsuario: nuevo.idUsuario, idPosicion: POSICION_NO_DEFINIDA },
        { transaction: t },
      );

      return nuevo;
    });

    //Consulta del registro creado con las relaciones, completo para ser retornado
    const withRels = await this.usuarioModel.findByPk(usr.idUsuario, {
      include: [
        { model: UsuarioRol, include: [Rol, Estado] },
        { model: UsuarioPosicion, include: [Posicion] },
      ],
    });

    //retorno para el controller con msj de exito
    return {
      mensaje: 'Usuario creado correctamente',
      usuario: withRels,
    };
  }

  //funcion para marcar como baneado un usuario segun su id y su rol, o su id y todos los roles
  //reqiere como parametro el id del usuario y el dto de la baja que puede traer el id del rol o la opcion aplicar a todos los roles (una de las 2) + la descripcion obligatoria
  async banUsuario(idUsuario: number, dto: BajaUsuarioDto) {
    //verifica que el usuario exista haciendo la consulta a la bd con el id, si la variable usuario esta vacia se lanza una excepcion y se corta el flujo del metodo
    const usuario = await this.usuarioModel.findByPk(idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    //otro control que posee este metodo es que el idRol o appyallroles uno de los dos (o pueden ser ambos) deben poseer un valor elegido por el usuario
    //asegurar que applyAllRoles venga en falso por defecto
    if (!dto.applyAllRoles && !dto.idRol) {
      throw new BadRequestException('Debe indicar idRol o applyAllRoles=true');
    }

    //transaccion de sequelize
    return this.sequelize.transaction(async (t) => {
      if (dto.applyAllRoles) {
        // Si applyAllRoles es true banear TODOS los roles del usuario con la misma descripcion del dto
        const [affected] = await this.usuarioRolModel.update(
          { idEstado: ESTADO_BANEADO, descripcion: dto.descripcion },
          { where: { idUsuario }, transaction: t },
        );
        //Este es un control por las dudas, pero no deberia lanzarse nunca esta excepcion ya que por defecto siempre el usuario tendra al menos 1 rol
        if (affected === 0) {
          throw new BadRequestException('El usuario no tiene roles asignados para banear');
        }
        //retorno de todos los roles baneados del usuario
        return { idUsuario, rolesBaneados: affected };
      } else {
        //Si applyAllRoles es falso (valor por defecto) es porque idRol posee un valor, se banea SOLO el rol indicado
        const [affected] = await this.usuarioRolModel.update(
          { idEstado: ESTADO_BANEADO, descripcion: dto.descripcion },
          { where: { idUsuario, idRol: dto.idRol }, transaction: t },
        );
        if (affected === 0) {
          throw new NotFoundException('No existe ese rol para el usuario');
        }
        return { idUsuario, idRol: dto.idRol, estado: 'BANEADO' };
      }
    });
  }

  //funciona exactamente igual que banUsuario pero con la diferencia que pasa a estado HABILITADO al/los roles del usuario
  async unbanUsuario(idUsuario: number, dto: UnbanUsuarioDto) {
    const usuario = await this.usuarioModel.findByPk(idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    if (!dto.applyAllRoles && !dto.idRol) {
      throw new BadRequestException('Debe indicar idRol o applyAllRoles=true');
    }

    return this.sequelize.transaction(async (t) => {
      if (dto.applyAllRoles) {
        // Desbanear TODOS los roles del usuario
        const [affected] = await this.usuarioRolModel.update(
          { idEstado: ESTADO_HABILITADO, descripcion: dto.descripcion ?? null },
          { where: { idUsuario }, transaction: t },
        );
        if (affected === 0) {
          throw new BadRequestException('El usuario no tiene roles para actualizar');
        }
        return { idUsuario, rolesHabilitados: affected };
      } else {
        // Desbanear SOLO el rol indicado
        const [affected] = await this.usuarioRolModel.update(
          { idEstado: ESTADO_HABILITADO, descripcion: dto.descripcion ?? null },
          { where: { idUsuario, idRol: dto.idRol }, transaction: t },
        );
        if (affected === 0) {
          throw new NotFoundException('No existe ese rol para el usuario');
        }
        return { idUsuario, idRol: dto.idRol, estado: 'HABILITADO' };
      }
    });
  }

  //actualiza los datos de un registro de la tabla usuarios, utiliza como parametro el id del usuario a editar y 
  //el dto editarUsuario con los campos editables, que a su vez es una extension de tipo parcial del dto de crearUsuario.
  async editarUsuario(idUsuario: number, dto: EditarUsuarioDto) {
    //verificar la existencia del usuario en la bd con su id
    const usuario = await this.usuarioModel.findByPk(idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Armamos el set de cambios solo para campos editables. Asegurar en front que no se pueda editar el mail
    const cambios: Partial<Usuario> = {
      nombres: dto.nombres ?? usuario.nombres,
      apellidos: dto.apellidos ?? usuario.apellidos,
      dni: dto.dni ?? usuario.dni,
      fotoPerfil: dto.fotoPerfil ?? usuario.fotoPerfil,
      provincia: dto.provincia ?? usuario.provincia,
      localidad: dto.localidad ?? usuario.localidad,
      idCategoria: dto.idCategoria ?? usuario.idCategoria,
    };

    await this.usuarioModel.update(cambios, { where: { idUsuario } });

    //Construye el usuario editado con sus relaciones
    const actualizado = await this.usuarioModel.findByPk(idUsuario, {
      include: [
        { model: UsuarioRol, include: [Rol, Estado] },
        { model: UsuarioPosicion, include: [Posicion] },
      ],
    });

    //retorna usuario actualizado
    return {
      mensaje: 'Usuario actualizado correctamente',
      usuario: actualizado,
    };
  }

  //reemplaza el set de posiciones de un usuario dado como parametro su id y un dto de editarposiciones con los id de las nuevas posiciones
  async actualizarPosiciones(idUsuario: number, dto: EditarPosicionesDto) {
    //verificar que el usuario exista segun su id, sino lanzar una excepcion
    const usuario = await this.usuarioModel.findByPk(idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    //toma el dto.posiciones y castea cada valor a number, si existe un duplicado lo elimina
    const set = Array.from(new Set((dto.posiciones ?? []).map(n => Number(n))));
    //si el arreylo set queda vacio es porque el dto posiciones vino vacio se lanza una excepcion
    if (set.length === 0) throw new BadRequestException('Debe indicar al menos una posición');

    //Si el arreglo set incluye el 1 (es el id de NO DEFINIDO) no deberia poder contener otra posicion
    //las combinaciones posibles para set serian 1, 2, 3 o 2 y 3 juntos.
    if (set.includes(POS_NO_DEFINIDO) && set.length > 1) {
      throw new BadRequestException('Si se elige NO DEFINIDO, no puede combinarse con otras posiciones');
    }

    //almacena los id validos en el arreglo validos (1, 2 y 3) y compara con los id del set, si alguno esta fuera de ese rango lo almacena en invalido
    const validos = [POS_NO_DEFINIDO, POS_DRIVE, POS_REVES];
    const invalidos = set.filter(id => !validos.includes(id));
    //si invalidos tiene al menos 1 valor lanza una excepcion, existen posiciones inexistentes/inventados
    if (invalidos.length > 0) throw new BadRequestException('Posiciones inválidas: ${invalidos.join(', ')}');

    //transaccion para reemplazo, borra las filas actuales de usuarioPosicion de ese idUsuario e inserta las que vinieron en el set, es un reemplazo total
    //si algo falla sequelize hace rollback automatico
    await this.sequelize.transaction(async (t) => {
      await this.usuarioPosModel.destroy({ where: { idUsuario }, transaction: t });
      await this.usuarioPosModel.bulkCreate(
        set.map(idPosicion => ({ idUsuario, idPosicion })),
        { transaction: t },
      );
    });

    //genera el usuario con las relaciones rol + estado y posiciones y devuelve el objeto listo para el front
    const actualizado = await this.usuarioModel.findByPk(idUsuario, {
      include: [
        { model: UsuarioRol, include: [Rol, Estado] },
        { model: UsuarioPosicion, include: [Posicion] },
      ],
    });

    return {
      mensaje: 'Posiciones actualizadas correctamente',
      usuario: actualizado,
    };
  }

  //reemplaza el set de roles de un usuario, con el id del usuario como parametro y el dto que trae los roles, estados y descripciones
  async actualizarRoles(idUsuario: number, dto: EditarRolesDto) {
    //verificar que el id exista, sino 404
    const usuario = await this.usuarioModel.findByPk(idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    //castea el array roles a numeros, si existen duplicados los elimina y los almacena en nuevo
    const nuevo = Array.from(new Set((dto.roles ?? []).map(Number)));
    //si el arreglo nuevo no tiene valores lanza excepcion
    if (nuevo.length === 0) throw new BadRequestException('Debe indicar al menos un rol');

    //los roles son fijos y creados por semilla, esta excepcion nunca se deberia ejecutar pero en caso de que se cree un nuevo rol, se deberia agregar al arreglo rolesValidos
    const rolesValidos = [1, 2, 3]; // ADMIN=1, JUGADOR=2, CLUB=3
    //valida los elementos del arreglo nuevo con rolesValidos, si alguno no existe lo almacena en invalido
    const invalidos = nuevo.filter((r) => !rolesValidos.includes(r));
    //si invalido tiene al menos un elemento lanza excepcion
    if (invalidos.length) throw new BadRequestException('Roles inválidos: ${invalidos.join(', ')}');

    //lee el dto que recibe del front y se crea un map de tipo clave-valor donde la clave es idRol y el valor esta formado por idEstado y descripcion si tuviese
    const mapa = new Map<number, { idEstado: number; descripcion?: string }>();
    //con foreach recorremos cada elemento del dto.estados y con el metodo set del mapa declarado anteriormente se van creando los pares clave (idRol de cada elemento - valor con idEstado + descripcion de cada elemento)
    (dto.estados ?? []).forEach((e) => mapa.set(e.idRol, { idEstado: e.idEstado, descripcion: e.descripcion }));

    //estado por defecto por si algun rol nuevo no especifica estado
    const defaultEstado = dto.defaultEstado ?? ESTADO_PENDIENTE;

    // Traer roles actuales del usuario
    const actuales = await this.usuarioRolModel.findAll({ where: { idUsuario } });
    const actualesSet = new Set(actuales.map((ur) => ur.idRol));

    //busca roles en el mapa que no esten actualmente en el usuario, los agrega a toAdd
    const toAdd = nuevo.filter((r) => !actualesSet.has(r));
    //busca coincidencias entre los roles nuevos y los que actualmente tiene el usuario para mantener, los agrega a Keep
    const toKeep = nuevo.filter((r) => actualesSet.has(r));
    //roles que el usuario tenia pero deben ser removidos
    const toRemove = [...actualesSet].filter((r) => !nuevo.includes(r));

    //transaccion para borrar, crear o actualizar
    await this.sequelize.transaction(async (t) => {
      // Eliminar los que ya no esten
      if (toRemove.length) {
        await this.usuarioRolModel.destroy({ where: { idUsuario, idRol: { [Op.in]: toRemove } as any }, transaction: t });
      }

      // Crear los nuevos
      if (toAdd.length) {
        const rows = toAdd.map((idRol) => {
          const override = mapa.get(idRol);
          return {
            idUsuario,
            idRol,
            idEstado: override?.idEstado ?? defaultEstado,
            descripcion: override?.descripcion ?? null,
          };
        });
        await this.usuarioRolModel.bulkCreate(rows, { transaction: t });
      }

      // Actualizar estado/descripcion de los que se mantienen si estan en el mapa
      const toUpdate = toKeep.filter((idRol) => mapa.has(idRol));
      for (const idRol of toUpdate) {
        const { idEstado, descripcion } = mapa.get(idRol)!;
        await this.usuarioRolModel.update(
          { idEstado, descripcion: descripcion ?? null },
          { where: { idUsuario, idRol }, transaction: t },
        );
      }
    });

    // Responder con las relaciones actualizadas
    const actualizado = await this.usuarioModel.findByPk(idUsuario, {
      include: [
        { model: UsuarioRol, include: [Rol, Estado] },
        { model: UsuarioPosicion, include: [Posicion] },
      ],
    });

    return {
      mensaje: 'Roles actualizados correctamente',
      usuario: actualizado,
    };
  }

  //Busca un usuario segun su id, si lo encuentra lo retorna con todas sus relaciones, sino lanza una excepcion
  async obtenerUsuario(idUsuario: number) {
    const usuario = await this.usuarioModel.findByPk(idUsuario, {
      include: [
        { model: UsuarioRol, include: [Rol, Estado] },
        { model: UsuarioPosicion, include: [Posicion] },
      ],
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  //lista/busca usuarios con el parametro query listarUsuarioDto
  async listarUsuarios(q: ListarUsuariosDto) {
    //paginacion page y limite de usuarios en cada pagina
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    const offset = (page - 1) * limit;
    //orden por algun campo especifico en sortBy y tipo de orden con sortDir
    const order: any[] = [[q.sortBy ?? 'idUsuario', (q.sortDir ?? 'ASC').toUpperCase()]];

    // WHERE principal (de tipo contain) en tabla usuario por email
    const whereUsuario: any = {};
    if (q.email) {
      whereUsuario.email = { [Op.like]: `%${q.email}%` };
    }
    //por nombre o apellido
    if (q.nombre) {
      whereUsuario[Op.or] = [
        { nombres: { [Op.like]: `%${q.nombre}%` } },
        { apellidos: { [Op.like]: `%${q.nombre}%` } },
      ];
    }
    if (q.idCategoria) {
      whereUsuario.idCategoria = q.idCategoria;
    }

    //filtros por rol y/o estado
    const include: any[] = [
      {
        model: UsuarioRol,
        include: [Rol, Estado],
        required: !!(q.idRol || q.idEstado),
        where: {
          ...(q.idRol ? { idRol: q.idRol } : {}),
          ...(q.idEstado ? { idEstado: q.idEstado } : {}),
        },
      },
      {
        //filtro por posicion
        model: UsuarioPosicion,
        include: [Posicion],
        required: !!q.idPosicion,
        where: {
          ...(q.idPosicion ? { idPosicion: q.idPosicion } : {}),
        },
      },
    ];

    const { rows, count } = await this.usuarioModel.findAndCountAll({
      where: whereUsuario,
      include,
      order,
      limit,
      offset,
      distinct: true,
    });

    return {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      items: rows,
    };
  }
}
