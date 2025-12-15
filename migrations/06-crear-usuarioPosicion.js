'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UsuarioPosicion', {
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Usuario', key: 'idUsuario' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idPosicion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Posicion', key: 'idPosicion' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
    }, { engine: 'InnoDB' });
  },

  async down(queryInterface) { 
    await queryInterface.dropTable('UsuarioPosicion'); 
  }
};
