import React, {Fragment, useState,useEffect} from 'react';
import axiosClient from '../configuration/axiosClient';
import './styles/styles.css';
import "./styles/All&EditStyles.css";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies=new Cookies(); 

const EditCharacters = (props) =>{

  const {id} = props.match.params;
  const [character, setCharacter] = useState(
    {
      id:'',
      name:'',
      imageCharacter:'',
      age:'',
      weight:'',
      history:'',
      idMovieAssoc:''
    }
  );

  const [characterShow, setCharacterShow] = useState({
    id: "",
    name:"",
    imageCharacter:"",
    age:"",
    weight: "",
    history:"",
    idMovieAssoc: ""
  });

  const changes=(e)=>{
    setCharacter({
        ...character,
        [e.target.name]:e.target.value  
    });
  };

  const send = (e) =>{
    e.preventDefault();
    editCharacter();
  };

//BOTON DESPLEGABLE PARA PELICULAS
const [, setMovies] = useState([]);

useEffect(() => {
  const getMovies = async () => {
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


  useEffect(() =>{
    const getCharacter= async () => {
      await axiosClient.get(`/characters/${id}`,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then(respuesta =>{
        setCharacter(respuesta.data);
        setCharacterShow(respuesta.data);
      });
    };
    getCharacter();
  },[id]);

  const editCharacter= async ()=>{
    await axiosClient.put(`/characters/edit/${id}`,character,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
    .then (respuesta=>{
      console.log(respuesta)
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
    })
  };

  return (
    <Fragment>
      <br></br>  
        <div className="containerEditChar ">
        <div>   
            <br></br> 
            <h5 className="textTitulo"  >Artista a modificar...</h5>
            <div className="displayFlex"  >
              <div >
                <div className="divEditChar" > {characterShow.name} </div>
                <img className="fotoEdit" src={'http://localhost:3000/assets/characters/'+characterShow.imageCharacter}  alt="artista"></img>
              </div>  

            <div className="list-group-flush " >
                <div className="div-input-edit-char " >
                  Edad  
                    <input 
                    type="number"
                    className="form-control input-edit-char"
                    name="age"
                    defaultValue={characterShow.age}
                    onChange={changes}
                    /> 
                </div>     
                <div  className="div-input-edit-char" > 
                  Peso 
                  <input
                    type="number"
                    className="form-control input-edit-char "
                    name="weight"
                    defaultValue={characterShow.weight}
                    onChange={changes}
                    />
                </div>
            </div>
          </div>
              <div className="list-group-char" >      
                  Historia 
                  <input
                    type="text"
                    className="form-control inputMovie-artistas"
                    name="history"
                    defaultValue={characterShow.history}
                    onChange={changes}
                    />
               </div>

                <div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button
                      type="submit"
                      name="descripcion"
                      className="m-1 btn btn-primary"
                      onClick={send}
                    >
                      Guardar
                    </button>
                    <Link
                      to={"/AllCharacters"}
                      className="m-1 mr-md-2 btn btn-primary"
                      role="button"
                      aria-pressed="true"
                    >
                      {" "}
                      Volver{" "}
                    </Link>
                  </div>
                  <br></br>
                </div>
            </div>          
      </div>
</Fragment>
  )  
};

export default EditCharacters;

