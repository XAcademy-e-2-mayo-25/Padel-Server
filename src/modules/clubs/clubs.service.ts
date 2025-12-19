import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';

// Modelos
import { Club } from '../../database/models/club.model';
import { Cancha } from '../../database/models/cancha.model';
import { DatosPago } from '../../database/models/datosPago.model';
import { Usuario } from '../../database/models/usuario.model';
import { Estado } from '../../database/models/Estado.model';
import { ReservaTurno } from 'src/database/models/reservaTurno.model';

// DTOs
import {
  CrearClubDto,
  EditarClubDto,
  CrearCanchaDto,
  EditarCanchaDto,
  CrearDatosPagoDto,
  ActualizarDatosPagoDto,
  ListarCanchasDto,
  ListarClubsDto,
  ListarDatosPagosDto,
  CrearReservaTurnoDto,
  EditarReservaTurnoDto,
  ListarReservasTurnoDto,
  PagarReservaTurnoDto,
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
    @InjectModel(DatosPago) private readonly datosPagoModel: typeof DatosPago,
    @InjectModel(Usuario) private readonly usuarioModel: typeof Usuario,
    @InjectModel(Estado) private readonly estadoModel: typeof Estado,
    @InjectModel(ReservaTurno) private readonly reservaModel: typeof ReservaTurno,
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
    if (q.cuitCuil) where.cuitCuil = { [Op.like]: '%${q.cuitCuil}%' };
    if (q.provincia) where.provincia = { [Op.like]: '%${q.provincia}%' };
    if (q.localidad) where.localidad = { [Op.like]: '%${q.localidad}%' };
    if (q.idEstadoClub) where.idEstadoClub = q.idEstadoClub;
    if (q.idUsuario) where.idUsuario = q.idUsuario;

    // nombre busca en razonSocial OR nombreFantasia
    if (q.nombre) {
      where[Op.or] = [
        { razonSocial: { [Op.like]: '%${q.nombre}%' } },
        { nombreFantasia: { [Op.like]: '%${q.nombre}%' } },
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
      diasSemana: dto.diasSemana,
      horaDesde: dto.horaDesde,
      horaHasta: dto.horaHasta,
      rangoSlotMinutos: dto.rangoSlotMinutos,
      precio: dto.precio,
    });

    const withClub = await this.canchaModel.findByPk(nueva.idCancha, { include: [Club] });
    return { mensaje: 'Cancha creada correctamente', cancha: withClub };
  }

  async editarCancha(idCancha: number, dto: EditarCanchaDto) {
    const cancha = await this.canchaModel.findByPk(idCancha);
    if (!cancha) throw new NotFoundException('Cancha no encontrada');

    const cambios: Partial<Cancha> = {
      idClub: dto.idClub ?? cancha.idClub,
      denominacion: dto.denominacion ?? cancha.denominacion,
      cubierta: dto.cubierta ?? cancha.cubierta,
      observaciones: dto.observaciones ?? cancha.observaciones,
      diasSemana: dto.diasSemana ?? cancha.diasSemana,
      horaDesde: dto.horaDesde ?? cancha.horaDesde,
      horaHasta: dto.horaHasta ?? cancha.horaHasta,
      rangoSlotMinutos: dto.rangoSlotMinutos ?? cancha.rangoSlotMinutos,
      precio: dto.precio ?? cancha.precio,
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
    if (q.rangoSlotMinutos) where.rangoSlotMinutos = q.rangoSlotMinutos;
    if (q.precioMin || q.precioMax) {
      where.precio = {
        ...(q.precioMin ? { [Op.gte]: q.precioMin } : {}),
        ...(q.precioMax ? { [Op.lte]: q.precioMax } : {}),
      };
    }
    // filtro por día habilitado: (diasSemana & (1 << dia)) != 0
    if (typeof q.dia === 'number') {
      const mask = 1 << q.dia;
      where[Op.and] = [
        ...(where[Op.and] ?? []),
        Sequelize.where(
          Sequelize.literal('(diasSemana & ${mask})'),
          { [Op.ne]: 0 },
        ),
      ];
    }

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

  // METODOS RESERVA TURNO
  private async assertCanchaAbiertaYSlotsOk(cancha: Cancha, fechaISO: string, slotIndexDesde: number, slotCount: number) {
    if (slotIndexDesde < 0 || slotCount <= 0) {
      throw new BadRequestException('slotIndexDesde >= 0 y slotCount > 0 requeridos');
    }
    // día habilitado según bitmask
    const d = new Date(fechaISO);
    const dia = d.getUTCDay(); // 0..6
    const mask = 1 << dia;
    if ((cancha.diasSemana & mask) === 0) {
      throw new BadRequestException('La cancha no abre ese día');
    }
    //la consistencia de horarios la resuelve el front generando slots válidos.
  }

  private async haySolapamiento(
    idCancha: number,
    fecha: string,
    desde: number,
    hastaExcl: number,
    excluirId?: number,
  ) {
    const where: any = {
      idCancha,
      fecha,
      [Op.and]: [
        { slotIndexDesde: { [Op.lt]: hastaExcl } },
        Sequelize.where(
          Sequelize.literal('(slotIndexDesde + slotCount)'),
          { [Op.gt]: desde },
        ),
      ],
    };
    if (excluirId) where.idReservaTurno = { [Op.ne]: excluirId };
    const existente = await this.reservaModel.findOne({ where });
    return !!existente;
  }

  async crearReserva(dto: CrearReservaTurnoDto) {
    const cancha = await this.canchaModel.findByPk(dto.idCancha);
    if (!cancha) throw new NotFoundException('Cancha no encontrada');

    const jugador = await this.usuarioModel.findByPk(dto.idJugador);
    if (!jugador) throw new NotFoundException('Jugador no encontrado');

    await this.assertCanchaAbiertaYSlotsOk(cancha, dto.fecha, dto.slotIndexDesde, dto.slotCount);

    const from = dto.slotIndexDesde;
    const toExcl = dto.slotIndexDesde + dto.slotCount;

    const solapa = await this.haySolapamiento(cancha.idCancha, dto.fecha, from, toExcl);
    if (solapa) throw new BadRequestException('El rango de slots ya está reservado');

    const precioAplicado = cancha.precio * dto.slotCount;

    const creada = await this.reservaModel.create({
      idCancha: cancha.idCancha,
      idJugador: dto.idJugador,
      fecha: dto.fecha,
      slotIndexDesde: dto.slotIndexDesde,
      slotCount: dto.slotCount,
      precioAplicado,
      pagado: false,
    });

    return { mensaje: 'Reserva creada', reserva: creada };
  }

  async editarReserva(idReserva: number, dto: EditarReservaTurnoDto) {
    const res = await this.reservaModel.findByPk(idReserva);
    if (!res) throw new NotFoundException('Reserva no encontrada');

    const cancha = await this.canchaModel.findByPk(dto.idCancha ?? res.idCancha);
    if (!cancha) throw new NotFoundException('Cancha no encontrada');

    const fecha = dto.fecha ?? res.fecha;
    const slotIndexDesde = typeof dto.slotIndexDesde === 'number' ? dto.slotIndexDesde : res.slotIndexDesde;
    const slotCount = typeof dto.slotCount === 'number' ? dto.slotCount : res.slotCount;

    await this.assertCanchaAbiertaYSlotsOk(cancha, fecha, slotIndexDesde, slotCount);

    const from = slotIndexDesde;
    const toExcl = slotIndexDesde + slotCount;

    const solapa = await this.haySolapamiento(cancha.idCancha, fecha, from, toExcl, res.idReservaTurno);
    if (solapa) throw new BadRequestException('El rango de slots ya está reservado');

    const cambios: Partial<ReservaTurno> = {
      idCancha: dto.idCancha ?? res.idCancha,
      idJugador: dto.idJugador ?? res.idJugador,
      fecha,
      slotIndexDesde,
      slotCount,
      precioAplicado:
        typeof dto.precioAplicado === 'number'
          ? dto.precioAplicado
          : res.precioAplicado,
      pagado: typeof dto.pagado === 'boolean' ? dto.pagado : res.pagado,
    };

    await this.reservaModel.update(cambios, { where: { idReservaTurno: idReserva } });

    const actualizado = await this.reservaModel.findByPk(idReserva);
    return { mensaje: 'Reserva actualizada', reserva: actualizado };
  }

  async listarReservas(q: ListarReservasTurnoDto) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    const offset = (page - 1) * limit;
    const order: any[] = [[q.sortBy ?? 'idReservaTurno', (q.sortDir ?? 'ASC').toUpperCase()]];

    const where: any = {};
    if (q.idCancha) where.idCancha = q.idCancha;
    if (q.idJugador) where.idJugador = q.idJugador;
    if (typeof q.pagado === 'boolean') where.pagado = q.pagado;
    if (q.fechaDesde || q.fechaHasta) {
      where.fecha = {
        ...(q.fechaDesde ? { [Op.gte]: q.fechaDesde } : {}),
        ...(q.fechaHasta ? { [Op.lte]: q.fechaHasta } : {}),
      };
    }
    if (typeof q.slotIndexDesde === 'number') {
      where.slotIndexDesde = q.slotIndexDesde;
    }
    if (q.slotCountMin || q.slotCountMax) {
      where.slotCount = {
        ...(q.slotCountMin ? { [Op.gte]: q.slotCountMin } : {}),
        ...(q.slotCountMax ? { [Op.lte]: q.slotCountMax } : {}),
      };
    }

    const { rows, count } = await this.reservaModel.findAndCountAll({
      where,
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

  async pagarReserva(idReserva: number, dto: PagarReservaTurnoDto) {
    const res = await this.reservaModel.findByPk(idReserva);
    if (!res) throw new NotFoundException('Reserva no encontrada');

    const cambios: Partial<ReservaTurno> = {
      pagado: typeof dto.pagado === 'boolean' ? dto.pagado : true,
    };

    await this.reservaModel.update(cambios, { where: { idReservaTurno: idReserva } });
    const actualizado = await this.reservaModel.findByPk(idReserva);

    return { mensaje: 'Reserva marcada como pagada', reserva: actualizado };
  }
}
