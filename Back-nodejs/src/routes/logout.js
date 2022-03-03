const express=require("express");
const router=express.Router();

//Logout y blanqueo de Token
router.get("/auth/logout", (req,res)=>{
 try{
    let token=" ";
    console.log('Usuario desconectado !');
 }
 catch (error){
    console.error(error.message);
    return res.status(500).json({msg:"Error Inesperado"}); 
 }
});

module.exports=router;