'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Club', {
      idClub: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'idUsuario',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      razonSocial: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      nombreFantasia: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      cuitCuil: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      provincia: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      localidad: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      direccion: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      idEstadoClub: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Estado',
          key: 'idEstado',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
    });

    // Índices adicionales
    await queryInterface.addIndex('Club', ['idUsuario'], {
      name: 'idx_Club_idUsuario',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Club');
  },
};
