import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ClubsService } from './clubs.service';

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
  AprobarClubDto,
} from './dto';

//Todos los endpoint de este controller carecen de guards/roles, falta configurarlos
//y luego agregarlos a los endpoint (UseGuard y Roles), ya que todos estos pueden ser accedidos desde rol ADMIN/CLUB

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  // Endpoints CLUB

  // Crear club
  @Post()
  @HttpCode(HttpStatus.CREATED)
  crearClub(@Body() dto: CrearClubDto) {
    return this.clubsService.crearClub(dto);
  }

  // Listar clubs con filtros y paginacion
  @Get()
  @HttpCode(HttpStatus.OK)
  listarClubs(@Query() query: ListarClubsDto) {
    return this.clubsService.listarClubs(query);
  }

  // Obtener club por id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  obtenerClub(@Param('id', ParseIntPipe) id: number) {
    return this.clubsService.obtenerClub(id);
  }

  // Editar club
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  editarClub(@Param('id', ParseIntPipe) id: number, @Body() dto: EditarClubDto) {
    return this.clubsService.editarClub(id, dto);
  }

  // Aprobar club (pasa a estado HABILITADO y habilita rol CLUB del usuario)
  @Patch(':id/aprobar')
  @HttpCode(HttpStatus.OK)
  aprobarClub(@Param('id', ParseIntPipe) id: number, @Body() dto: AprobarClubDto) {
    return this.clubsService.aprobarClub(id, dto);
  }

  // Endpoints CANCHA (por club)

  // Crear cancha
  @Post(':idClub/canchas')
  @HttpCode(HttpStatus.CREATED)
  crearCancha(@Param('idClub', ParseIntPipe) idClub: number, @Body() dto: CrearCanchaDto) {
    return this.clubsService.crearCancha({ ...dto, idClub });
  }

  // Listar canchas
  @Get(':idClub/canchas')
  @HttpCode(HttpStatus.OK)
  listarCanchas(@Param('idClub', ParseIntPipe) idClub: number, @Query() query: ListarCanchasDto) {
    return this.clubsService.listarCanchas({ ...query, idClub });
  }

  // Editar cancha
  @Patch(':idClub/canchas/:id')
  @HttpCode(HttpStatus.OK)
  editarCancha(
    @Param('idClub', ParseIntPipe) idClub: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditarCanchaDto,
  ) {
    return this.clubsService.editarCancha(id, { ...dto, idClub });
  }

  // Endpoints DATOS DE PAGO (por club)

  // Crear método de pago
  @Post(':idClub/datos-pago')
  @HttpCode(HttpStatus.CREATED)
  crearDatosPago(@Param('idClub', ParseIntPipe) idClub: number, @Body() dto: CrearDatosPagoDto) {
    return this.clubsService.crearDatosPago({ ...dto, idClub });
  }

  // Listar métodos de pago
  @Get(':idClub/datos-pago')
  @HttpCode(HttpStatus.OK)
  listarDatosPagos(@Param('idClub', ParseIntPipe) idClub: number, @Query() query: ListarDatosPagosDto) {
    return this.clubsService.listarDatosPagos({ ...query, idClub });
  }

  // Actualizar método de pago
  @Patch(':idClub/datos-pago/:id')
  @HttpCode(HttpStatus.OK)
  actualizarDatosPago(
    @Param('idClub', ParseIntPipe) idClub: number,
    @Param('id', ParseIntPipe) idDatosPago: number,
    @Body() dto: ActualizarDatosPagoDto,
  ) {
    return this.clubsService.actualizarDatosPago(idDatosPago, { ...dto, idClub });
  }

  // Endpoints RESERVA TURNO (por club)

  // Crear reserva
  @Post(':idClub/reservas')
  @HttpCode(HttpStatus.CREATED)
  crearReserva(@Param('idClub', ParseIntPipe) idClub: number, @Body() dto: CrearReservaTurnoDto) {
    return this.clubsService.crearReserva({ ...dto, idClub } as any);
  }

  // Listar reservas
  @Get(':idClub/reservas')
  @HttpCode(HttpStatus.OK)
  listarReservas(@Param('idClub', ParseIntPipe) idClub: number, @Query() query: ListarReservasTurnoDto) {
    return this.clubsService.listarReservas({ ...query, idClub } as any);
  }

  // Editar reserva
  @Patch(':idClub/reservas/:id')
  @HttpCode(HttpStatus.OK)
  editarReserva(
    @Param('idClub', ParseIntPipe) idClub: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditarReservaTurnoDto,
  ) {
    return this.clubsService.editarReserva(id, { ...dto, idClub } as any);
  }

  // Pagar reserva
  @Patch(':idClub/reservas/:id/pagar')
  @HttpCode(HttpStatus.OK)
  pagarReserva(
    @Param('idClub', ParseIntPipe) idClub: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PagarReservaTurnoDto,
  ) {
    return this.clubsService.pagarReserva(id, { ...dto, idClub } as any);
  }
}
