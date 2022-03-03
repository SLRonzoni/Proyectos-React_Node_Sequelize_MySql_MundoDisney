const express=require("express");
const router=express.Router();
const sequelize = require('../../database/db');
const User = require('../../models/Users');
const bcrypt= require ('bcrypt');
const jwt=require('jsonwebtoken');
const authConfig=require('../../auth/auth');

//Login y Token
router.post("/",async  (req,res)=>{
  try{  
    //validar que envien todos los valores obligatorios
    if((!req.body.email )|| (!req.body.clave)){
         return res.status(400).json({msg:'email y contraseña son obligatorios'});
    };  

    const user=await User.findByPk(req.body.email)
            if(!user){
                console.log('Email no registrado !');
                res.status(201).json({msg:'Email no registrado !'});

            } else {
                //verificar sea correcta la clave   
                //comparar contra clave encryptada
                const clavePlain=req.body.clave;
                const claveBD=user.dataValues.clave;

                async function compare(){
                    try{ 
                        const  compare =  (clavePlain,claveBD) =>{
                            return  bcrypt.compare(clavePlain,claveBD)
                        }
                        
                        checkClave = await compare(clavePlain,claveBD);                         
            
                        if(!checkClave){
                            return res.status(400).json({msg: 'La clave es incorrecta'});
                        }     
                        
                        //generar token con tiempo de expiracion
                        let token= jwt.sign({user:user}, authConfig.secret,{
                                        expiresIn:authConfig.expires });

                        res.status(200).json({msg:`Usuario ${user.name} ${user.lastname} logueado !`,user:user, token:token});   
                        console.log(`Usuario ${user.name} ${user.lastname} logueado !`); 
                    }

                    catch (error){
                        console.log(error);
                        return res.status(400).json({msg:error.errors[0].message});
                    }
                }
                compare(clavePlain,claveBD);
                
            }                 
    } 
    catch(error){
        console.log(error);
        return res.status(400).json({msg:error.message})
    } 
});
 

module.exports=router;