'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UsuarioPosicion', {
      idUsuario: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'Usuario', key: 'idUsuario' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      idPosicion: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'Posicion', key: 'idPosicion' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT',
      },
    }, { engine: 'InnoDB' });

    //PK compuesta por los dos campos idUsuario y idPosicion para esta tabla
    await queryInterface.addConstraint('UsuarioPosicion', {
      fields: ['idUsuario', 'idPosicion'],
      type: 'primary key',
      name: 'pk_UsuarioPosicion',
    });
  },

  async down(queryInterface) { 
    await queryInterface.dropTable('UsuarioPosicion'); 
  }
};
