const express=require("express");
const router=express.Router();

//Home
router.get("/", (req,res)=>{
 try{
    console.log('App iniciada correctamente');
 }
 catch (error){
    console.error(error.message);
    return res.status(500).json({msg:"Error Inesperado"}); 
 }
});
 

module.exports=router;