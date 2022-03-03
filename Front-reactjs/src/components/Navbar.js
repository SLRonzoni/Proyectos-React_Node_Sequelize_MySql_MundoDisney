import React from "react";
import foto from "../castillo.png";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies= new Cookies();

export default function Navbar () {
  
    const loginExit = ()=>{
      Swal.fire({
        icon: "success",
        title: `Sesión finalizada`,
        text: "Usuario desconectado con éxito" ,
        showConfirmButton:false,
        timer:9000
      })
    }

     const logout=()=>{
        cookies.set('token'," ","./");
        cookies.remove('email',"./");
        cookies.remove('nombre',"./");
        cookies.remove('apellido',"./");
        cookies.remove('role',"./");
                
        loginExit();  
         window.location.href='./';
         
     }

    //hacer invisibles div con nombre de usuario debajo de Navbar
    const getUserView =()=> { 
      if(!cookies.cookies.role) {
        return 'invisible'
      } 
    };
   
  return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary callout-info" id="barraNavegacion">
        <div className="container-fluid ">
          <div className="navbar-brand h1" ></div>
          <img src={foto} className=" imagen-fluid rounded-circle col-lg-1 p-4 position-absolute top-50  translate-middle" alt="Usuario"></img>
          
          <div className=" navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav">   
              <li className="nav-item dropdown eneable">
                <Link to= '/' className="login nav-link  "  role="button" aria-expanded="false">Home</Link>
              </li>

              <li className="nav-item dropdown eneable">
                <Link to= '/AllMovies' className="login nav-link  "  role="button" >Películas</Link> 
              </li>

              <li className="nav-item dropdown eneable">
                <Link to= '/AllCharacters' className="login nav-link  " role="button" >Artistas</Link> 
              </li>

              <li className="nav-item dropdown eneable ">
                <Link to= '/AllGenders' className="login nav-link "  role="button" >Géneros</Link> 
              </li>
            
            </div>
          </div>
        </div>  

        <div className="container-fluid ">      
          <div className="navbar-collapse" >        
            <div className="navbar-nav margenEnd"> 
              <li className="nav-item dropdown eneable">
              <Link to='/auth/register' className="login nav-link  p-1 col-1 ">Registro</Link>
              </li>

              <li className="nav-item dropdown eneable">
              <Link to='/auth/login' className="login  nav-link  p-1 col-1 " >Login</Link>
              </li>

              <li className="nav-item dropdown eneable">
              <span onClick={logout} className="login nav-link p-1 col-1">Exit</span>
              </li>
            </div>
          </div>
        </div>
      </nav>

      <div className={getUserView()} >
        <div className="text-light text-end px-4">
          Usuario : {cookies.get('nombre')}{" "}{cookies.get('apellido')}{" , ( "}{cookies.get('role')}{" ) "}
        </div>
      </div>
    </div>
  );
}
