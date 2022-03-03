const express=require("express");
const router=express.Router();

const {sequelize}=require('../../database/db');
const User = require('../../models/Users');

const {correoBienvenida} =require('./sendEmail');
const nodemailer=require('nodemailer');

const bcrypt= require('bcrypt');
const { google } = require("googleapis");
const OAuth2=google.auth.OAuth2;


router.post("/", async (req,res)=>{  
 try{
    //encriptar la clave
    const encrypt = async (textPlain) =>{
        const hash = await bcrypt.hash(textPlain,10)
        return hash
    }
    const encryptClave = await encrypt(req.body.clave);

    //alta del nuevo usuario
    const register=await User.create({
        name:req.body.name.toUpperCase(),
        lastname:req.body.lastname.toUpperCase(),
        email:req.body.email.toUpperCase(),
        clave:encryptClave
        })
        console.log('Nuevo usuario registrado.....',register.email)
        res.status(200).json({msg:'Nuevo usuario registrado !'});

        //email bienvenida
        nombre=req.body.name.toUpperCase() ;
        apellido=req.body.lastname.toUpperCase();
        email=req.body.email; 
        correoBienvenida(nombre,apellido,email);          
 }
 catch(error){
    console.log(error);
    return res.status(400).json({msg:error.message})
} 
});

module.exports=router;

