// Archivo servicios para codear la logica de negocio referida al modulo usuarios, exponiendo los metodos que se llaman en el controller
// import para logica de la bd con sequelize
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

// models necesarios
import { Usuario } from '../../database/models/usuario.model';
import { UsuarioRol } from '../../database/models/usuariorol.model';
import { UsuarioPosicion } from '../../database/models/usuarioposicion.model';
import { Rol } from '../../database/models/rol.model';
import { Estado } from '../../database/models/Estado.model';
import { Posicion } from '../../database/models/posicion.model';

// Dto´s
import { UnbanUsuarioDto } from './dto/unban-usuario.dto';
import { EditarUsuarioDto } from './dto/editar-usuario.dto';
import { EditarPosicionesDto } from './dto/editar-posiciones.dto';
import { EditarRolesDto } from './dto/editar-roles.dto';
import { ListarUsuariosDto } from './dto/listar-usuarios.dto';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { BajaUsuarioDto } from './dto/baja-usuario.dto';
import { Categoria } from 'src/database/models/Categoria.model';


import { ClubsService } from '../clubs/clubs.service';

// Valores por defecto en la creación de un usuario
const ROL_JUGADOR = 2;
const ESTADO_HABILITADO = 2;
const POSICION_NO_DEFINIDA = 1;

// Para ban
const ESTADO_BANEADO = 3;

