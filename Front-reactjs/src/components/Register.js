import React,{Component} from "react";
import "./styles/styles.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";


class Register extends Component {
    
     state={
           form:{
      name:"",
      lastname:"",
      email:"",
      clave:"",
      upatedAt:"",
      createdAt:""
           }
    };

   //capturar datos que el usuario ingresa
    handleChange = async e => {
      await this.setState({
        form:{
             ...this.state.form,
             [e.target.name]: e.target.value
        }
      });
    };

    
    registerOK = (respuesta)=>{
      setTimeout(()=>{
        Swal.fire({
            icon: "success",
            title: `Te has registrado correctamente !`,
            text: respuesta.data.msg,
            showConfirmButton:false
            })
           },1500);
           window.location.href="/auth/login"
    };

    
    //peticion a API y salvado de los datos
     send = async () => {
      await axiosClient.post('/auth/register',{"name":this.state.form.name,"lastname":this.state.form.lastname,"email":this.state.form.email,"clave":this.state.form.clave})
      
      .then(respuesta=>{
          if(respuesta.status===200){
            this.registerOK(respuesta)   
          } else {             
               Swal.fire({
                  icon: "error",
                  title: "Error !",
                  text: respuesta.data.msg,
                  showConfirmButton:true
                })
               
             };          
      })      

      .catch(error=>{
         console.log(error)
         Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.msg || error.ValidationErrorItem.message
        });
      });
    }
    
    render(){
       return (
          <div className="container-sm col-6 col-md-4 bg-light" > 
            <br></br>
            <br></br> 
            <h3>Formulario de Registro</h3>
                <div className="form-group">    
                    <label className="formLabel">Nombre</label>
                    <input type="text" className="form-control" name="name" id="name"  onChange={this.handleChange} required placeholder="Nombre" autoFocus/>
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Apellido</label>
                    <input type="text" className="form-control" name="lastname" id="lastname"  onChange={this.handleChange}  required placeholder="Apellido" autoFocus/>
                </div> 
                                    
                <div className="form-group" >    
                    <label className="formLabel">Email</label>
                    <input type="email" className="form-control" name="email" id="email"  onChange={this.handleChange}  required placeholder="Email" autoFocus/>
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Contraseña</label>
                    <input type="password" className="form-control" name="clave" id="clave"  onChange={this.handleChange}  required placeholder="Contraseña" autoFocus/>
                </div> 

                <div>
                <button className="m-3 mr-md-2 btn btn-primary" aria-pressed="true"onClick={()=>this.send()} >Enviar</button>
            </div>
            </div>
   
        );
    }
}

export default Register;
