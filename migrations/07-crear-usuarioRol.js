'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UsuarioRol', {
      idUsuario: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'Usuario', key: 'idUsuario' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE', //onDelete en cascada por si se elimina el usuario de la bd que se eliminen las filas que lo relacionan en UsuarioRol
      },
      idRol: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'Rol', key: 'idRol' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT',//onDelete en restrict para que no debe borrar un rol si existen usuarios que lo referencian
      },
      idEstado: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'Estado', key: 'idEstado' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT',
      },
      descripcion: {
      type: Sequelize.STRING(300),
      allowNull: true,
      },
    }, { engine: 'InnoDB' });

    //PK compuesta para esta tabla por idUsuario y idRol, ya que un mismo usuario puede tener distintos roles con distintos estados
    await queryInterface.addConstraint('UsuarioRol', {
      fields: ['idUsuario', 'idRol'],
      type: 'primary key',
      name: 'pk_UsuarioRol',
    });

    //Indices para hacer consultas por Roles y Estados, despues vemos si las usamos
    await queryInterface.addIndex('UsuarioRol', ['idRol'],    { name: 'idx_UsuarioRol_idRol' });
    await queryInterface.addIndex('UsuarioRol', ['idEstado'], { name: 'idx_UsuarioRol_idEstado' });
  },

  async down(queryInterface) { 
    await queryInterface.dropTable('UsuarioRol'); 
  }
};
