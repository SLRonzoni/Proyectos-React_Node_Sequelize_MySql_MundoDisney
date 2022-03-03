import React from "react";
import "./styles/styles.css";
import foto from '../../src/castillo.png'

const Home = () => {

 return (
    <div>     
        <h3 className="bienvenidos">Bienvenidos al Mundo de Disney...</h3>
        <img src={foto} className="castillo" alt="castillo"></img>
     </div>
 )
}

export default Home;