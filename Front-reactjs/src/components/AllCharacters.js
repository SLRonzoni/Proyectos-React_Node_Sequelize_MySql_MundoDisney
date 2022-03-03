import React, {Fragment,useState, useEffect } from "react"
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/All&EditStyles.css";
import Swal from 'sweetalert2';
import LineCharacter from "./LineCharacter";
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies=new Cookies(); 


const AllCharacters = (props) => {

  const [characters, setCharacters] = useState([]);
  const [, setMovieLists] = useState([]); 
    

  const getCharacters = async () => {
    const respuesta = await axiosClient.get('/characters',{headers:{ Authorization:`Bearer ${cookies.get('token')}`}});
    setCharacters(respuesta.data);
  };

  const getMovies = async () => {
    const respuesta = await axiosClient.get('/movies',{headers:{ Authorization:`Bearer ${cookies.get('token')}`}});
    setMovieLists(respuesta.data);
  };

  //Eliminar character
  const confirmRemove = (id) => {
    Swal.fire({
      title: 'Está seguro de eliminar ? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar !'
    })
      .then((result) => {
        if (result.value) {
          remove(id);
        }
      });
  };

  const remove = async (id) => {
    await axiosClient
    .delete(`/characters/${id}`,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
    .then ((respuesta) => {
        Swal.fire({
          icon: 'success',
          title: 'Personaje Eliminado!',
          text: respuesta.data.msg,
        });
        getCharacters();
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error : No se puede eliminar',
        text: error.response.data.msg,
      }); 
    });
  };

  useEffect(() => {
     getCharacters()  
     getMovies() 
  },[]);  


 //Traer datos FILTRADOS x nombre de Api 👍
 let filterBy;
 const getFilterCharactersName = async () => {
   await axiosClient
     .get(`/characters?name=`+filterBy,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
     .then((respuesta) => {
       setCharacters(respuesta.data)
     })
     .catch(function (error) {
       console.log(error)
     });
 };
 
 //seleccion de filtro  
   const changesName=(e)=>{
       filterBy=e.target.value;
       if(filterBy === 'todas'){
          getCharacters()   
       } else {
         getFilterCharactersName()   
   };
 } 

//Traer datos FILTRADOS x edad de Api 👍
let edad;
const getFilterCharactersAge = async () => {
 await axiosClient
   .get(`/characters?age=`+edad,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
   .then((respuesta) => {
     setCharacters(respuesta.data)
   })
   .catch(function (error) {
     console.log(error)
   });
};
 
 //seleccion de filtro  
 const changesAge=(e)=>{
     edad=e.target.value;
     if(e.target.value==='todas'){
        getCharacters()
     } else {
       getFilterCharactersAge()
 };  
}

//Traer datos ordenados x peliculas   👍
let pelicula;
const getFilterCharactersMovies = async () => {
 await axiosClient
   .get(`/characters?movies=`+pelicula,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
   .then((respuesta) => {
      setCharacters(respuesta.data) 
   })
   .catch(function (error) {
     console.log(error)
   });
};
    
 //seleccion de filtro  
 const changesMovies=(e)=>{
     pelicula=e.target.value;
     if(e.target.value==='todas'){
       getCharacters()
       getMovies()
     } else {
       getFilterCharactersMovies()
 };  
};

//Obtener nombre de la pelicula para boton desplegable 👍
let finalMovies = [];
let namesMovies=[];

for (let i = 0; i < characters.length; i++) {
  for (let j = 0; j < characters[i].movies.length; j++) {
    namesMovies.push(
      characters[i].movies[j].title  === undefined ? '' : characters[i].movies[j].title)      
    }
}; 
//quitar duplicados 
finalMovies=[...new Set(namesMovies)];
//ordenar alfabeticamente
finalMovies.sort(function(a,b) {
  if(a.nombre<b.nombre){
    return -1;
  }
  if(a.nombre>b.nombre){
   return 1;
  } return 'error';                                         
});

//hacer visibles opciones para administrador
const getRoleView =()=> { 
  if(cookies.cookies.role === "ADMIN") {
    return 'visible'
  } else {
    return 'invisible'
  };
};

  return (
    <Fragment >
      <br></br>
      <div className='displayFlex'>
        <h4 className="text centrar">Artistas 
        <br></br>      
        <div className="containerBtnDesplegable">
            <div className="divBtnDesplegable">
              <p className="pBtnDesplegable">Buscar nombre</p>
                <select
                  type="text"
                  name="name"
                  onChange={changesName}
                  className="m-3 mr-md-1  selectBtnDesplegable form-select form-select-example"
                  >
                  {characters.map(oneChar => (
                    <option  key={oneChar.id} value={oneChar.name}>
                      {oneChar.name}
                    </option>
                  ))}
                  <option value={"todas"}>Mostrar todos los artistas</option>
                </select>
            </div>

            <div className="divBtnDesplegable" >
              <p className="pBtnDesplegable" >Buscar por edad</p>
                <select
                  type="text"
                  name="age"
                  onChange={changesAge}
                  className="m-3 mr-md-1 btn  selectBtnDesplegable  form-select form-select-example "
                >  
                  {characters.map((oneChar) => (
                    <option key={oneChar.id} value={oneChar.age}>
                      {oneChar.age}
                    </option>
                  ))}
                  <option value={"todas"}>Mostrar todos los artistas</option>
                </select>
              
            </div>

            <div className="btnBuscaxPeli">
              <p className="pBtnDesplegable" > Buscar por película</p>
                <select
                  type="text"
                  name="idMovieAssoc"
                  onChange={changesMovies}
                  className="m-3 mr-md-1  selectBtnDesplegable form-select form-select-example"
                  > 
                  {finalMovies.map((char) => (
                    <option key={char} value={char}>{char}
                    </option>
                  ))}     
                  <option value={"todas"}>Mostrar todas las películas</option>
                </select>
            </div>

            {/* <div className="btnBuscaxPeli" > */}
              <div className={getRoleView()}>
                <Link to={"/FormCharacters"} className="m-1 mr-md-1 btn bg-success"
                      role="button" aria-pressed="true"> Nuevo artista </Link> 
              {/* </div> */}
            </div>       
          </div>     
        </h4> 
      </div>
     
      <div className="lineAll centrar">  
          {characters.map(one => ( 
            <LineCharacter
                key ={one.idCharacter}
                idCharacter={one.idCharacter}
                name={one.name}
                image={one.imageCharacter}
                age={one.age}
                weight={one.weight}
                history={one.history}
                idMoviesAssoc={one.idMoviesAssoc}          
                remove={confirmRemove}
                cookies={cookies}
            />       
          ))}   
      </div>
    </Fragment>
  );
};

export default AllCharacters;
