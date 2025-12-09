'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DatosPago', {
      idDatosPago: {
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
      metodoPago: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      cbu: {
        type: Sequelize.STRING(22),
        allowNull: true,
      },
      cvu: {
        type: Sequelize.STRING(22),
        allowNull: true,
      },
      alias: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      dniCuitCuil: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      titular: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      banco: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      tipoCuenta: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      numeroCuenta: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });

    await queryInterface.addIndex('DatosPago', ['idClub', 'activo'], {
      name: 'idx_DatosPago_club_activo',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('DatosPago');
  },
};
