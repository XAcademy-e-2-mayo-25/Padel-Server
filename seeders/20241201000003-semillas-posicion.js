'use strict';

module.exports = {
  async up(queryInterface) {
    // 1=NO DEFINIDO, 2=DRIVE, 3=REVES
    // ignoreDuplicates hace que el seeder sea idempotente (puede ejecutarse múltiples veces)
    await queryInterface.bulkInsert('Posicion', [
      { idPosicion: 1, nombre: 'NO DEFINIDO' },
      { idPosicion: 2, nombre: 'DRIVE' },
      { idPosicion: 3, nombre: 'REVES' },
    ], { ignoreDuplicates: true });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Posicion', null, {});
  },
};
