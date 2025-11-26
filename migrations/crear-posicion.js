'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posicion', {
      //Los valores por defecto seran 1=DRIVE, 2=REVES que se van a definir en un archivo semilla para esta tabla
      idPosicion: { type: Sequelize.INTEGER, primaryKey: true },
      nombre: { type: Sequelize.STRING(50), allowNull: false },
    }, { engine: 'InnoDB' });
  },
  
  async down(queryInterface) { 
    await queryInterface.dropTable('Posicion'); 
  }
};
