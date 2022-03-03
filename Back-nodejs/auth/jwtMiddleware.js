const jwt=require('jsonwebtoken');
const auth=require('../auth/auth');

module.exports = (req,res,next) =>{
   
    //verificacion de existencia y validez del token
    if(!req.headers.authorization){
        res.status(401).json({msg:"Ruta no autorizada, no existe token"});
    } else{        
        let Btoken=req.headers.authorization.split(' ')[1];
        jwt.verify(Btoken,auth.secret,(error,authData)=>{
            if(error){
                res.status(401).json({msg: 'Ruta no autorizada, verifique token'});
            } else{
                req.user=authData;
                console.log(`Token aceptado para el usuario : ${authData.user.email}`);
                next(); 
            };
        });  
    }
};