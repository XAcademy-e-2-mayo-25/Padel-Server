'use strict';

module.exports = {
  async up(queryInterface) {
    // 1=PENDIENTE, 2=HABILITADO, 3=BANEADO
    // ignoreDuplicates hace que el seeder sea idempotente (puede ejecutarse múltiples veces)
    await queryInterface.bulkInsert('Estado', [
      { idEstado: 1, descripcion: 'PENDIENTE' },
      { idEstado: 2, descripcion: 'HABILITADO' },
      { idEstado: 3, descripcion: 'BANEADO' },
    ], { ignoreDuplicates: true });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Estado', null, {});
  },
};
