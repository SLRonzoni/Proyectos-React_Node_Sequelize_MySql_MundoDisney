const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database/db');
    
class User extends Model {}
    User.init({
    name:{
      type: DataTypes.STRING(50),
      allowNull:false,
      validate:{
         notEmpty:{
            msg:"El nombre es obligatorio"
         },
         isAlpha:{ 
            args: true,
            msg:"El nombre solo puede contener caracteres alfabéticos"
         },
         len:{ 
            args:[3,50],
            msg:"El nombre debe tener entre 3 y 50 caracteres"
         }
      }
 },

    lastname:{
          type: DataTypes.STRING(50),
          allowNull:false,
          validate:{
            notEmpty:{
                msg:"El apellido es obligatorio"
            },
            isAlpha:{ 
                args: true,
                msg:"El apellido solo puede contener caracteres alfabéticos"
            },
            len:{ 
                args:[3,50],
                msg:"El apellido debe tener entre 3 y 50 caracteres"
            }
          }
    },
    
    email:{
          type: DataTypes.STRING(50),
          primaryKey: true,
          allowNull:false,
          validate:{
                notEmpty:{
                  msg:"El email es obligatorio"
                },
                isEmail:{ 
                  args: true,
                  msg:"El formato del email debe ser : correo@correo.com.ar o correo@correo.com"
                },
                len:{ 
                  args:[3,50],
                  msg:"El email debe tener hasta 50 caracteres"
                },
                isUnique: (value, next) => {
                  User.findAll({
                    where: { email: value }
                    })
                    .then((user) => {
                      if (user.length !== 0) {
                        return next(new Error('El email fue registrado anteriormente !'));
                      }
                      next()
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                },
              },
            },

    clave:{
        type: DataTypes.STRING,   //dejar el largo en 255 por el encryptado
        allowNull:false,
        validate:{
          notEmpty:{
            msg:"La clave es obligatoria"
          },
          }
    },

    role:{
            type:DataTypes.ENUM({
            values:['USER','ADMIN']
            }),
            defaultValue:'USER',
            allowNull:false
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull:false,
    },

    updatedAt:{
        type: DataTypes.DATE,
        allowNull:false
    },   
    },
    {
    sequelize,
    modelName:"users"
    });

    module.exports=User;