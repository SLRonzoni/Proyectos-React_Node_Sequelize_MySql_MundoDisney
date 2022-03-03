'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('charactermovies', {
        moviesId:{
            type: Sequelize.INTEGER(6),
            primaryKey: true,    
            references:{
              model:"Movies",
              key:"idMovie"
            },
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
          },
          charactersId:{
              type: Sequelize.INTEGER(6),
              primaryKey: true,
              references:{
                model:"Characters",
                key:"idCharacter"
              },
              onDelete:"CASCADE",
              onUpdate:"CASCADE"  
          }, 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('charactermovies');
  }
};
