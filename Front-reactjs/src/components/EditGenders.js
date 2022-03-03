import React, { Fragment, useState, useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/All&EditStyles.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import Cookies from "universal-cookie";
const cookies=new Cookies(); 

const EditGender = (props) => {

  const { id } = props.match.params;

  const [gender, setGender] = useState({
    idGender: "",
    name: "",
    image:"",
    moviesAssoc:""
  });


  const [genderShow, setGenderShow] = useState({
    idGender: "",
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
    save();
  };

  useEffect(() => {
    const getGender = async () => {
      await axiosClient.get(`/genders/${id}`,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then((respuesta) => {
          setGender(respuesta.data);
          setGenderShow(respuesta.data);
      })
      .catch((error=>{
           console.log(error);
      }));
    };
    getGender();
  }, [id]);

  const save = async () => {
    await axiosClient
      .put(`/genders/edit/${id}`, gender,{headers:{ Authorization:`Bearer ${cookies.get('token')}`}})
      .then((respuesta) => {
        Swal.fire({
          icon: "success",
          title: "Modificación de categoria exitosa !",
          text: respuesta.data.msg,
        });
        props.history.push("/AllGenders");
        
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.msg,
        });
      });
  };


  return (

    <Fragment  >
      <br></br> 
        <div >
        <div className="containerEditGender">         
           <Card.Text className="card-text-edit-gender centrar"> 
           <br></br>
           <h5 className="text colorBlack" >Género a modificar...</h5>   
           <h6> ( Solo puede modificar nombre del género y nombre del archivo de imágen )</h6></Card.Text>
           
           <Card.Img className='foto 'src={'http://localhost:3000/assets/genders/'+genderShow.image}   alt="genero"></Card.Img>
            <div className="list-group-char">
                <div className="list-group-char" >
                  Género :
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    defaultValue={genderShow.name}
                    onChange={changes}
                    />
                    <br></br>
                  Imágen : ( nombre del archivo)
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    defaultValue={genderShow.image}
                    onChange={changes}
                  />
                </div>

                <div >
                  <div className="d-grid gap-4 d-md-flex justify-content-md-center">
                    <button
                      type="submit"
                      name="save"
                      className="m-2 btn btn-primary"
                      onClick={send}
                    >
                      Guardar
                    </button>
                    <Link
                      to={"/AllGenders"}
                      className="m-2 btn btn-primary"
                      role="button"
                      aria-pressed="true"
                    >
                      {" "}
                      Volver{" "}
                    </Link>
                  </div>
                </div>
                <br></br>
            </div>  
          </div>              
      </div>
</Fragment>

  );
};

export default EditGender;