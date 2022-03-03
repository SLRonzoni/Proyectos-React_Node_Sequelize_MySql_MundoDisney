import React, { Fragment, useState, useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/All&EditStyles.css";
import LineGender from "./LineGender";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


import Cookies from "universal-cookie";
const cookies=new Cookies(); 

const AllGenders = (props) => {
  const [genders, setGenders] = useState([]);
  
   
  const getGenders = async () => {
    const respuesta = await axiosClient.get("/genders",{headers:{ Authorization:`Bearer ${cookies.get('token')}`}});
    setGenders(respuesta.data);
  };
  

   const [, setMovies] = useState([]);
   
   const getMovies = async () => {
     const respuesta = await axiosClient.get("/movies",{headers:{ Authorization:`Bearer ${cookies.get('token')}`}});
     setMovies(respuesta.data); 
   };

  useEffect(() => {
    getMovies();
    getGenders();
  },[]);


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
        remove(id);
      }
    });
  };

  const remove = async (id) => {
    await axiosClient
      .delete(`/genders/${id}`,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then((respuesta) => {
        
        Swal.fire({
          icon: "success",
          title: "Genero Eliminado!",
          text: respuesta.data.msg,
        });
        getGenders();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede eliminar",
          text: error.response.data.msg,
        });
      });
  };

  const showGender = () => {
    
    return (
      <tbody>
        {genders.map((oneGender) => (
          <LineGender
            key={oneGender.idGender}
            id={oneGender.idGender}
            name={oneGender.name}
            image={oneGender.image}
            moviesAssoc={oneGender.moviesAssoc}
            remove={confirmRemove}
            cookies={cookies}
          />
        ))}
      </tbody>
    );
  };

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
      <div>
        <h1 className="tituloTabla colorWhitesmoke">Listado de Géneros</h1>
      </div>
      <br></br>
      <table className="table table-striped  table-responsive table-bordered table-hoover bg-light lineAll">
        <thead>
          <tr>
            <th className="tituloItem" scope="col">Nro</th>
            <th className="tituloItem" scope="col">Género</th>
            <th className="tituloItem" scope="col">Imágen</th>
           
            
            <th className="tituloItem " scope="col">
            <div className={getRoleView()}>
              <Link to={"/FormGenders"} className="m-3 mr-md-2 btn btn-success"
                    role="button" aria-pressed="true"> Nuevo Género </Link> 
            </div>
            </th>
          </tr>
        </thead>
        {showGender()}
      </table>
    </Fragment>
  );

  };
export default AllGenders;
