'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reserva', {
      idReserva: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'idUsuario',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idClub: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Club',
          key: 'idClub',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idCancha: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cancha',
          key: 'idCancha',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idTurno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Turno',
          key: 'idTurno',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idCanchaTurno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CanchaTurno',
          key: 'idCanchaTurno',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      fechaReserva: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      estado: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'pendiente',
      },
      pagada: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      metodoPago: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      observaciones: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
    });

    await queryInterface.addIndex('Reserva', ['idUsuario'], {
      name: 'idx_reserva_usuario',
    });
    await queryInterface.addIndex('Reserva', ['idClub'], {
      name: 'idx_reserva_club',
    });
    await queryInterface.addIndex('Reserva', ['idCancha'], {
      name: 'idx_reserva_cancha',
    });
    await queryInterface.addIndex('Reserva', ['idTurno'], {
      name: 'idx_reserva_turno',
    });
    await queryInterface.addIndex('Reserva', ['idCanchaTurno', 'fechaReserva'], {
      name: 'idx_reserva_canchaTurno_fecha',
    });
    await queryInterface.addIndex('Reserva', ['estado'], {
      name: 'idx_reserva_estado',
    });
    await queryInterface.addIndex('Reserva', ['fechaReserva'], {
      name: 'idx_reserva_fecha',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Reserva');
  },
};
