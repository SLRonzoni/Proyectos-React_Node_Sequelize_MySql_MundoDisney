const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database/db');
    
class Characters extends Model {}
Characters.init({
    idCharacter:{
      type: DataTypes.INTEGER(6),
      primaryKey: true,
      autoIncrement:true,
  },

  name:{
       type: DataTypes.STRING(100),
       allowNull:false,
       validate:{
          notEmpty:{
             args:true,
             msg:"El nombre es obligatorio"
          },
          is :{
             args:/^[\w\S]{2,50}[A-ZÁÉÍÓÚÜÑÇA-ZÁÉÍÓÚÜÑÇa-záéíóúüñç'.,/\s]{1,50}$/i,
             msg:"El nombre debe ser alfabetico"
          }
          ,
          len:{ 
             args:[1,100],
             msg:"El nombre debe tener entre 3 y 100 caracteres"
          }
       }
  },

  imageCharacter:{
       type: DataTypes.STRING(100),
       validate:{
          notEmpty:{
            args:true,
            msg:"El nombre del archivo de imagen es obligatorio"
          },
          is :/^[\w\S]{1,50}[A-ZÁÉÍÓÚÜÑÇA-ZÁÉÍÓÚÜÑÇa-záéíóúüñç'.,/\s]$/i
          },
          len:{ 
             args:[1,100],
             msg:"El nombre del archivo de imagen debe tener hasta 100 caracteres"
          }
   },
  
  age:{
       type: DataTypes.INTEGER(3),
       validate:{
             len:{ 
               args:[1,3],
               msg:"La edad debe tener hasta 3 caracteres"
             },
             isNumeric:{
               args:true,
               msg:"La edad debe ser numerica"
             },
             min:{
                args:5,
                msg:"La edad debe ser mayor a 5 años"
             },
             max:{
               args:100,
               msg:"La edad debe ser hasta los 100 años"
            },
           },
  },

  weight:{
      type: DataTypes.INTEGER(3),
      validate:{
            len:{ 
              args:[1,3],
              msg:"El peso debe tener hasta 3 caracteres numericos"
            },
            isNumeric:{
               args:true,
               msg:"El peso debe ser numerico"
            },
            min:{
               args:40,
               msg:"El peso debe ser mayor a 30 Kgs"
            },
            max:{
              args:200,
              msg:"El peso debe ser menor a 200 Kgs"
           },
          },
 },

 history:{
      type: DataTypes.STRING(200),
      validate:{
      
      len:{
          args:[1,200],
          msg:"La historia debe tener entre 0 y 200 caracteres"
      }
      }
  },

  idMovieAssoc:{
      type: DataTypes.INTEGER(6)
   }
  },
  {
  sequelize,
  modelName:'characters',
  timestamps:false
  });
 
module.exports=Characters;