const router = require('express').Router();
const roleMidd=require('../../auth/roleMiddleware');
const User = require('../../models/Users');                                                      

//CRUD    
//CREATE - CREAR NUEVO USUARIO   
router.post('/', async (req, res) => {
  try{  
    const postUser=await User.create({
     name:req.body.name,
     lastname:req.body.lastname,
     email:req.body.email,
     clave:req.body.clave
     })
     return res.status(200).json({ msg: 'Usuario ingresado correctamente', postUser});   
  }
  catch(error){
    console.log(error);
    res.status(500).json({msg:"error inesperado"});
  }; 
 });


//READ - BUSCAR TODOS
router.get('/', async  (req, res) => {
    try{
        const getUser=await User.findAll()
            res.status(200).json(getUser);
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"error inesperado"});
    };
});   

//READ - BUSCAR POR UN CLAVE PRIMARIA
router.get('/:email', async (req, res) => {
    try{
        const getUserByEmail=await User.findByPk(req.params.email)
            if(getUserByEmail){
              res.status(200).json(getUserByEmail)
            } else{
              res.status(400).json({msg:"email no registrado"});
            }
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"error inesperado"});
    };
});


//UPDATE - actualizar (devuelve la cantidad de filas afectadas)
 router.put('/:email',roleMidd('ADMIN'), async (req, res) => {
    try{
        const updateUser= await User.update({
            name:req.body.name,
            lastname:req.body.lastname,  
            email:req.params.email, 
            clave:req.body.clave
            }, {where: {id: req.params.email}
        })
        if(updateUser){
            res.status(200).json(updateUser)
          } else{
            res.status(400).json({msg:"error en actualizacion de usuario"});
          }  
    }    
    catch(error){
        console.log(error);
        res.status(500).json({msg:"error inesperado"});
    }
 })

//DELETE - Borrar (devuelve la cantidad de filas afectadas)
router.delete('/:email',roleMidd('ADMIN'), async (req, res) => {
    try{
        const delUser= await User.destroy({
            where :{email: req.params.email }
        })
        if(delUser===1){
            res.status(200).json({msg:"usuario borrado!"})
          } else{
            res.status(400).json({msg:"error !, no se ha borrado el usuario"});
          }
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"error inesperado"});
    }; 
});

module.exports = router;
