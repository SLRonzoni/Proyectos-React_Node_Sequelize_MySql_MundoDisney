const router = require('express').Router();
const jwtMiddleware=require('../../auth/jwtMiddleware');
const roleMidd=require('../../auth/roleMiddleware');
const Characters=require('../../models/Characters');
const Movies=require('../../models/Movies');
const CharacterMovies=require('../../models/CharacterMovies');

//GET  '/'  muestra solo los datos solicitados en el challenge   👍                                                               
// router.get('/',jwtMiddleware, async  (req, res) => {  
//     try{     
//       const respuesta=await Characters.findAll({attributes : ['name','imageCharacter']})                
//         res.status(200).json(respuesta);         
//       }
//       catch(error){
//           console.log(error);
//           res.status(500).json({msg:"error inesperado"});
//       }
//   }); 


//GET  '/'  con todos los datos completos porque se usan para otros servicios   👍
//          los datos a mostrar que pide el challenge, los filtro desde React                                                                                                                       
router.get('/',jwtMiddleware , async (req, res) => {
    try{
        //listar todos los personajes
        let showResp;
         const respuesta=await Characters.findAll({include: {model:Movies,attributes : ['idMovie','title']}})
                showResp=(respuesta); 
    
                //capturar valor enviado en ruta, ejemplo:(localhost:3000/characters?name=name)
                 const {name} = req.query;
                 const {age} = req.query; 
                 const {movies} = req.query;
           
                //si no hay filtros, mostrar resultado ordenado alfabeticamente 👍
                if(!name && !age && !movies){
                     showResp=respuesta.sort(function (a,b) {
                         if(a.name<b.name){
                         return -1;
                         }
                         if(a.name>b.name){
                        return 1;
                        }                                          
                    })
                };
     
                //si hay filtros, filtrar respuesta  y mostrar resultado 👍                
                //filtrar x nombre 👍
                if( (typeof(name)!=='undefined') ){  
                    function filterByName(respuesta){
                        return respuesta.name === name.toUpperCase();
                    }
                    showResp=respuesta.filter(filterByName);        
                };
    
                //filtrar x edad 👍
                if( (typeof(age)!=='undefined')){
                    function filterByAge(respuesta){
                    return respuesta.age === parseInt(age);
                    }
                    showResp=respuesta.filter(filterByAge);
                };

                //filtrar  artistas x pelicula 👍               
                let arrayAllPelis=[];
                if( (typeof(movies)!=='undefined')){
                    for(let i=0;i<respuesta.length;i++){
                        for(let j=0;j<respuesta[i].movies.length;j++){
                            if((respuesta[i].movies[j].title === movies.toUpperCase())  
                            ){
                            arrayAllPelis.push(respuesta[i])
                            }
                        }
                    }
                showResp= arrayAllPelis      
                };
                res.status(200).json(showResp);   
                      
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"error inesperado"});
      }                  
});    


//GET x ID  '/:id' 👍        
router.get('/:id', jwtMiddleware, async (req, res) => {
    try{
        const findChar=await Characters.findByPk(req.params.id,{include: {model:Movies}})           
             // verificar que exista el personaje en la base de datos
            if(findChar!==null){
                res.json(findChar);
            } else{        
                return res.status(404).json({msg:'No se encuentra el personaje'});
            }   
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"error inesperado"});
      }                   
});      


//PUT '/edit/:id'   👍                                    
router.put('/edit/:id', jwtMiddleware, roleMidd('ADMIN'), async (req, res) => {
    try{
        const findChar= await Characters.findAll( {where:{idCharacter:req.params.id} })
            //verificar que exista el personaje en la base de datos
            if(findChar==0){
                return res.status(400).json({msg: 'El personaje que intenta modificar, no existe'});
            } else {
                const updateChar=await Characters.update({
                    age:req.body.age,
                    weight:req.body.weight,
                    history:req.body.history.toUpperCase()   
                    },{where:{idCharacter:req.params.id}})
                        return res.status(200).json({ msg: 'Personaje actualizado correctamente'});   
            }                    
    }            
    catch(error){
        console.log(error);
        return res.status(400).json({msg:error.message})
    } 
});     


//POST  '/characters'  👍                                                          
router.post('/', jwtMiddleware,roleMidd('ADMIN'), async (req, res) => {
    try{
        const findChar=await Characters.findAll( {where:{name:req.body.name} })
            //verificar que NO exista el personaje en la base de datos
            if(findChar.length>0){
                return res.status(400).json({msg: 'El personaje que intenta ingresar, ya existe'});
            } else {
                const createChar= await Characters.create({
                    name:req.body.name.toUpperCase(),
                    imageCharacter:req.body.imageCharacter.toUpperCase(),
                    age:req.body.age,
                    weight:req.body.weight,
                    history:req.body.history.toUpperCase()    
                    })
                    return res.status(200).json({ msg: 'Personaje ingresado correctamente', createChar});   
            }
    }        
    catch(error){
        console.log(error);
        return res.status(400).json({msg:error.message})
    }  
});     


//DELETE '/characters/:id' 👍
 router.delete('/:id', jwtMiddleware,roleMidd('ADMIN'), async (req, res) => {                
    try{    
        //verificar que no haya peliculas relacionadas con el personaje
        const delCharVerifMovie=await CharacterMovies.findAll({where : {charactersId:req.params.id} })
        if(delCharVerifMovie.length>0){
        return res.status(400).json({ msg:`No se puede eliminar. El artista tiene ${delCharVerifMovie.length} película/s relacionada/s. PRIMERO DEBE QUITAR LA RELACION  ` , delCharVerifMovie});
        } else {
            const delChar=await Characters.destroy({ where :{ idCharacter: req.params.id } })                                                        
                if(delChar === 1 ){ 
                    return res.status(200).json({msg:'Personaje eliminado exitosamente'});
                } else {
                    return res.status(404).json({msg:'No se encuentra el personaje'});
                }
        }               
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"error inesperado"})
    }                     
 });  
 

module.exports = router;
