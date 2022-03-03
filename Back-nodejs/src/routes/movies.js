const router = require('express').Router();
const jwtMiddleware=require('../../auth/jwtMiddleware');
const roleMidd=require('../../auth/roleMiddleware');
const Movies=require('../../models/Movies');
const Characters=require('../../models/Characters');
const Genders=require('../../models/Genders')
const CharacterMovies=require('../../models/CharacterMovies');

//GET  '/'  muestra solo los datos solicitados en el challenge   👍                                                               
// router.get('/',jwtMiddleware, async  (req, res) => {  
//     try{     
//       const respuesta=await Movies.findAll({attributes : ['title','image','created']})                
//         res.status(200).json(respuesta);         
//       }
//       catch(error){
//           console.log(error);
//           res.status(500).json({msg:"error inesperado"});
//       }
//   }); 


//GET  '/'  con todos los datos completos porque se usan para otros servicios  👍
//          los datos a mostrar que pide el challenge, los filtro desde React                                                               
router.get('/',jwtMiddleware,async  (req, res) => {  
  try{     
    //listar todas las peliculas
    let showResp;
    const respuesta=await Movies.findAll({include: {model:Genders,attributes : ['idGender','name']}})
        showResp=respuesta; 

        //capturar valor enviado en ruta, ejemplo:(localhost:3000/movies?name=title)
        const {name} = req.query;
        const {genre} = req.query; 
        const {order} = req.query;
       
        //si no hay filtros, mostrar resultado en orden alfabetico👍
        if(!name && !genre && !order){
            showResp=respuesta.sort(function (a,b) {
                if(a.title<b.title){
                    return -1;
                }
                if(a.title>b.title){
                    return 1;
                }                                          
            })
        };
 
        //si hay filtros, filtrar respuesta  y mostrar resultado 👍
        //filtrar x fecha
        if(typeof(order)!=='undefined' && order ==="DESC"){
            showResp=respuesta.sort(function (a,b) {
                if(a.created>b.created){
                    return -1;
                }
                if(a.created>b.created){
                    return 1;
                }     
            })               
        } else if(typeof(order)!=='undefined' && order ==="ASC") { 
                showResp=respuesta.sort(function (a,b) {
                    if(a.created<b.created){
                        return -1;
                    }
                    if(a.created>b.created){
                        return 1;
                    }                                          
                }) 
                } else {
                    showResp=respuesta;
                };

            
        //filtrar x titulo 👍
        if( (typeof(name)!=='undefined') ){        
            function filterByTitle(respuesta){
                return respuesta.title === name.toUpperCase();
            }
            showResp=respuesta.filter(filterByTitle);        
        };

        //filtrar x genero 👍
        if( (typeof(genre)!=='undefined')){
            function filterByGender(respuesta){
                 return respuesta.gender.name === genre.toLocaleUpperCase();
            }
            showResp=respuesta.filter(filterByGender);
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
        const getMovieById=await Movies.findByPk(req.params.id,{include: {model:Characters}})           
            // verificar que exista la pelicula en la base de datos
            if(getMovieById!==null){
                res.json(getMovieById);   
            } else{        
                return res.status(404).json({msg:'No se encuentra la película'});
            };
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"error inesperado"});
    }; 
});
  
