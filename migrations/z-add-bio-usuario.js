'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('Usuario');

    if (!table.bio) {
      await queryInterface.addColumn('Usuario', 'bio', {
        type: Sequelize.STRING(500),
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('Usuario');

    if (table.bio) {
      await queryInterface.removeColumn('Usuario', 'bio');
    }
  },
};
