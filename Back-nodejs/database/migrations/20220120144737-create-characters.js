'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('characters', {
    
    idCharacter:{
        type: Sequelize.INTEGER(6),
        primaryKey: true,
        autoIncrement:true,
    },

    name:{
         type: Sequelize.STRING(100),
         allowNull:false,
    },

    imageCharacter:{
         type: Sequelize.STRING(100),
         allowNull:false,
    },
    
    age:{
         type: Sequelize.INTEGER(3),
         allowNull:false,
    },

    weight:{
        type: Sequelize.INTEGER(3),
        allowNull:false,   
    },

    history:{
        type: Sequelize.STRING(200),
        allowNull:false,
    },

    idMovieAssoc:{
        type: Sequelize.INTEGER(6)
   }
  });
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('characters');
  }
};