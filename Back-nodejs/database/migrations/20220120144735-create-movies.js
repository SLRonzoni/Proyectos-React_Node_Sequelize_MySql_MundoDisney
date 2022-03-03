'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
      idMovie:{
        type: Sequelize.INTEGER(6),
        primaryKey: true,
        autoIncrement:true,
        validate:{
           isNumeric:true,
           len:[1,6]
        },
    },
  
    title:{
         type: Sequelize.STRING(100),
         allowNull:false,
    },
  
    image:{
         type: Sequelize.STRING(100),
         allowNull:false,
    },
    
    created:{
         type: Sequelize.DATEONLY,
         allowNull:false,
    },
  
    charactersAssoc:{
        type: Sequelize.INTEGER(1),
    },
 
    qualification:{
        type: Sequelize.INTEGER(1),
        allowNull:false,
    },
        
   });
     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movies');
  }
};