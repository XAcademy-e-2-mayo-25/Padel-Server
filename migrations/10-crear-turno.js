'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Turno', {
      idTurno: {
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
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      diaSemana: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
      horaDesde: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      horaHasta: {
        type: Sequelize.TIME,
        allowNull: false,
      },
    });

    // UNIQUE constraint para evitar duplicados exactos
    await queryInterface.addConstraint('Turno', {
      fields: ['idClub', 'fecha', 'diaSemana', 'horaDesde', 'horaHasta'],
      type: 'unique',
      name: 'uq_turno_slot_por_club',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Turno');
  },
};
