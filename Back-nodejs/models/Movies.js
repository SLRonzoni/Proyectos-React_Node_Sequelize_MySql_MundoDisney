const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database/db');
    
class Movies extends Model {}
    Movies.init({
    idMovie:{
      type: DataTypes.INTEGER(6),
      primaryKey: true,
      autoIncrement:true,
      validate:{
         isNumeric:true,
         len:[1,6],
      }
  },

  title:{
       type: DataTypes.STRING(100),
       allowNull:false,
       validate:{
          notEmpty:{
             args:true,
             msg:"El titulo es obligatorio"
          },
          is :{  
          args:/^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/i,
          msg:"El titulo no puede contener caracteres especiales, solo números y letras"
          },
          len:{
             args:[2,100],
             msg:"El titulo debe tener hasta 100 caracteres incluyendo guion bajo"
          }
       }
  },

  image:{
       type: DataTypes.STRING(100),
       allowNull:false,
       validate:{
          notEmpty:{
             args:true,
             msg:"El nombre del archivo de imagen es obligatorio"
          },
          is:{ 
              args:/^[\w\S]{1,50}[A-ZÁÉÍÓÚÜÑÇA-ZÁÉÍÓÚÜÑÇa-záéíóúüñç'.,/\s]$/i,
              msg:"El nombre del archivo de imagen solo puede contener caracteres alfabéticos"
           },
          len:{
             args:[1,50],
             msg:"El nombre del archivo de imagen debe tener hasta 100 caracteres"
          }
       }
  },
  
  created:{
       type: DataTypes.DATEONLY,
       validate:{
          notEmpty:{
             args:true,
             msg:"La fecha de creacion es obligatoria"
           },
           isDate:{
             args:true,
             msg:"formato de fecha incorrecto ( dd-mm-aaaa )"
           },
            is:{
               args:/^([12]{1}[0-9]{3}-[0123]{1}[0-9]{1}-[0123]{1}[0-9]{1})$/i,
               msg:"fecha vacía o error de formato"
            },            
       },
  },
  charactersAssoc:{
      type: DataTypes.INTEGER(1),
      validate:{
          notEmpty:{
             args:true,
             msg:"La película debe tener al menos un artista relacionado"
           },
           customValidatorValue(value) {
            if (value===(-1)) {
              throw new Error("La película debe tener al menos un artista relacionado")
            }
          }
      }
  },
  qualification:{
      type: DataTypes.INTEGER(1),
      validate:{
          notEmpty:{
             args:true,
             msg:"La calificacion es obligatoria"
           },
          isNumeric:{
            args:true,
            msg:"La calificacion debe ser numérica"
          },
          isIn:{
             args:[[1,2,3,4,5]],
             msg:"La calificacion debe estar entre 1 y 5"
          }
      },    
  },
// CAMPO CREADO AUTOMATICAMENTE DESDE LA RELACION ENTRE TABLAS uno a Muchos
//   genderMovie:{
//       type: DataTypes.INTEGER(6),
//       validate:{
//           notEmpty:{
//               args:true,
//               msg:"El genero no puede estar vacio"
//           },
//           len:[1,6],
//           isNumeric:true,
//           },   
//           references:{
//            model:"Genders",
//            key:"idGender"
//           },
//           onDelete:"CASCADE",
//           onUpdate:"CASCADE"    
//   },
  },
  {
  sequelize,
  modelName:'movies',
  timestamps:false
  });

  module.exports=Movies;
