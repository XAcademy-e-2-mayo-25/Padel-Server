'use strict';

module.exports = {
  async up(queryInterface) {
    // 1=PENDIENTE, 2=HABILITADO, 3=BANEADO
    await queryInterface.bulkInsert('Estado', [
      { idEstado: 1, descripcion: 'PENDIENTE' },
      { idEstado: 2, descripcion: 'HABILITADO' },
      { idEstado: 3, descripcion: 'BANEADO' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Estado', null, {});
  },
};
