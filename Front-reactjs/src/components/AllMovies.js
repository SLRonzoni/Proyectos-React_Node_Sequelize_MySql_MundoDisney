import React, { Fragment, useState, useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/All&EditStyles.css";
import LineMovie from "./LineMovie";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies=new Cookies(); 

const AllMovies = (props) => { 

  const [movies, setMovies] = useState([]);
  const [, setGenderLists] = useState([]); 
   
  const getMovies = async () => {     
    const respuesta = await axiosClient.get('/movies',{headers:{ Authorization:`Bearer ${cookies.get('token')}`}});
    setMovies(respuesta.data);
  };
  
  const getGenders = async () => {
    const respuesta = await axiosClient.get('/genders',{headers:{ Authorization:`Bearer ${cookies.get('token')}`}});
    setGenderLists(respuesta.data);
  };

  //Eliminar pelicula 👍
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar !",
    })
    .then((result) => {
      if (result.value) {
        removing(id);
      }
    });
  };

  const removing = async (id) => {
    await axiosClient
      .delete(`/movies/${id}`,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then((respuesta) => {
        Swal.fire({
          icon: "success",
          title: "Película Eliminada !",
          text: respuesta.data.msg,
        });
        getMovies();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede eliminar",
          text: error.response.data.msg,
        });
      });
  };

  useEffect(() => {
    getMovies()
    getGenders()
  },[]);

  
  //Obtener datos FILTRADOS x titulo de Api 👍
  let filterBy;
  const getFilterMoviesTitle = async () => {
    await axiosClient
      .get(`/movies?name=`+filterBy,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then((respuesta) => {
        setMovies(respuesta.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  };
  
  //evento de seleccion de filtro  
    const changesTitle=(e)=>{
        filterBy=e.target.value;
        if(filterBy === 'todas'){
           getMovies() 
        } else {
          getFilterMoviesTitle()   
    };
  } 

//Obtener datos FILTRADOS x genero de Api 👍
let genero;
const getFilterMoviesGender = async () => {
  await axiosClient
    .get(`/movies?genre=`+genero,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
    .then((respuesta) => {
      setMovies(respuesta.data)
    })
    .catch(function (error) {
      console.log(error)
    });
};
  
  //evento de seleccion de filtro  
  const changesGender=(e)=>{
      genero=e.target.value;
      if(e.target.value==='todas'){
         getMovies()
      } else {
        getFilterMoviesGender()
  };  
}

//Obtener datos ordenados x fecha de creacion 👍
let orden;
const getFilterMoviesOrder = async () => {
  await axiosClient
    .get(`/movies?`+orden,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
    .then((respuesta) => {
      setMovies(respuesta.data)
    })
    .catch(function (error) {
      console.log(error)
    });
};

  //evento de seleccion de filtro  
  const changesOrder=(e)=>{
      orden=e.target.value;
      if(e.target.value==='todas'){
         getMovies()
      } else {
        getFilterMoviesOrder()
  };  
};

//Obtener nombre del genero para boton desplegable 👍
let finalGenders=[];
let namesGenders=[];
for (let i = 0; i < movies.length; i++) {
    namesGenders.push( 
      movies[i].gender.name  === undefined ? '' : movies[i].gender.name )
};

//quitar duplicados 
finalGenders=[...new Set(namesGenders)];
//ordenar alfabeticamente
finalGenders.sort(function(a,b) {
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
    <Fragment>
    <br></br>
      <div className='displayFlex'>
        <h4 className="text centrar">Películas 
        <br></br>
       <div className="containerBtnDesplegable" >
        <div className="btnBuscaxPeli">
          <p className="pBtnDesplegable">Buscar título</p>
            <select
              type="text"
              name="title"
              onChange={changesTitle}
              className="m-3 mr-md-1  selectBtnDesplegable form-select form-select-example"
              >
              {movies.map(oneMovie => (
                <option  key={oneMovie.idMovie} value={oneMovie.title}>
                   {oneMovie.title}
                </option>
              ))}
              <option value={"todas"}>Mostrar todas las películas</option>
            </select>
        </div>

        <div className="btnBuscaxPeli" >
          <p className="pBtnDesplegable" >Buscar por género</p>
            <select
              type="text"
              name="genderMovie"
              onChange={changesGender}
              className="m-3 mr-md-1  selectBtnDesplegable form-select form-select-example"
             >  
              {finalGenders.map(oneGender => (
                <option key={oneGender} value={oneGender}>
                   {oneGender}
                </option>
              ))}
              <option value={"todas"}>Mostrar todas las películas</option>
            </select>
        </div>

        <div className="btnBuscaxPeli" >
          <p className="pBtnDesplegable" > Ordenar por fecha o alfabético</p>
            <select
              type="text"
              name="created"
              onChange={changesOrder}
              className="m-3 mr-md-1  selectBtnDesplegable form-select form-select-example"
               >
              <option value={"order=ASC"}>Fecha Ascendente</option>
              <option value={"order=DESC"}>Fecha Descendente</option>
              <option value={"todas"}>Mostrar todas por órden alfabético</option>
            </select>
        </div>
        {/* <div className="btnBuscaxPeli" > */}
          <div className={getRoleView()} >
            <Link to="/FormMovies" className="m-1 mr-md-1 btn bg-success "
                      role="button" aria-pressed="true"> Nueva Película </Link> 
          </div>
        {/* </div> */}
      </div>
      </h4> 
      </div>
      
      <div className="lineAll centrar"> 
         {movies.map((oneMovie) => (
            <LineMovie
              key={oneMovie.idMovie} 
              id={oneMovie.idMovie}
              title={oneMovie.title}
              image={oneMovie.image}
              created={oneMovie.created}
              remove={confirmRemove}
              cookies={cookies}
              />
          ))}
        </div>
        </Fragment>

  );

};

export default AllMovies;
