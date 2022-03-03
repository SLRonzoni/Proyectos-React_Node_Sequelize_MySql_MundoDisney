import React, {Fragment}from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/lineStyles.css';

const LineMovie = ({ id, title, image, created, remove, cookies}) =>{

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
        <Card className="card" >
        <Card.Body>
           <Card.Title className="centrar">{title}</Card.Title>
           <Card.Text className="imagenChar centrar"> <img src={'http://localhost:3000/assets/movies/'+image}  alt="pelicula" ></img></Card.Text>
           <Card.Text className="centrar"> Realizada en : {created}</Card.Text>
           <Card.Text>
            <span className={getRoleView()}>             
              <Link to={`/movies/edit/${id}`} className="btn btn-primary btn-sm mr-1 me-md-2 "
                    role="button" aria-pressed="true"> Modificar </Link>            
               <button type="button" className="btn btn-danger btn-sm mr-1 me-md-2 "onClick={()=>{remove(id);}} >Eliminar </button>
             </span>
             <span >
                <Link to={`/movies/${id}`} className="btn btn-success btn-sm mr-1 me-md-2"
                    role="button" aria-pressed="true"> Detalle </Link>
             </span>
                
            
            </Card.Text>
      </Card.Body>
    </Card>    
  </Fragment>
  );
};
export default LineMovie;