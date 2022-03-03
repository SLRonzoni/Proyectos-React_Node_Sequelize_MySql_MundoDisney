'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      name:{
        type: Sequelize.STRING(50),
        allowNull:false
      },

      lastname:{
         type: Sequelize.STRING(50),
         allowNull:false,
      },
      
      email:{
         type: Sequelize.STRING(50),
         primaryKey: true,
         allowNull:false,
      },

      clave:{
         type: Sequelize.STRING,
         allowNull:false,
      },

      createdAt:{
         type: Sequelize.DATE,
         allowNull:false,
      },

      updatedAt:{
         type: Sequelize.DATE,
         allowNull:false
      },

      role:{
         type:Sequelize.ENUM({
         values:['USER','ADMIN']
         }),
         defaultValue:'USER',
         allowNull:false
 }         
   
  });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
