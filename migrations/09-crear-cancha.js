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
    });

    await queryInterface.addIndex('Cancha', ['idClub'], {
      name: 'idx_Cancha_idClub',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Cancha');
  },
};
