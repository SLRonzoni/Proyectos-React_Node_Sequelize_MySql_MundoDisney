 const { Model, DataTypes} = require('sequelize');
 const sequelize = require('../database/db');

class Genders extends Model {}
  Genders.init({
    idGender:{
      type: DataTypes.INTEGER(6),
      primaryKey: true,
      autoIncrement:true,
    },
    
    name:{
          type: DataTypes.STRING(50),
          allowNull:false,
          validate:{
              notEmpty:{
                args:true,
                msg:"El nombre es obligatorio"
              },
              len:{
                args:[1,50],
                msg:"El nombre puede contener hasta 50 caracteres"
              },
              isAlpha:{
                args:true,
                msg:"El nombre solo puede ser alfabético"
              }
          }  
    },

    image:{
          type: DataTypes.STRING(50),
          allowNull:false,
          validate:{
            is :{
              args:/^[\w\S]{1,50}[A-ZÁÉÍÓÚÜÑÇA-ZÁÉÍÓÚÜÑÇa-záéíóúüñç'.,/\s]$/i,
              msg:"El nombre de la imagen no puede estar vacio y debe ser alfabetico"
              }
          },
    },
    
    moviesAssoc:{
          type: DataTypes.INTEGER(6)           
    },
  },
   {
   sequelize,
   modelName:"genders",
   timestamps:false
   });


   module.exports= Genders;

