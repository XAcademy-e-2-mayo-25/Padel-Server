'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuario', {
      idUsuario:   { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nombres:     { type: Sequelize.STRING(100), allowNull: false },
      apellidos:   { type: Sequelize.STRING(100), allowNull: false },
      dni:         { type: Sequelize.STRING(20),  allowNull: true  },
      email:       { type: Sequelize.STRING(160), allowNull: false, unique: true },
      fotoPerfil:  { type: Sequelize.STRING(255), allowNull: true  },
      provincia:   { type: Sequelize.STRING(80),  allowNull: true  },
      localidad:   { type: Sequelize.STRING(120), allowNull: true  },

      //campo idCategoria con relacion de FK con el campo idCategoria de la tabla Categoria
      //Se activa actualizacion en cascada para este campo por si cambia el idCategoria en la tabla Categoria, que se replique el cambio a los usuarios
      //onDelete en set null por si se elimina el idCategoria relacionado a un usuario, que el campo se ponga en null.
      idCategoria: {
        type: Sequelize.INTEGER, allowNull: true,
        references: { model: 'Categoria', key: 'idCategoria' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL',
      },
    }, { engine: 'InnoDB' });
  },
  
  async down(queryInterface) { 
    await queryInterface.dropTable('Usuario'); 
  }
};