// Posiciones definidas en la tabla Posiciones por semilla
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
    @InjectModel(Rol) private readonly rolModel: typeof Rol,
    @InjectModel(Estado) private readonly estadoModel: typeof Estado,
    @InjectModel(Estado) private readonly categoriaModel: typeof Categoria,
    private readonly sequelize: Sequelize,
    private readonly clubsService: ClubsService,
  ) {}

  // Método público para buscar usuario por email (sino tira error en el auth.service)
  async findByEmail(email: string) {
    return this.usuarioModel.findOne({ where: { email } });
  }

  // Funcion para crear usuario con rol jugador (id 2), estado habilitado (id 2) y posicion no definida (id 1)
  // requiere un dto con al menos nombres, apellidos y email, el resto de los campos son opcionales
  async crearUsuario(dto: CrearUsuarioDto) {
    // validacion de mail existente
    const existente = await this.usuarioModel.findOne({ where: { email: dto.email } });
    if (existente) throw new BadRequestException('El email ya está registrado');

    // super transaccion de tipo sequelize
    const usr = await this.sequelize.transaction(async (t) => {
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

      await this.usuarioRolModel.create(
        { idUsuario: nuevo.idUsuario, idRol: ROL_JUGADOR, idEstado: ESTADO_HABILITADO, descripcion: null },
        { transaction: t },
      );

      await this.usuarioPosModel.create(
        { idUsuario: nuevo.idUsuario, idPosicion: POSICION_NO_DEFINIDA },
        { transaction: t },
      );

      return nuevo;
    });

    const withRels = await this.usuarioModel.findByPk(usr.idUsuario, {
      include: [
        { model: UsuarioRol, include: [Rol, Estado] },
        { model: UsuarioPosicion, include: [Posicion] },
      ],
    });

    return {
      mensaje: 'Usuario creado correctamente',
      usuario: withRels,
    };
  }

  // funcion para marcar como baneado un usuario
  async banUsuario(idUsuario: number, dto: BajaUsuarioDto) {
    const usuario = await this.usuarioModel.findByPk(idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    if (!dto.applyAllRoles && !dto.idRol) {
      throw new BadRequestException('Debe indicar idRol o applyAllRoles=true');
    }

    return this.sequelize.transaction(async (t) => {
      if (dto.applyAllRoles) {
        const [affected] = await this.usuarioRolModel.update(
          { idEstado: ESTADO_BANEADO, descripcion: dto.descripcion },
          { where: { idUsuario }, transaction: t },
        );
        if (affected === 0) {
          throw new BadRequestException('El usuario no tiene roles asignados para banear');
        }
        return { idUsuario, rolesBaneados: affected };
      } else {
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

  // funciona exactamente igual que banUsuario pero pasa a estado HABILITADO
  async unbanUsuario(idUsuario: number, dto: UnbanUsuarioDto) {
    const usuario = await this.usuarioModel.findByPk(idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    if (!dto.applyAllRoles && !dto.idRol) {
      throw new BadRequestException('Debe indicar idRol o applyAllRoles=true');
    }

    return this.sequelize.transaction(async (t) => {
      if (dto.applyAllRoles) {
        const [affected] = await this.usuarioRolModel.update(
          { idEstado: ESTADO_HABILITADO, descripcion: dto.descripcion ?? null },
          { where: { idUsuario }, transaction: t },
        );
        if (affected === 0) {
          throw new BadRequestException('El usuario no tiene roles para actualizar');
        }
        return { idUsuario, rolesHabilitados: affected };
      } else {
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

  // actualiza los datos de un registro de la tabla usuarios
  async editarUsuario(idUsuario: number, dto: EditarUsuarioDto) {
    const usuario = await this.usuarioModel.findByPk(idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const cambios: Partial<Usuario> = {
      nombres: dto.nombres ?? usuario.nombres,
      apellidos: dto.apellidos ?? usuario.apellidos,
      dni: dto.dni ?? usuario.dni,
      fotoPerfil: dto.fotoPerfil ?? usuario.fotoPerfil,
      provincia: dto.provincia ?? usuario.provincia,
      localidad: dto.localidad ?? usuario.localidad,
      idCategoria: dto.idCategoria ?? usuario.idCategoria,

      telefono: dto.telefono ?? usuario.telefono,
      direccion: dto.direccion ?? usuario.direccion,
    };

    await this.usuarioModel.update(cambios, { where: { idUsuario } });

    if (dto.idPosicion) {
      await this.usuarioPosModel.destroy({ where: { idUsuario } });
      await this.usuarioPosModel.create({ idUsuario, idPosicion: dto.idPosicion });
    }

    const actualizado = await this.usuarioModel.findByPk(idUsuario, {
      include: [
        { model: UsuarioRol, include: [Rol, Estado] },
        { model: UsuarioPosicion, include: [Posicion] },
      ],
    });

    return {
      mensaje: 'Usuario actualizado correctamente',
      usuario: actualizado,
    };
  }

  // reemplaza el set de posiciones de un usuario
  async actualizarPosiciones(idUsuario: number, dto: EditarPosicionesDto) {
    const usuario = await this.usuarioModel.findByPk(idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const set = Array.from(new Set((dto.posiciones ?? []).map(n => Number(n))));
    if (set.length === 0) throw new BadRequestException('Debe indicar al menos una posición');

    if (set.includes(POS_NO_DEFINIDO) && set.length > 1) {
      throw new BadRequestException('Si se elige NO DEFINIDO, no puede combinarse con otras posiciones');
    }

    const validos = [POS_NO_DEFINIDO, POS_DRIVE, POS_REVES];
    const invalidos = set.filter(id => !validos.includes(id));
    if (invalidos.length > 0) throw new BadRequestException('Posiciones inválidas: ${invalidos.join(\', \')}');

    await this.sequelize.transaction(async (t) => {
      await this.usuarioPosModel.destroy({ where: { idUsuario }, transaction: t });
      await this.usuarioPosModel.bulkCreate(
        set.map(idPosicion => ({ idUsuario, idPosicion })),
        { transaction: t },
      );
    });

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

  // reemplaza el set de roles de un usuario
  async actualizarRoles(idUsuario: number, dto: EditarRolesDto) {
    const usuario = await this.usuarioModel.findByPk(idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const nuevo = Array.from(new Set((dto.roles ?? []).map(Number)));
    if (nuevo.length === 0) throw new BadRequestException('Debe indicar al menos un rol');

    const rolesValidos = [1, 2, 3]; // ADMIN=1, JUGADOR=2, CLUB=3
    const invalidos = nuevo.filter((r) => !rolesValidos.includes(r));
    if (invalidos.length) throw new BadRequestException('Roles inválidos: ${invalidos.join(\', \')}');

    const mapa = new Map<number, { idEstado: number; descripcion?: string }>();
    (dto.estados ?? []).forEach((e) => mapa.set(e.idRol, { idEstado: e.idEstado, descripcion: e.descripcion }));

    const defaultEstado = dto.defaultEstado ?? ESTADO_PENDIENTE;

    const actuales = await this.usuarioRolModel.findAll({ where: { idUsuario } });
    const actualesSet = new Set(actuales.map((ur) => ur.idRol));

    const toAdd = nuevo.filter((r) => !actualesSet.has(r));
    const toKeep = nuevo.filter((r) => actualesSet.has(r));
    const toRemove = [...actualesSet].filter((r) => !nuevo.includes(r));

    await this.sequelize.transaction(async (t) => {
      if (toRemove.length) {
        await this.usuarioRolModel.destroy({
          where: { idUsuario, idRol: { [Op.in]: toRemove } as any },
          transaction: t,
        });
      }

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

      const toUpdate = toKeep.filter((idRol) => mapa.has(idRol));
      for (const idRol of toUpdate) {
        const { idEstado, descripcion } = mapa.get(idRol)!;
        await this.usuarioRolModel.update(
          { idEstado, descripcion: descripcion ?? null },
          { where: { idUsuario, idRol }, transaction: t },
        );
      }
    });

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

  // Busca un usuario segun su id, retorna con todas sus relaciones
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

  // lista/busca usuarios con el parametro query listarUsuarioDto
  async listarUsuarios(q: ListarUsuariosDto) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    const offset = (page - 1) * limit;
    const order: any[] = [[q.sortBy ?? 'idUsuario', (q.sortDir ?? 'ASC').toUpperCase()]];

    const whereUsuario: any = {};
    if (q.email) {
      whereUsuario.email = { [Op.like]: `%${q.email}%` };
    }
    if (q.nombre) {
      whereUsuario[Op.or] = [
        { nombres: { [Op.like]: `%${q.nombre}%` } },
        { apellidos: { [Op.like]: `%${q.nombre}%` } },
      ];
    }
    if (q.idCategoria) {
      whereUsuario.idCategoria = q.idCategoria;
    }

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
  async listarMisPartidos(userId: number) {
  console.log('Buscando partidos del user:', userId);
  return this.clubsService.listarMisPartidos(userId);
}
}
