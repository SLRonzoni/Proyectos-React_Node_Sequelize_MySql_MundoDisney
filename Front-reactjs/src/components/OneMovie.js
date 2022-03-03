import React, { useState, useEffect,Fragment } from "react";
import axiosClient from "../configuration/axiosClient";
import './styles/oneStyles.css';
import {Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
import LineCharByMovies from './ListCharByMovies';

import Cookies from "universal-cookie";
const cookies=new Cookies(); 

const OneMovie = (props) => {
  const { id } = props.match.params;

  const [movie, setMovie] = useState({
    idMovie: "",
    image:"",
    title:"",
    created:"",
    qualification:"",
    genderMovie:"",
    charactersAssoc:"",
    characters:[{
          idCharacter: "",
          imageCharacter:"",
          name:"",
          age:"",
          weight:"",
          history:"",
          idMovieAssoc:"",
          CharacterMovies:{
            moviesId:"",
            charactersId:""
          }
  }]}
  );

  
  //Para el caso de que exista pelicula y no exista personaje relacionado 👍
  const [movieSinChar, setMovieSinChar] = useState({
    idMovie: "",
    image:"",
    title:"",
    created:"",
    qualification:"",
    genderMovie:"",
    charactersAssoc:"",
    idMovieAssoc: ""
  });

  let sinPersonaje=" -  Sin personaje relacionado  - ";
  let sinPersonajeEspacio= " - - - - - - - - - - -  ";

                             
  useEffect(() => {
    const getMovie = async () => {
      await axiosClient.get(`/movies/${id}`,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then((respuesta) => { 
          if(respuesta.data.idMovieAssoc!==null){
            setMovie(respuesta.data);
          } else {
            setMovieSinChar(respuesta.data);
          }
      })
      .catch((error=>{
           console.log(error);
      }));
    };
    getMovie();
  }, [id]);

    
  //obtener nombre del genero 👍
  const [genders, setGenders] = useState({
    idGender:"",
    name:"",
    image:"",
    moviesAssoc:""
  });
  
  useEffect(() => {
   const getGenders = async () => {
    const respuesta = await axiosClient.get(`/genders/${movie.genderMovie||movieSinChar.genderMovie}`,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}});
    setGenders(respuesta.data);
   };
    getGenders();
  }, [movie.genderMovie,movieSinChar.genderMovie]);

  const showChar = () => {
    return (
     <tbody>
        {movie.characters.map(oneMovie => (
           <LineCharByMovies
             key={oneMovie.idCharacter} 
             id={oneMovie.idCharacter}
             name={oneMovie.name}
             imageCharacter={oneMovie.imageCharacter}
             age={oneMovie.age}
             weight={oneMovie.weight}
             history={oneMovie.history.toLocaleLowerCase()}
             /> 
        ))}
      </tbody>
    );
    };

  return (
    <Fragment >
     <br></br>

      <h4 className="text centrar"  >Detalle de la película seleccionada...</h4>
      <div className="centrar responsive" > 
        <div className=" displayFlex" > 
          <div className="containerFijo  " > 
           <Card className="card card-dimentions  itemResponsive " >         
              <Card.Body>
                  <Card.Title >Título : {movie.title} {movieSinChar.title}</Card.Title>
                  <Card.Img className='foto centrar' src={'http://localhost:3000/assets/movies/'+movie.image + movieSinChar.image}    alt="pelicula" />
                  <Card.Text>Realizada : {movie.created} {movieSinChar.created}</Card.Text>
                  <Card.Text>Género : {genders.name}</Card.Text>
                  <Card.Text>Calificación : {movie.qualification} {movieSinChar.qualification}</Card.Text>               
                   
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                     <Link
                       to={"/AllMovies"}
                       className="m-1 btn btn-primary"
                       role="button"
                       aria-pressed="true"
                       > Volver
                    </Link>     
                  </div>                  
               </Card.Body>      
          </Card>
          </div>
          
          <div className=" itemResponsive " >         
            <div className="displayFlex  ">               
              <div className="cardOne" >
                <h2 className="h2"> Artistas que participaron</h2>   
                <table className="table table-striped  table-bordered movies-list">
                        
                  <thead>
                    <tr>
                      <th className="tituloItem" scope="col">{" "}Nombre</th>
                      <th className="tituloItem" scope="col">{" "}Imágen</th>
                      <th className="tituloItem" scope="col">{" "}Edad</th>
                      <th className="tituloItem" scope="col">{" "}Peso</th>
                      <th className="tituloItem" scope="col">{" "}Historia</th>
                    </tr>
                  </thead>
                  {showChar()} 
                </table>
              </div>
            </div >
          </div > 
        </div>
        </div>
</Fragment>

  );
};

export default OneMovie;
