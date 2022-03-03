import React, { useState, useEffect,Fragment } from "react";
import axiosClient from "../configuration/axiosClient";
import './styles/styles.css';
import "./styles/All&EditStyles.css";
import {ListGroupItem} from 'react-bootstrap';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


import Cookies from "universal-cookie";
const cookies=new Cookies(); 

const EditMovie = (props) => {
  const { id } = props.match.params;

  const [movie, setMovie] = useState({
    idMovie: "",
    title:"",
    image:"",
    created:"",
    charactersAssoc:"",
    qualification:"",
    genderMovie: "",
    characters:[{
      idCharacter:"",
      name:"",
      imageCharacter: "",
      age:"",
      weight:"",
      history:"",
      idMovieAssoc:"",
      CharacterMovies: {
                  createdAt:"",
                  updatedAt:"",
                  moviesId: "",
                  charactersId:""
      }
    }]    
  });

  const [movieShow, setMovieShow] = useState({
    idMovie:"",
    title:"",
    image:"",
    created:"",
    charactersAssoc:"",
    qualification:"",
    genderMovie:"" ,
    characters:[
      {
        idCharacter:"",
        name:"",
        imageCharacter:"",
        age:"",
        weight:"",
        history:"",
        idMovieAssoc:"",
        CharacterMovies:{
                  createdAt:"",
                  updatedAt:"",
                  moviesId: "",
                  charactersId:""
        }
      }]    
  });

 
  //BOTON DESPLEGABLE PARA PERSONAJES 👍
  const [character, setCharacters] = useState([]);
  
   useEffect(() => {
    const getCharacters = async () => {
      await axiosClient
        .get("/characters",{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
        .then((respuesta) => {
          setCharacters(respuesta.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCharacters();
  }, []);

  

  const changes = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const send = (e) => {
    e.preventDefault();
    saveChanges();
  };


  const saveChanges = async () => {
    await axiosClient
      .put(`/movies/edit/${id}`, movie,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      
      .then(respuesta => {
        if(respuesta.status===200){
          Swal.fire({
            icon: "success",
            title: "Modificación de pelicula exitosa !",
            text: respuesta.data.msg,
           });
           props.history.push("/AllMovies");
        } 
      })
      .catch(error=> {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.msg || error.ValidationErrorItem.message

        });
      });
    }

  useEffect(() => {
    const getMovies = async () => {
      await axiosClient.get(`/movies/${id}`,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then((respuesta) => {
          setMovie(respuesta.data);
          setMovieShow(respuesta.data);
      })
      .catch((error=>{
           console.log(error.response.data.msg || error.ValidationErrorItem.message);
      }));
    };
    getMovies();
  }, [id]);


  //BOTON DESPLEGABLE PARA GENEROS 👍
  const [gender, setGenders] = useState([]);

  useEffect(() => {
    const getGenders = async () => {
      await axiosClient
        .get("/genders",{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
        .then((respuesta) => {
          setGenders(respuesta.data);
        })
        .catch((error) => {
          console.log(error.response.data.msg || error.ValidationErrorItem.message);
        });
    };
    getGenders();
  }, []);

   
  return (
      <Fragment>  
        <br></br>
          <div className="containerEditChar" >
            <div className="centrar bgWhitesmoke">    
              <br></br>
              <h4 className="textTitulo" >Película a modificar...</h4>
              <br></br>
              <div className="displayFlex centrar">
                <p className="divEditChar"> Título : {movieShow.title}</p>
                <img className='fotoEdit' src={'http://localhost:3000/assets/movies/'+movieShow.image}  alt="Pelicula" /> 
              </div>
            </div>
            <br></br>
            <br></br>
            <div className=" container bg-light d-grid gap-2 d-md-flex  justify-content-md-center">
              <div className="displayFlex">
                <div className="margen form-group form-control input-edit-char inputMovie ">
                    <label>Creada</label>
                    <p className="pEdit">Actual :  {movieShow.created}</p>
                      <input
                      type="text"
                      className="form-control input-edit-char  "
                      name="created"
                      onChange={changes}
                      /> 
                </div>
               
                <div className="margen form-group form-control input-edit-char inputMovie ">
                    <label>Calificación</label>  
                    <p className="pEdit">Actual :  {movieShow.qualification}</p>
                    <input
                      type="text"
                      className="form-control input-edit-char "
                      name="qualification"
                      onChange={changes}
                      />
                  </div>

                  <div className="margen form-group form-control input-edit-char inputMovie ">
                    <label>Género</label>  
                    <p className="pEdit">Actual :{movieShow.genderMovie}</p>
                    <select 
                      type="text" 
                      className="form-select form-select-example" 
                      name="genderMovie"defaultValue={movieShow.genderMovie}
                      onChange={changes} 
                      >                   
                      <option value={-1} >Seleccione...</option>
                      {gender.map((oneGender, i) => (
                        <option key={oneGender.idGender} value={oneGender.idGender}>
                          {oneGender.idGender} - {oneGender.name}
                        </option>
                      ))}
                    </select>   
                  </div>
                </div>
              </div>
              <div className=" container bg-light centrar ">
                  <br></br>
                   Personajes ( seleccionar los artistas que participan )
                  <br></br>
                <div className="container displayFlex">
                 
                  <div className="margen form-group form-control input-edit-char inputMovie ">
                    <p className="pEdit">Actual :  {movie.characters[0].CharacterMovies.charactersId}</p>
                    <p className="pEdit">( Obligatoria )</p>
                    <select 
                      type="text" className="form-select" aria-label="Default select example"
                      name="charactersAssoc"  required onChange={changes} 
                      >
                      <option value={-1} >Seleccione...</option>
                      {character.map((oneChar, i) => (
                        <option key={oneChar.idCharacter} value={oneChar.idCharacter}>
                          {oneChar.idCharacter} - {oneChar.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="margen form-group form-control input-edit-char inputMovie ">
                  <p className="pEdit">Actual :  </p>
                  <p className="pEdit">( Optativa )</p>
                    <select 
                      type="text" className="form-select" aria-label="Default select example"
                      name="char2" onChange={changes}
                    >
                      <option value={-1}>Seleccione...</option>
                      {character.map((oneChar, i) => (
                        <option key={oneChar.idCharacter} value={oneChar.idCharacter}>
                          {oneChar.idCharacter} - {oneChar.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="margen form-group form-control input-edit-char inputMovie ">
                  <p className="pEdit">Actual : </p>
                  <p className="pEdit">( Optativa )</p>
                    <select 
                      type="text" className="form-select" aria-label="Default select example"
                      name="char3" onChange={changes}
                    >
                      <option value={-1}>Seleccione...</option>
                      {character.map((oneChar, i) => (
                        <option key={oneChar.idCharacter} value={oneChar.idCharacter}>
                          {oneChar.idCharacter} - {oneChar.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="margen form-group form-control input-edit-char inputMovie ">
                  <p className="pEdit">Actual :  </p>
                  <p className="pEdit">( Optativa )</p>
                    <select 
                      type="text" className="form-select" aria-label="Default select example"
                      name="char4" onChange={changes}
                    >
                      <option value={-1}>Seleccione...</option>
                      {character.map((oneChar, i) => (
                        <option key={oneChar.idCharacter} value={oneChar.idCharacter}>
                          {oneChar.idCharacter} - {oneChar.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="margen form-group form-control input-edit-char inputMovie ">
                  <p className="pEdit">Actual :  </p>
                  <p className="pEdit">( Optativa )</p>
                    <select 
                      type="text" className="form-select" aria-label="Default select example"
                      name="char5" onChange={changes}
                    >
                      <option value={-1}>Seleccione...</option>
                      {character.map((oneChar, i) => (
                        <option key={oneChar.idCharacter} value={oneChar.idCharacter}>
                        {oneChar.idCharacter} - {oneChar.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>        
                </div>  
              <div>
                 <ListGroupItem>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        type="submit"
                        name="descripcion"
                        className="m-1 btn btn-primary md-end"
                        onClick={send}
                      >
                        Guardar
                      </button>
                      <Link
                        to={"/AllMovies"}
                        className="m-1 mr-md-2 btn btn-primary"
                        role="button"
                        aria-pressed="true"
                      >
                        {" "}
                        Volver{" "}
                      </Link>
                    </div>
                  </ListGroupItem>
               </div>                
          </div>
     </Fragment>
  );
};

export default EditMovie;
