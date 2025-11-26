'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rol', {
      //Los valores por defecto seran 1=ADMINISTRADOR, 2=JUGADOR, 3=CLUB que tambien se van a definir en un archivo semilla para esta tabla
      idRol: { type: Sequelize.INTEGER, primaryKey: true },
      nombre: { type: Sequelize.STRING(50), allowNull: false },
    }, { engine: 'InnoDB' });
  },
  
  async down(queryInterface) { 
    await queryInterface.dropTable('Rol'); 
  }
};
