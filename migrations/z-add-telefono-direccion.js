'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('Usuario');

    if (!table.telefono) {
      await queryInterface.addColumn('Usuario', 'telefono', {
        type: Sequelize.STRING(20),
        allowNull: true,
      });
    }

    if (!table.direccion) {
      await queryInterface.addColumn('Usuario', 'direccion', {
        type: Sequelize.STRING(255),
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('Usuario');

    if (table.telefono) {
      await queryInterface.removeColumn('Usuario', 'telefono');
    }

    if (table.direccion) {
      await queryInterface.removeColumn('Usuario', 'direccion');
    }
  }
};