//PUT '/edit/:id'  👍                                
router.put('/edit/:id', jwtMiddleware,roleMidd('ADMIN'), async (req, res) => {
    try{
        const putMovie= await Movies.findByPk(req.params.id)
            //verificar que exista el titulo de la pelicula en la base de datos
            if(!putMovie){
                res.status(400).json({msg: 'La película que intenta modificar, no existe'});
            } else {
                //verifica que haya al menos un personaje para la pelicula
                if(!req.body.charactersAssoc){
                    return res.status(400).json({msg: 'La pelicula debe estar asociada al menos a un artista'});
                } else {
                //actualizar tabla de peliculas 
                const updateMovie=await Movies.update({
                    created:req.body.created,
                    qualification:req.body.qualification,
                    genderMovie:req.body.genderMovie,
                    char1:req.body.charactersAssoc,
                    char2:req.body.char2,
                    char3:req.body.char3,
                    char4:req.body.char4,
                    char5:req.body.char5
                },{where:{idMovie:req.params.id} })

                //actualizar relacion CharacterMovies para personajes obligatorios y opcionales
                const findRelations=await CharacterMovies.findAll( {where:{moviesId:req.params.id} })
                moviesId=req.params.id
                                            

                //eliminar todas las relaciones de la pelicula elegida
                const delRelations=await CharacterMovies.destroy({ where :{ moviesId: req.params.id } })   
                
                //crea nuevas relaciones personajes obligatorios y opcionales
                moviesId=req.params.id;
                
                if(req.body.charactersAssoc){
                    await CharacterMovies.create({moviesId,charactersId:req.body.charactersAssoc})}
                if (req.body.char2){
                    await CharacterMovies.create({moviesId,charactersId:req.body.char2})} 
                if (req.body.char3){
                    await CharacterMovies.create({moviesId,charactersId:req.body.char3})} 
                if (req.body.char4){
                    await CharacterMovies.create({moviesId,charactersId:req.body.char4})} 
                if (req.body.char5){
                    await CharacterMovies.create({moviesId,charactersId:req.body.char5})} 
                   

                if(updateMovie){         
                    res.status(200).json({ msg: 'Datos actualizados correctamente',putMovie});       
                } else {    
                    res.status(400).json({msg:'Error : Datos no actualizados'});   
                }                                    
                }
            }                                
        }                       
        catch(error){
            console.log(error);
            return res.status(400).json({msg:error.message})
        }                      
    })
  
//POST  '/movies'  👍                                               
router.post('/', jwtMiddleware,roleMidd('ADMIN'), async (req, res) => { 
    try{
        const postMovie=await Movies.findAll( {where:{title:req.body.title} })
            //verificar que NO exista el titulo en la base de datos
            if(postMovie.length>0){
                return res.status(400).json({msg: 'La pelicula que intenta ingresar, ya existe'});
            } else {
                //crea nueva pelicula ( verificando si tiene al menos un artista relacionado)
                if(!req.body.charactersAssoc){
                    return res.status(400).json({msg: 'La pelicula debe estar asociada al menos a un artista'});
                } else {
                const createMovie=await Movies.create({
                    title:req.body.title.toUpperCase(),
                    image:req.body.image.toUpperCase(),
                    created:req.body.created,
                    qualification:req.body.qualification,
                    genderMovie:req.body.genderMovie,
                    char1:req.body.charactersAssoc,
                    char2:req.body.char2,
                    char3:req.body.char3,
                    char4:req.body.char4,
                    char5:req.body.char5
                });
            
                //crea relacion CharacterMovies para personajes obligatorios y opcionales
                const findIdMovie=await Movies.findAll( {where:{title:req.body.title} })
                moviesId=findIdMovie[0].dataValues.idMovie;
                
                if(req.body.charactersAssoc){
                    await CharacterMovies.create({moviesId,charactersId:req.body.charactersAssoc})}
                if (req.body.char2){
                    await CharacterMovies.create({moviesId,charactersId:req.body.char2})} 
                if (req.body.char3){
                    await CharacterMovies.create({moviesId,charactersId:req.body.char3})} 
                if (req.body.char4){
                    await CharacterMovies.create({moviesId,charactersId:req.body.char4})} 
                if (req.body.char5){
                    await CharacterMovies.create({moviesId,charactersId:req.body.char5})} 
                                

                if(createMovie){         
                    res.status(200).json({ msg: 'Película ingresada correctamente',createMovie});       
                } else {    
                    res.status(400).json({msg:'Error : Datos no actualizados'});   
                }
            }
        }    
    }
    catch(error){
        console.log(error);
        return res.status(400).json({msg:error.message})
    }              
});
  
//DELETE '/movies/:id' 👍
router.delete('/:id', jwtMiddleware,roleMidd('ADMIN'), async(req, res) => {
    try{      
        //borrar la pelicula
        const delMov=await Movies.destroy({ where :{ idMovie: req.params.id } })                 
        //verificar que exista la pelicula                                         
            if(delMov === 1 ){ 
                return res.status(200).json({msg:'Pelicula eliminada exitosamente'});
            } else {
                return res.status(404).json({msg:'No se encuentra la pelicula'});
            } 
    }                                     
    catch(error){
        console.log(error);
        return res.status(500).json({msg:"Error Inesperado"});
    }
}); 


module.exports=router;