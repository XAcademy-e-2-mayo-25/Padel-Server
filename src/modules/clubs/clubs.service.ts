import { BadRequestException, Injectable, NotFoundException,} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op } from 'sequelize';

// Modelos
import { Club } from '../../database/models/club.model';
import { Cancha } from '../../database/models/cancha.model';
import { Turno } from '../../database/models/turno.model';
import { CanchaTurno } from '../../database/models/canchaTurno.model';
import { DatosPago } from '../../database/models/datosPago.model';
import { Usuario } from '../../database/models/usuario.model';
import { Estado } from '../../database/models/Estado.model';

// DTOs
import {
  CrearClubDto,
  EditarClubDto,
  CrearCanchaDto,
  EditarCanchaDto,
  CrearTurnoDto,
  CrearSlotDto,
  EditarTurnoDto,
  AsignarTurnoCanchaDto,
  QuitarTurnoCanchaDto,
  ActualizarTurnoCanchaDto,
  CrearDatosPagoDto,
  ActualizarDatosPagoDto,
  ListarCanchasDto,
  ListarClubsDto,
  ListarDatosPagosDto,
  ListarTurnosDto,
  ListarTurnosCanchasDto,
} from './dto';

//estados
const ESTADO_PENDIENTE = 1;
const ESTADO_HABILITADO = 2;
const ESTADO_BANEADO   = 3;

@Injectable()
export class ClubsService {
  constructor(
    @InjectModel(Club) private readonly clubModel: typeof Club,
    @InjectModel(Cancha) private readonly canchaModel: typeof Cancha,
    @InjectModel(Turno) private readonly turnoModel: typeof Turno,
    @InjectModel(CanchaTurno) private readonly canchaTurnoModel: typeof CanchaTurno,
    @InjectModel(DatosPago) private readonly datosPagoModel: typeof DatosPago,
    @InjectModel(Usuario) private readonly usuarioModel: typeof Usuario,
    @InjectModel(Estado) private readonly estadoModel: typeof Estado,
    //private readonly sequelize: Sequelize,
  ) {}

  // METODOS CLUB

  async crearClub(dto: CrearClubDto) {
    // validar usuario existente
    const user = await this.usuarioModel.findByPk(dto.idUsuario);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    // validar CUIT/CUIL único
    const dup = await this.clubModel.findOne({ where: { cuitCuil: dto.cuitCuil } });
    if (dup) throw new BadRequestException('Ya existe un club con ese CUIT/CUIL');

    const creado = await this.clubModel.create({
      idUsuario: dto.idUsuario,
      razonSocial: dto.razonSocial ?? null,
      nombreFantasia: dto.nombreFantasia ?? null,
      cuitCuil: dto.cuitCuil,
      provincia: dto.provincia,
      localidad: dto.localidad,
      direccion: dto.direccion,
      idEstadoClub: dto.idEstadoClub ?? ESTADO_PENDIENTE,
    });

    const withRels = await this.clubModel.findByPk(creado.idClub, {
      include: [Usuario, Estado],
    });

    return { mensaje: 'Club creado correctamente', club: withRels };
  }

  async editarClub(idClub: number, dto: EditarClubDto) {
    const club = await this.clubModel.findByPk(idClub);
    if (!club) throw new NotFoundException('Club no encontrado');

    // si actualiza CUIT/CUIL, verificar uniqueness
    if (dto.cuitCuil && dto.cuitCuil !== club.cuitCuil) {
      const exists = await this.clubModel.findOne({ where: { cuitCuil: dto.cuitCuil } });
      if (exists) throw new BadRequestException('CUIT/CUIL ya utilizado por otro club');
    }

    const cambios: Partial<Club> = {
      idUsuario: dto.idUsuario ?? club.idUsuario,
      razonSocial: dto.razonSocial ?? club.razonSocial,
      nombreFantasia: dto.nombreFantasia ?? club.nombreFantasia,
      cuitCuil: dto.cuitCuil ?? club.cuitCuil,
      provincia: dto.provincia ?? club.provincia,
      localidad: dto.localidad ?? club.localidad,
      direccion: dto.direccion ?? club.direccion,
      idEstadoClub: dto.idEstadoClub ?? club.idEstadoClub,
    };

    await this.clubModel.update(cambios, { where: { idClub } });

    const actualizado = await this.clubModel.findByPk(idClub, {
      include: [Usuario, Estado],
    });

    return { mensaje: 'Club actualizado correctamente', club: actualizado };
  }

