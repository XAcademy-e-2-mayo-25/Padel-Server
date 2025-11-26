'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuario', 'telefono', {
      type: Sequelize.STRING(20),
      allowNull: true,
    });
    await queryInterface.addColumn('Usuario', 'direccion', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Usuario', 'telefono');
    await queryInterface.removeColumn('Usuario', 'direccion');
  }
};
