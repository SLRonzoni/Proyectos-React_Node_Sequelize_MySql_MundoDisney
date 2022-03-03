const router = require("express").Router();
const jwtMiddleware=require('../../auth/jwtMiddleware');
const roleMidd=require('../../auth/roleMiddleware');
const Movies=require('../../models/Movies');
const Genders=require('../../models/Genders');


//POST '/' 👍
router.post('/', jwtMiddleware,roleMidd('ADMIN'),async (req, res) => {
  try{
    const postGender=await Genders.findAll( {where:{name:req.body.name} })
      //verificar que NO exista el genero en la base de datos
      if(postGender.length>0){
        return res.status(400).json({msg: 'El género que intenta ingresar, ya existe'});
      } else {
        await Genders.create({
          name:req.body.name.toUpperCase(),
          image:req.body.image.toUpperCase()
        })
        return res.status(200).json({ msg: 'Género ingresado correctamente'});   
      }
  }        
  catch(error){
    console.log(error);
    return res.status(400).json({msg:error.message})
}              
});


//GET '/' 👍
router.get('/',jwtMiddleware,async (req, res) => { 
  try{      
   const getGenders=await Genders.findAll()
      res.status(200).json(getGenders);          
  }        
  catch(error) {
    console.log(error)
    res.status(500).json({msg:"error inesperado"});
  }
});


//GET por id '/:id' 👍
router.get('/:id',jwtMiddleware, async (req, res) => {  
  try{     
   const getGendersbyId=await Genders.findByPk(req.params.id)
      // verificar que exista el genero en la base de datos
      if(res!==null){
        return res.status(200).json(getGendersbyId);
      } else{        
        return res.status(404).json({msg:'No se encuentra el genero'});
      }    
  }       
  catch(error) {
    console.log(error)
    res.status(500).json({msg:"error inesperado"});
  }
});


//PUT '/edit/:id' 👍                                      
router.put('/edit/:id', jwtMiddleware,roleMidd('ADMIN'),async (req, res) => {
  try{
    const putGender=await Genders.findAll({where:{idGender:req.params.id} })
      //verificar que exista el genero en la base de datos
      if(res.length===0){
        return res.status(400).json({msg: 'El genero que intenta modificar, no existe'});
      } else {
        await Genders.update({
          name:req.body.name.toUpperCase(),
          image:req.body.image.toUpperCase()
          },{where:{idGender:req.params.id} })
          return res.status(200).json({ msg: 'Género actualizado correctamente'});   
      }
  }
  catch(error){
    console.log(error);
    return res.status(400).json({msg:error.message})
}  
});


//DELETE '/:id' 👍
router.delete("/:id", jwtMiddleware,roleMidd('ADMIN'),async  (req, res) => {
  try{
    //verificar que no haya peliculas relacionadas con el genero
    const delGenderVerifMovie=await Movies.findAll({where : {genderMovie:req.params.id} })
      if(delGenderVerifMovie.length>0){
        return res.status(400).json({ msg:`No se puede eliminar. El género tiene ${delGenderVerifMovie.length} pelicula/s asociada/s`, delGenderVerifMovie});
      } else {
        //borrar la pelicula
        const delGender=await Genders.destroy({ where :{ idGender: req.params.id } })                                                         
          if(delGender===1){ 
            return res.status(200).json({msg:'Género eliminado exitosamente',delGender});
          } else {
            return res.status(404).json({msg:'No se encuentra el género'});
          }                
      }
  }
  catch(error){
    console.log(error)
    res.status(500).json({msg:"error inesperado"});
  }                                        
});  


module.exports = router;