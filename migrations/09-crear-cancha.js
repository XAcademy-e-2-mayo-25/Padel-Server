'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cancha', {
      idCancha: {
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

      // Datos básicos
      denominacion: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      cubierta: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      observaciones: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },

      // NUEVOS CAMPOS DE CALENDARIO/REGLAS
      // para diasSemana se usa numero de 7 bits donde cada bit representa un dia
      diasSemana: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
      },
      horaDesde: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      horaHasta: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      // duracion del slot, se van a configurar dos opciones 30 - 60
      rangoSlotMinutos: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
      },
      // Precio entero > 0
      precio: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    });

    // Índices útiles
    await queryInterface.addIndex('Cancha', ['idClub'], {
      name: 'idx_Cancha_idClub',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Cancha');
  },
};
