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

// Endpoints CANCHA

  // Crear cancha
  @Post('canchas')
  @HttpCode(HttpStatus.CREATED)
  crearCancha(@Body() dto: CrearCanchaDto) {
    return this.clubsService.crearCancha(dto);
  }

  // Listar canchas
  @Get('canchas')
  @HttpCode(HttpStatus.OK)
  listarCanchas(@Query() query: ListarCanchasDto) {
    return this.clubsService.listarCanchas(query);
  }

  // Editar cancha
  @Patch('canchas/:id')
  @HttpCode(HttpStatus.OK)
  editarCancha(@Param('id', ParseIntPipe) id: number, @Body() dto: EditarCanchaDto) {
    return this.clubsService.editarCancha(id, dto);
  }


  // Endpoints DATOS DE PAGO

  // Crear método de pago
  @Post('datos-pago')
  @HttpCode(HttpStatus.CREATED)
  crearDatosPago(@Body() dto: CrearDatosPagoDto) {
    return this.clubsService.crearDatosPago(dto);
  }

  // Listar métodos de pago
  @Get('datos-pago')
  @HttpCode(HttpStatus.OK)
  listarDatosPagos(@Query() query: ListarDatosPagosDto) {
    return this.clubsService.listarDatosPagos(query);
  }

  // Actualizar método de pago
  @Patch('datos-pago/:id')
  @HttpCode(HttpStatus.OK)
  actualizarDatosPago(
    @Param('id', ParseIntPipe) idDatosPago: number,
    @Body() dto: ActualizarDatosPagoDto,
  ) {
    return this.clubsService.actualizarDatosPago(idDatosPago, dto);
  }

  // Endpoints RESERVA TURNO

  // Crear reserva
  @Post('reservas')
  @HttpCode(HttpStatus.CREATED)
  crearReserva(@Body() dto: CrearReservaTurnoDto) {
    return this.clubsService.crearReserva(dto);
  }

  // Listar reservas
  @Get('reservas')
  @HttpCode(HttpStatus.OK)
  listarReservas(@Query() query: ListarReservasTurnoDto) {
    return this.clubsService.listarReservas(query);
  }

  // Editar reserva
  @Patch('reservas/:id')
  @HttpCode(HttpStatus.OK)
  editarReserva(@Param('id', ParseIntPipe) id: number, @Body() dto: EditarReservaTurnoDto) {
    return this.clubsService.editarReserva(id, dto);
  }

  // Pagar reserva
  @Patch('reservas/:id/pagar')
  @HttpCode(HttpStatus.OK)
  pagarReserva(@Param('id', ParseIntPipe) id: number, @Body() dto: PagarReservaTurnoDto) {
    return this.clubsService.pagarReserva(id, dto);
  }
}
