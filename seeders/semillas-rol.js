//Modo estricto en todos los archivos
'use strict'; 

//Objeto con funciones up y down para que corran con docker compose up y docker compose down para levantar o bajar los registros semillas
module.exports = {
  //con la funcion up se insertan registros iniciales en este caso en la tabla Rol
  async up(queryInterface) {
    //Con el adaptador queryinterface y la funcion bulkInsert
    await queryInterface.bulkInsert('Rol', [
      // Cada objeto del array es una fila a insertar.
      { idRol: 1, nombre: 'ADMINISTRADOR' }, // idRol=1 -> ADMINISTRADOR
      { idRol: 2, nombre: 'JUGADOR' },       // idRol=2 -> JUGADOR
      { idRol: 3, nombre: 'CLUB' },          // idRol=3 -> CLUB
    ]);
  },

  //con down deshacemos los registros semillas que hicimos con el up con el metodo bulkDelete
  async down(queryInterface) {
    await queryInterface.bulkDelete('Rol', { idRol: [1, 2, 3] });
  },
};