  async obtenerClub(idClub: number) {
    const club = await this.clubModel.findByPk(idClub, { include: [Usuario, Estado] });
    if (!club) throw new NotFoundException('Club no encontrado');
    return club;
  }

  async listarClubs(q: ListarClubsDto) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    const offset = (page - 1) * limit;
    const order: any[] = [[q.sortBy ?? 'idClub', (q.sortDir ?? 'ASC').toUpperCase()]];

    const where: any = {};
    if (q.cuitCuil) where.cuitCuil = { [Op.like]: `%${q.cuitCuil}%` };
    if (q.provincia) where.provincia = { [Op.like]: `%${q.provincia}%` };
    if (q.localidad) where.localidad = { [Op.like]: `%${q.localidad}%` };
    if (q.idEstadoClub) where.idEstadoClub = q.idEstadoClub;
    if (q.idUsuario) where.idUsuario = q.idUsuario;

    // nombre busca en razonSocial OR nombreFantasia
    if (q.nombre) {
      where[Op.or] = [
        { razonSocial: { [Op.like]: `%${q.nombre}%` } },
        { nombreFantasia: { [Op.like]: `%${q.nombre}%` } },
      ];
    }

    const { rows, count } = await this.clubModel.findAndCountAll({
      where,
      include: [Usuario, Estado],
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

  // METODOS CANCHA

  async crearCancha(dto: CrearCanchaDto) {
    // validar club
    const club = await this.clubModel.findByPk(dto.idClub);
    if (!club) throw new NotFoundException('Club no encontrado');

    const nueva = await this.canchaModel.create({
      idClub: dto.idClub,
      denominacion: dto.denominacion,
      cubierta: dto.cubierta ?? null,
      observaciones: dto.observaciones ?? null,
    });

    return { mensaje: 'Cancha creada correctamente', cancha: nueva };
  }

  async editarCancha(idCancha: number, dto: EditarCanchaDto) {
    const cancha = await this.canchaModel.findByPk(idCancha);
    if (!cancha) throw new NotFoundException('Cancha no encontrada');

    const cambios: Partial<Cancha> = {
      idClub: dto.idClub ?? cancha.idClub,
      denominacion: dto.denominacion ?? cancha.denominacion,
      cubierta: dto.cubierta ?? cancha.cubierta,
      observaciones: dto.observaciones ?? cancha.observaciones,
    };

    await this.canchaModel.update(cambios, { where: { idCancha } });

    const actualizado = await this.canchaModel.findByPk(idCancha, { include: [Club] });
    return { mensaje: 'Cancha actualizada correctamente', cancha: actualizado };
  }

  async listarCanchas(q: ListarCanchasDto) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    const offset = (page - 1) * limit;
    const order: any[] = [[q.sortBy ?? 'idCancha', (q.sortDir ?? 'ASC').toUpperCase()]];

    const where: any = {};
    if (q.idClub) where.idClub = q.idClub;
    if (q.denominacion) where.denominacion = { [Op.like]: `%${q.denominacion}%` };
    if (typeof q.cubierta === 'boolean') where.cubierta = q.cubierta;

    const { rows, count } = await this.canchaModel.findAndCountAll({
      where,
      include: [Club],
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

  // METODOS TURNO

  async crearTurno(dto: CrearTurnoDto) {
    // validar club
    const club = await this.clubModel.findByPk(dto.idClub);
    if (!club) throw new NotFoundException('Club no encontrado');

    const creado = await this.turnoModel.create({
      idClub: dto.idClub,
      fecha: dto.fecha ?? null,
      diaSemana: dto.diaSemana ?? null,
      horaDesde: dto.horaDesde,
      horaHasta: dto.horaHasta,
    });

    return { mensaje: 'Turno creado correctamente', turno: creado };
  }

  async crearSlot(dto: CrearSlotDto) {
    const club = await this.clubModel.findByPk(dto.idClub);
    if (!club) throw new NotFoundException('Club no encontrado');

    const cancha = await this.canchaModel.findByPk(dto.idCancha);
    if (!cancha) throw new NotFoundException('Cancha no encontrada');

    if (cancha.idClub !== dto.idClub) {
      throw new BadRequestException('La cancha no pertenece al club indicado');
    }

    let turno: Turno | null = null;

    if (dto.idTurno) {
      turno = await this.turnoModel.findByPk(dto.idTurno);
      if (!turno) throw new NotFoundException('Turno no encontrado');
      if (turno.idClub !== dto.idClub) {
        throw new BadRequestException('El turno no pertenece al club indicado');
      }
    } else {
      if (!dto.horaDesde || !dto.horaHasta) {
        throw new BadRequestException('Debe indicar horaDesde y horaHasta para crear un turno nuevo');
      }

      turno = await this.turnoModel.create({
        idClub: dto.idClub,
        fecha: dto.fecha ?? null,
        diaSemana: dto.diaSemana ?? null,
        horaDesde: dto.horaDesde,
        horaHasta: dto.horaHasta,
      });
    }

    const canchaTurno = await this.canchaTurnoModel.create({
      idClub: dto.idClub,
      idCancha: dto.idCancha,
      idTurno: turno.idTurno,
      disponible: typeof dto.disponible === 'boolean' ? dto.disponible : true,
      precio: typeof dto.precio === 'number' ? dto.precio : 0,
    });

    const turnoConRelaciones = await this.turnoModel.findByPk(turno.idTurno, {
      include: [Club],
    });

    return {
      mensaje: 'Slot creado correctamente',
      turno: turnoConRelaciones,
      canchaTurno,
    };
  }

  async editarTurno(idTurno: number, dto: EditarTurnoDto) {
    const turno = await this.turnoModel.findByPk(idTurno);
    if (!turno) throw new NotFoundException('Turno no encontrado');

    const cambios: Partial<Turno> = {
      idClub: dto.idClub ?? turno.idClub,
      fecha: dto.fecha ?? turno.fecha,
      diaSemana: dto.diaSemana ?? turno.diaSemana,
      horaDesde: dto.horaDesde ?? turno.horaDesde,
      horaHasta: dto.horaHasta ?? turno.horaHasta,
    };

    await this.turnoModel.update(cambios, { where: { idTurno } });

    const actualizado = await this.turnoModel.findByPk(idTurno, { include: [Club] });
    return { mensaje: 'Turno actualizado correctamente', turno: actualizado };
  }

  async listarTurnos(q: ListarTurnosDto) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    const offset = (page - 1) * limit;
    const order: any[] = [[q.sortBy ?? 'idTurno', (q.sortDir ?? 'ASC').toUpperCase()]];

    const where: any = {};
    if (q.idClub) where.idClub = q.idClub;
    if (q.fecha) where.fecha = q.fecha;
    if (q.diaSemana !== undefined) where.diaSemana = q.diaSemana;
    if (q.horaDesde) where.horaDesde = q.horaDesde;
    if (q.horaHasta) where.horaHasta = q.horaHasta;

    const { rows, count } = await this.turnoModel.findAndCountAll({
      where,
      include: [Club],
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

  // METODOS CANCHA-TURNO

  async asignarTurnoCancha(dto: AsignarTurnoCanchaDto) {
    // validar existencia
    const cancha = await this.canchaModel.findByPk(dto.idCancha);
    if (!cancha) throw new NotFoundException('Cancha no encontrada');

    const turno = await this.turnoModel.findByPk(dto.idTurno);
    if (!turno) throw new NotFoundException('Turno no encontrado');

    // validar que turno y cancha pertenezcan al mismo club
    if (cancha.idClub !== turno.idClub) {
      throw new BadRequestException('La cancha y el turno deben pertenecer al mismo club');
    }

    // crear relación (UNIQUE idCancha+idTurno)
    const row = await this.canchaTurnoModel.create({
      idClub: cancha.idClub,
      idCancha: dto.idCancha,
      idTurno: dto.idTurno,
      disponible: dto.disponible ?? true,
      precio: dto.precio ?? 0,
    });

    return { mensaje: 'Turno asignado a cancha correctamente', canchaTurno: row };
    }

  async actualizarTurnoCancha(
    idCancha: number,
    idTurno: number,
    dto: ActualizarTurnoCanchaDto,
  ) {
    const rel = await this.canchaTurnoModel.findOne({ where: { idCancha, idTurno } });
    if (!rel) throw new NotFoundException('Relación Cancha-Turno no encontrada');

    const cambios: Partial<CanchaTurno> = {
      disponible: dto.disponible ?? rel.disponible,
      precio: typeof dto.precio === 'number' ? dto.precio : rel.precio,
    };

    await this.canchaTurnoModel.update(cambios, { where: { idCancha, idTurno } });

    const actualizado = await this.canchaTurnoModel.findOne({ where: { idCancha, idTurno } });
    return { mensaje: 'Relación Cancha-Turno actualizada', canchaTurno: actualizado };
  }

  async quitarTurnoCancha(dto: QuitarTurnoCanchaDto) {
    const affected = await this.canchaTurnoModel.destroy({
      where: { idCancha: dto.idCancha, idTurno: dto.idTurno },
    });
    if (affected === 0) throw new NotFoundException('Relación Cancha-Turno no encontrada');
    return { mensaje: 'Turno desasignado de cancha', idCancha: dto.idCancha, idTurno: dto.idTurno };
  }

  async listarTurnosCancha(q: ListarTurnosCanchasDto) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    const offset = (page - 1) * limit;
    const order: any[] = [[q.sortBy ?? 'idCanchaTurno', (q.sortDir ?? 'ASC').toUpperCase()]];

    const where: any = {};
    if (q.idClub) where.idClub = q.idClub;
    if (q.idCancha) where.idCancha = q.idCancha;
    if (q.idTurno) where.idTurno = q.idTurno;
    if (typeof q.disponible === 'boolean') where.disponible = q.disponible;
    if (q.precioMin !== undefined) where.precio = { ...(where.precio ?? {}), [Op.gte]: q.precioMin };
    if (q.precioMax !== undefined) where.precio = { ...(where.precio ?? {}), [Op.lte]: q.precioMax };

    const { rows, count } = await this.canchaTurnoModel.findAndCountAll({
      where,
      include: [Cancha, Turno, Club],
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

  // METODOS DATOS PAGO

  async crearDatosPago(dto: CrearDatosPagoDto) {
    const club = await this.clubModel.findByPk(dto.idClub);
    if (!club) throw new NotFoundException('Club no encontrado');

    const creado = await this.datosPagoModel.create({
      idClub: dto.idClub,
      metodoPago: dto.metodoPago,
      cbu: dto.cbu ?? null,
      cvu: dto.cvu ?? null,
      alias: dto.alias ?? null,
      dniCuitCuil: dto.dniCuitCuil ?? null,
      titular: dto.titular ?? null,
      banco: dto.banco ?? null,
      tipoCuenta: dto.tipoCuenta ?? null,
      numeroCuenta: dto.numeroCuenta ?? null,
      activo: typeof dto.activo === 'boolean' ? dto.activo : true,
    });

    return { mensaje: 'Datos de pago creados', datosPago: creado };
  }

  async actualizarDatosPago(idDatosPago: number, dto: ActualizarDatosPagoDto) {
    const row = await this.datosPagoModel.findByPk(idDatosPago);
    if (!row) throw new NotFoundException('Datos de pago no encontrados');

    const cambios: Partial<DatosPago> = {
      idClub: dto.idClub ?? row.idClub,
      metodoPago: dto.metodoPago ?? row.metodoPago,
      cbu: dto.cbu ?? row.cbu,
      cvu: dto.cvu ?? row.cvu,
      alias: dto.alias ?? row.alias,
      dniCuitCuil: dto.dniCuitCuil ?? row.dniCuitCuil,
      titular: dto.titular ?? row.titular,
      banco: dto.banco ?? row.banco,
      tipoCuenta: dto.tipoCuenta ?? row.tipoCuenta,
      numeroCuenta: dto.numeroCuenta ?? row.numeroCuenta,
      activo: typeof dto.activo === 'boolean' ? dto.activo : row.activo,
    };

    await this.datosPagoModel.update(cambios, { where: { idDatosPago } });

    const actualizado = await this.datosPagoModel.findByPk(idDatosPago, { include: [Club] });
    return { mensaje: 'Datos de pago actualizados', datosPago: actualizado };
  }

  async listarDatosPagos(q: ListarDatosPagosDto) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    const offset = (page - 1) * limit;
    const order: any[] = [[q.sortBy ?? 'idDatosPago', (q.sortDir ?? 'ASC').toUpperCase()]];

    const where: any = {};
    if (q.idClub) where.idClub = q.idClub;
    if (q.metodoPago) where.metodoPago = { [Op.like]: `%${q.metodoPago}%` };
    if (typeof q.activo === 'boolean') where.activo = q.activo;

    const { rows, count } = await this.datosPagoModel.findAndCountAll({
      where,
      include: [Club],
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
