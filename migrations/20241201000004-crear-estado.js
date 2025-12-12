'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Estado', {
      // Los valores por defecto seran 1=PENDIENTE, 2=HABILITADO, 3=BANEADO que se van a definir en un archivo semilla para esta tabla
      idEstado: { type: Sequelize.INTEGER, primaryKey: true },
      descripcion: { type: Sequelize.STRING(50), allowNull: false },
    }, { engine: 'InnoDB' });
  },
  
  async down(queryInterface) { 
    await queryInterface.dropTable('Estado'); 
  }
};
