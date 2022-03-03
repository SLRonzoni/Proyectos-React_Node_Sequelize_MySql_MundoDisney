import React, { useState, useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies=new Cookies(); 

const FormMovies = (props) => {
  
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    image: "",
    created:"",
    genderMovie: "",
    qualification: "",
    charactersAssoc:""
    
  });

  const changes = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const send = (e) => {
    e.preventDefault();
    saveMovie();
  };

  
  const saveMovie = async () => {
    await axiosClient
      .post("/movies", movie,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then(respuesta => {
        Swal.fire({
          icon: "success",
          title: "Alta de película exitosa !",
          text: respuesta.data.msg,
        });
        props.history.push("/AllMovies");
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.msg || error.ValidationErrorItem.message
        });
      });
  };

  //BOTON DESPLEGABLE PARA GENEROS 👍
  const [gender, setGenders] = useState([]);

  //obtener tabla de generos
  useEffect(() => {
    const getGenders = async () => {
      await axiosClient
        .get("/genders",{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
        .then((respuesta) => {
          setGenders(respuesta.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getGenders();
  }, []);
  

  //BOTON DESPLEGABLE PARA PERSONAJES 👍
  const [character, setCharacters] = useState([]);
   //obtener tabla de personajes
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

  return (
    <div>
      <br></br>
    <form onSubmit={send} className="container-sm col-6 col-md-4 bg-light">
      <br></br>
      <h3>Ingrese nueva película...</h3>
      <h6>(Para ingresar una nueva película, debe existir al menos un artista para relacionarla) </h6>
      <div className="form-group ">
        <label htmlFor="name">Título </label>
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="Ingresar titulo"
          defaultValue={movie.title}
          required
          onChange={changes}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Imágen </label>
        <input
          type="text"
          className="form-control"
          name="image"
          placeholder="Ingresar nombre del archivo de imagen"
          defaultValue={movie.image}
          onChange={changes}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="name">Creada </label>
        <input
          type="text"
          className="form-control"
          name="created"
          placeholder="Ingresar fecha de creación"
          defaultValue={movie.created}
          onChange={changes}
        />
      </div>
               
      <div className="form-group">
        <label htmlFor="name">Calificación </label>
        <input
          type="text"
          className="form-control"
          name="qualification"
          placeholder="Ingresar calificación ( de 1 a 5 )"
          defaultValue={movie.qualification}
          onChange={changes}
        />
      </div>
     
      <div className="form-group">
        <label htmlFor="genderMovie">Género </label>
        <select
          type="text"
          class="form-select"
          aria-label="Default select example"
          name="genderMovie"
          required
          onChange={changes}
        >
          <option value={-1}>Seleccione...</option>
          {gender.map((oneGender, i) => (
            <option key={oneGender.idGender} value={oneGender.idGender}>
              {oneGender.idGender} - {oneGender.name}
            </option>
          ))}
        </select>
      </div>
    <br></br>
     <div className="container col-6  bg-light">
       <label htmlFor="genderMovie">Personajes</label>
      <div className="form-group">
        <select 
          type="text" class="form-select" aria-label="Default select example"
          name="charactersAssoc" required onChange={changes}
          >
          <option value={-1}>Seleccione...( obligatorio )</option>
          {character.map((oneChar, i) => (
            <option key={oneChar.idCharacter} value={oneChar.idCharacter}>
              {oneChar.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <select 
          type="text" class="form-select" aria-label="Default select example"
          name="char2" onChange={changes}
        >
          <option value={-1}>Seleccione...( optativo )</option>
          {character.map((oneChar, i) => (
            <option key={oneChar.idCharacter} value={oneChar.idCharacter}>
              {oneChar.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <select 
          type="text" class="form-select" aria-label="Default select example"
          name="char3" onChange={changes}
        >
          <option value={-1}>Seleccione...( optativo )</option>
          {character.map((oneChar, i) => (
            <option key={oneChar.idCharacter} value={oneChar.idCharacter}>
              {oneChar.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <select 
          type="text" class="form-select" aria-label="Default select example"
          name="char4" onChange={changes}
        >
          <option value={-1}>Seleccione...( optativo )</option>
          {character.map((oneChar, i) => (
            <option key={oneChar.idCharacter} value={oneChar.idCharacter}>
              {oneChar.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <select 
          type="text" class="form-select" aria-label="Default select example"
          name="char5" onChange={changes}
        >
          <option value={-1}>Seleccione...( optativo )</option>
          {character.map((oneChar, i) => (
            <option key={oneChar.idCharacter} value={oneChar.idCharacter}>
             {oneChar.name}
            </option>
          ))}
        </select>
      </div>
     </div> 
      <br></br>
      <div className="centrar">
        <button type="submit" className="m-2 btn btn-primary md-end "> Guardar </button>
        <Link
          to={"/AllMovies"}
          className="m-3 mr-md-2 btn btn-primary"
          role="button"
          aria-pressed="true"
        >
          {" "}
          Volver{" "}
        </Link>
        <Link
          to={"/FormCharacters"}
          className="m-3 mr-md-2 btn btn-dark"
          role="button"
          aria-pressed="true"
        >Nuevo artista</Link>
      </div>
    </form>
    </div>
  );
};

export default FormMovies;
