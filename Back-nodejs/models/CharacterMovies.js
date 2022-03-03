const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database/db');
    
class CharacterMovies extends Model {}
    CharacterMovies.init({
    moviesId:{
      type: DataTypes.INTEGER(6),
      primaryKey: true,    
      references:{
        model:"Movies",
        key:"idMovie"
      },
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
    },
    charactersId:{
        type: DataTypes.INTEGER(6),
        primaryKey: true,
        references:{
          model:"Characters",
          key:"idCharacter"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"  
    }, 
    createdAt:{
      type: DataTypes.DATE,
      
   },

   updatedAt:{
      type: DataTypes.DATE,
     
  },  }, 
  {
  sequelize,
  modelName:"characterMovies",
  
  });


  module.exports= CharacterMovies;