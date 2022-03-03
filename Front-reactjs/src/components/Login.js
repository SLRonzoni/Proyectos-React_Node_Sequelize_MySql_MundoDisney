import React,{Component} from "react";
import "./styles/styles.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";

import Cookies from 'universal-cookie';
//instanciar cookies
const cookies= new Cookies();

class Login extends Component {
     
     state={
           form:{
      email: "",
      clave: ""
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

    loginOK = (usuario,response)=>{
       Swal.fire({
          icon: "success",
          title: `Bienvenid@ ${usuario} !`,
          text: response.data.msg ,
          showConfirmButton:false,
          timer:9000
        })
    }

    loginError = (response)=>{
     setTimeout(
      Swal.fire({
         icon: "error",
         title: "Error !",
         text: response.data.msg,
         showConfirmButton:false
       })
    ,5000);
   }
    
    //peticion a API e inicio sesion
     beginSession = async () => {
      await axiosClient.post('/auth/login',{"email":this.state.form.email,"clave":this.state.form.clave})
       
      .then(response=>{
        if(response.status===200){
          let nombre=response.data.nombre;
          
          if(response.data.token!==" "){ 
            cookies.set('email',response.data.user.email,{path:"/"});
            cookies.set('nombre',response.data.user.name,{path:"/"});
            cookies.set('apellido',response.data.user.lastname,{path:"/"});
            cookies.set('role',response.data.user.role,{path:"/"});
            cookies.set('token',response.data.token,{path:"/"});
            this.loginOK(nombre,response);
            window.location.href="/AllMovies" 
            
          } else {
            this.loginError(response)
            console.log(response)
          };          
        
        } else {
          this.loginError(response);
          console.log(response)            
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
             <h3>Login</h3>
              <div className="form-group">
                <label className="formLabel">Email :</label>
                <input type="email" 
                       className="form-control" 
                       name="email"  
                       placeholder="correo@correo.com.ar" 
                       required
                       onChange={this.handleChange}
                       />
              </div>
              <br></br>
             
             <div className="form-group" >
                <label className="formLabel">Contraseña :</label>
                <input type="password" 
                       className="form-control"  
                       name="clave"  
                       placeholder="Password" 
                       required
                       onChange={this.handleChange}
                       />
             </div>
            
             <div>
                <button className="m-3 mr-md-2 btn btn-primary" aria-pressed="true"onClick={()=>this.beginSession()} >Login</button>
            </div>
           </div>           
  
  );
  }
}

export default Login;