import React, { useState, useEffect,Fragment } from "react";
import axiosClient from "../configuration/axiosClient";
import './styles/oneStyles.css';
import {Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
import LineMoviesByChar from "./LineMoviesByChar";

import Cookies from "universal-cookie";
const cookies=new Cookies(); 

const OneCharacter = (props) => {
  const { id } = props.match.params;

  const [character, setCharacter] = useState({
    idCharacter: "",
    imageCharacter:"",
    name:"",
    age:"",
    weight:"",
    history:"",
    idMovieAssoc: "",
    movies:[{
            idMovie:"",
            title:"",
            image:"",
            created:"",
            charactersAssoc:"",
            qualification:"",
            genderMovie:"",
            CharacterMovies:{
              moviesId:"",
              charactersId:""
            }
    }]}
  );

  
  useEffect(() => {  
    const getCharacter = async () => {     
      await axiosClient.get(`/characters/${id}`,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then((respuesta) => { 
          setCharacter(respuesta.data);
      })
      .catch((error=>{
          console.log(error);
      }));
    };
    getCharacter();
  }, [id]);


 const showMov = (gender) => {
  return (
   <tbody>
      {character.movies.map(oneMovie => (
         <LineMoviesByChar
           key={oneMovie.idMovie} 
           id={oneMovie.idMovie}
           title={oneMovie.title}
           image={oneMovie.image}
           created={oneMovie.created}
           qualification={oneMovie.qualification}
           genderMovie={oneMovie.genderMovie}
           /> 
      ))}
    </tbody>
  );
  };
  
  return (
    <Fragment>
      <br></br>
      <h4 className="text centrar"  >Detalle del artista seleccionado...</h4>
      <div className="centrar responsive" > 
        <div className="displayFlex" > 
          <div className="containerFijo" > 
           <Card className="card card-dimentions itemResponsive" >         
              <Card.Body  >
                  <Card.Title > Artista : {character.name}</Card.Title>
                  <Card.Img className='foto centrar' src={'http://localhost:3000/assets/characters/'+character.imageCharacter}alt="artista" />
                  <Card.Text>Edad : {character.age}</Card.Text>
                  <Card.Text>Peso : {character.weight}</Card.Text>
                  <Card.Text>Historia : {character.history.toLowerCase()}</Card.Text>               
                    
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Link
                      to={"/AllCharacters"}
                      className="m-1 btn btn-primary"
                      role="button"
                      aria-pressed="true"
                      > Volver
                    </Link>
                  </div>
              </Card.Body>
          </Card>
          </div>
          
          <div className="itemResponsive" >         
            <div className="displayFlex ">   
              <div className="cardOne" >
                <h2 className="h2"> Películas en las que participó</h2>   
                <table className="table table-striped table-bordered movies-list">
                        
                  <thead>
                    <tr>
                      <th className="tituloItem " scope="col">{" "}Película</th>
                      <th className="tituloItem" scope="col">{" "}Imágen</th>
                      <th className="tituloItem" scope="col">{" "}Creada</th>
                      <th className="tituloItem" scope="col">{" "}Calificación</th>
                      <th className="tituloItem" scope="col">{" "}Género</th>
                    </tr>
                  </thead>
                  {showMov()} 
                </table>
              </div>
            </div >
          </div > 
        </div>
        </div>
    </Fragment>

  );
};

export default OneCharacter;
