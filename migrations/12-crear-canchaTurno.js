'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CanchaTurno', {
      idCanchaTurno: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      disponible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
    });

    // UNIQUE para evitar duplicados del mismo turno en la misma cancha
    await queryInterface.addConstraint('CanchaTurno', {
      fields: ['idCancha', 'idTurno'],
      type: 'unique',
      name: 'uq_cancha_turno',
    });

    await queryInterface.addIndex('CanchaTurno', ['idClub', 'idCancha'], {
      name: 'idx_canchaTurno_club_cancha',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('CanchaTurno');
  },
};
