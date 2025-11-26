//Modo estricto de js
'use strict'; 

//Objeto con las funciones up y down para sequelize, up para aplicar cambios a la bd y down para revertirlos.
module.exports = {
  //up recibe como parametro el adaptador para interactuar con la bd y el paquete sequelize con todos los tipos de datos.
  async up(queryInterface, Sequelize) {
    //con el adaptador creamos la tabla con la funcion createTable y como parametro el nombre de la tabla, dentro de esta funcion definimos todos los campos, tipo de dato y restricciones
    await queryInterface.createTable( 'Categoria', {
        //campo idCategoria de tipo int y lo señamos como PK
        idCategoria: { 
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        //campo nombre de tipo string con limite para 50 caracteres, no acepta nulos
        nombre: { 
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },

      {
        //Con engine InnoDB indicamos que la tabla soporta FK
        engine: 'InnoDB',
      }
    );
  },
  //funcion down para revertir el createTable
  async down(queryInterface) {
    await queryInterface.dropTable('Categoria');
  },
};
