import React,  {useState,useEffect} from 'react';
import axiosClient from '../configuration/axiosClient';
import Swal from 'sweetalert2';
import "./styles/styles.css";
import { Link } from 'react-router-dom';

import Cookies from "universal-cookie";
const cookies=new Cookies(); 

const FormCharacters=(props) => {

  const [character,setCharacter]=useState({
    name:'',
    imageCharacter:'',
    age:'',
    weight:'',
    history:'',
    idMovieAssoc:''
  });  

//BOTON DESPLEGABLE PARA PELICULAS
const [, setMovies] = useState([]);

useEffect(() => {
  const getMovies = async  () => {
    await axiosClient
      .get("/Movies",{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then((respuesta) => {
        setMovies(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getMovies();
}, []);

  
  const changes=(e)=>{
    setCharacter({
        ...character,
        [e.target.name]:e.target.value  
    });
  };
  const send = (e) =>{
    e.preventDefault();
    saveCharacter();
  };


  const saveCharacter= async ()=>{
      await axiosClient.post('/characters',character,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
        .then (respuesta=>{
          Swal.fire({
            icon: 'success', 
            title:'',
            text: respuesta.data.msg
          })
        
          if(respuesta.data.msg){
            props.history.push('/AllCharacters');
          }       
        })
        .catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.msg
          });
        });
  };

  return(
    <div>
   
    <br></br>
    <form onSubmit={send} className="container col-md-4 bg-light">
     <br></br>
    <h4>Ingrese nuevo artista...</h4>
      
      <div className="form-group "> 
        <label htmlFor="name">Nombre y Apellido: </label>
        <input type="text" className="form-control" 
                name="name" placeholder="Ingresar Nombre"
                defaultValue={character.name}
                required       
                onChange={changes}
        />
      </div>

      <div className="form-group"> 
        <label htmlFor="name">Imágen : </label>
        <input type="text" className="form-control" 
                name="imageCharacter" placeholder="Ingresar Imagen"
                defaultValue={character.imageCharacter} 
                required
                onChange={changes}
        />
      </div>

      <div className="form-group"> 
        <label htmlFor="name">Edad : </label>
        <input type="text" className="form-control" 
                name="age" placeholder="Ingresar Edad"
                defaultValue={character.age}
                required 
                onChange={changes}
        />
      </div>

      <div className="form-group"> 
        <label htmlFor="name">Peso : </label>
        <input type="text" className="form-control" 
                name="weight" placeholder="Ingresar Peso"
                defaultValue={character.weight}
                onChange={changes}    
        />
      </div>

      <div className="form-group"> 
        <label htmlFor="name">Historia : </label>
        <input type="text" className="form-control" 
                name="history" placeholder="Ingresar historia"
                defaultValue={character.history}   
                onChange={changes}    
        />
      </div>
      
     <div className="centrar">
      <button type="submit" className="m-2 btn btn-primary md-end ">Guardar</button>
      <Link
          to={"/AllCharacters"}
          className="m-3 m-2 btn btn-primary"
          role="button"
          aria-pressed="true"
        >
          {" "}
          Volver{" "}
        </Link>
      </div>
    </form>
    </div>
  )
}

export default FormCharacters;
