const jwtMiddleware =require('./jwtMiddleware');
const auth=require('../auth/auth');
const jwt=require('jsonwebtoken');
const User = require('../models/Users');  

let tokenData="";
let userBDRole="";

//Control de roles para el acceso a las rutas
const roleMidd = (rolEnRuta)=> async (req,res,next) =>{
   try{
        const token=req.headers.authorization.split(' ').pop()
        const decodedToken = async (token)=>{   
            try{ 
                return( jwt.verify(token,auth.secret))
            }
            catch(error){
                return null
            }
        };
        
        tokenData= await decodedToken(token)    
        userBDRole=await User.findByPk(tokenData.user.email)
        if(userBDRole.dataValues.role!==rolEnRuta){
            return res.status(408).json({msg:"Operación no autorizada, usted no tiene permisos"});
        } else { 
            next()
        }
    }
    catch(error){
        console.log(error);
        return res.status(408).json({msg:"Operación no autorizada, usted no tiene permisos"});
    }
}


module.exports=roleMidd;

