'use strict';

module.exports = {
  async up(queryInterface) {
    //Categorias de padel segun lo que investigamos
    // ignoreDuplicates hace que el seeder sea idempotente (puede ejecutarse múltiples veces)
    await queryInterface.bulkInsert('Categoria', [
      { idCategoria: 1, nombre: 'PRIMERA' },
      { idCategoria: 2, nombre: 'SEGUNDA' },
      { idCategoria: 3, nombre: 'TERCERA' },
      { idCategoria: 4, nombre: 'CUARTA' },
      { idCategoria: 5, nombre: 'QUINTA' },
      { idCategoria: 6, nombre: 'SEXTA' },
      { idCategoria: 7, nombre: 'SEPTIMA' },
      { idCategoria: 8, nombre: 'OCTAVA' },
    ], { ignoreDuplicates: true });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categoria', null, {});
  },
};
