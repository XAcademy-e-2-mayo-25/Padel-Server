'use strict';

module.exports = {
  async up(queryInterface) {
    // 1=NO DEFINIDO, 2=DRIVE, 3=REVES
    await queryInterface.bulkInsert('Posicion', [
      { idPosicion: 1, nombre: 'NO DEFINIDO' },
      { idPosicion: 2, nombre: 'DRIVE' },
      { idPosicion: 3, nombre: 'REVES' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Posicion', null, {});
  },
};
