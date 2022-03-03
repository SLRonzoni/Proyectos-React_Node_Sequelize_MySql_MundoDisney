import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./styles/styles.css";
import Cookies from "universal-cookie";
const cookies=new Cookies(); 


function FormGenders(props) {
  
  const [gender, setGender] = useState({
    id: "",
    name: "",
    image:"",
    moviesAssoc:""
  });

  const changes = (e) => {
    setGender({
      ...gender,
      [e.target.name]: e.target.value,
    });
  };

  const send = (e) => {
    e.preventDefault();
    saveGender();
  };

  const saveGender = async () => {
    await axiosClient
      .post("/genders", gender,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then((response) => {
        if (response) {
          
          Swal.fire({
            icon: "success",
            title: "Genero Agregado!",
            text: response.data.msg,
          });
          props.history.push("/AllGenders");
        }
      })
      .catch(function (error) {
        Swal.fire({
        icon:"error",
        title: "Error",
        text: error.response.data.msg,
        });
      });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <form onSubmit={send} className="container-sm col-6 col-md-4 bg-light">
        <br></br>
        
        <h3>Ingrese nuevo Género...</h3>
        <div className="form-group ">
          <label htmlFor="name">Género: </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Ingresar genero"
            defaultValue={gender.name}
            required
            onChange={changes}
          />
          <br></br>
          <label htmlFor="name">Imágen: </label>
          <input
            type="text"
            className="form-control"
            name="image"
            placeholder="Ingresar nombre del archivo de imágen"
            defaultValue={gender.image}
            onChange={changes}
          />
        </div>

        <div className="centrar">
          <button type="submit" className="m-3 btn btn-primary">
            Guardar
          </button>
          <Link
              to={"/AllGenders"}
              className="m-3 mr-md-2 btn btn-primary"
              role="button"
              aria-pressed="true"
            >
              {" "}
              Volver{" "}
            </Link>
        </div>
    </form>
    </div>
  );
}
export default FormGenders;