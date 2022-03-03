const express=require("express");
const router=express.Router();
const nodemailer=require('nodemailer');
require('dotenv').config();
const { google } = require("googleapis");
const OAuth2=google.auth.OAuth2;

const correoBienvenida= ( async (req,res)=>{
        let contentHtml=`
        <h1>Hola ${nombre} ${apellido} !!! </h1>
        <h3>Bienvenid@ a Mundo Disney</h3>
        <p>estamos muy felices de contarte entre nuestros usuarios</p>
        `;
               
        //Configuracion de email
        const CLIENTD_ID=process.env.CLIENTD_ID;
        const CLIENT_SECRET=process.env.CLIENT_SECRET;
        const REDIRECT_URI="https://developers.google.com/oauthplayground";
        const REFRESH_TOKEN=process.env.REFRESH_TOKEN;
                
        
        const oAuth2Client=new google.auth.OAuth2(
            CLIENTD_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );
        
        oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});
    
        async function sendMail(){
            try{
                const accessToken=await oAuth2Client.getAccessToken();

                const transporter=nodemailer.createTransport({
                    host:"smtp.gmail.com",
                    port:"465",
                    secure:true,
                    auth:{
                    type:"login",
                    user:process.env.EMAIL,
                    pass:process.env.PASS,
                    clientId:process.env.CLIENTD_ID,
                    clientSecret:process.env.CLIENT_SECRET,
                    refreshToken:process.env.REFRESH_TOKEN,
                    accessToken:accessToken,
                    
                    },
                });
        
                const mailOPtions={   
                    from:process.env.EMAIL,
                    to:`${email}`,
                    subject:"Alkemy Challenge",
                    text:" Node JS Año 2022",
                    html: contentHtml,        
                };
        
                const result=await transporter.sendMail(mailOPtions);
                return result
            }  
            catch (error){
                console.log(error);
            }
        }
     
        sendMail()
            .then((result)=> console.log('email enviado exitosamente'))
            .catch((error)=> console.log(error.message));    
  
});

module.exports={correoBienvenida};