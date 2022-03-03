'use strict';

//EXPRESS
const express= require('express');
const path = require('path'); 
const app = express();
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

//SEQUELIZE 
const sequelize= require('./database/db'); 
require('./models/associations');

//MAIL
const nodemailer=require('nodemailer');

//SETTINGS Y MIDDLEWARES
app.set("port",process.env.PORT || 3000);
app.use(cors());
//app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'src/public')));

//RUTAS
app.use('/',require('./src/routes/home'));
app.use('/auth/register',require('./src/routes/register'));
app.use('/auth/login',require('./src/routes/login'));
app.use('/users', require('./src/routes/users'));
app.use('/characters',require('./src/routes/characters'));
app.use('/movies',require('./src/routes/movies'));
app.use('/genders',require('./src/routes/genders'));


//SERVIDOR
app.listen(app.get('port'),()=>{
    console.log('Servidor en puerto http://localhost:'+ app.get('port'));
});

//CONEXION A BASE DE DATOS
sequelize.authenticate().then(() =>{ 
//sequelize.sync({force:false}).then(() =>{    
                           console.log('Conexión a Base de datos, establecida');})
                        .catch(error => { 
                           console.log('Error de conexión con BD', error);})

module.exports = app;