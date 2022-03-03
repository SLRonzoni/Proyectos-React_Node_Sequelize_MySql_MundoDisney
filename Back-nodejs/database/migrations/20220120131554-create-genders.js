'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('genders', {
      idGender: {
        type: Sequelize.INTEGER(6),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true        
      },
      
      name: {
        type: Sequelize.STRING(50),
        allowNull:false,
      },
      image: {
        type: Sequelize.STRING(50),
        allowNull:false,
      },
      moviesAssoc: {
        type: Sequelize.INTEGER(6)
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('genders');
  }
};