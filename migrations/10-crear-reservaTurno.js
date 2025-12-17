'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReservaTurno', {
      idReservaTurno: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      // FK a cancha
      idCancha: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Cancha', key: 'idCancha' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      // FK a usuario (jugador)
      idJugador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Usuario', key: 'idUsuario' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      // día de la reserva
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      // slots (derivados de horaDesde/horaHasta y rangoSlotMinutos de Cancha)
      // se toma el indice del slot inicial y el cierre del ultimo
      slotIndexDesde: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      slotCount: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },

      // pago y precio aplicado (precio por cantidad de slot)
      pagado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      precioAplicado: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    });

    // Índices útiles
    await queryInterface.addIndex('ReservaTurno', ['idCancha', 'fecha'], {
      name: 'idx_reservaTurno_cancha_fecha',
    });

    await queryInterface.addIndex('ReservaTurno', ['idJugador', 'fecha'], {
      name: 'idx_reservaTurno_jugador_fecha',
    });

    // Evita reservas duplicadas que comiencen en el mismo slot (el solapamiento se valida en servicio)
    await queryInterface.addConstraint('ReservaTurno', {
      fields: ['idCancha', 'fecha', 'slotIndexDesde'],
      type: 'unique',
      name: 'uq_reservaTurno_cancha_fecha_slotInicio',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ReservaTurno');
  },
};
