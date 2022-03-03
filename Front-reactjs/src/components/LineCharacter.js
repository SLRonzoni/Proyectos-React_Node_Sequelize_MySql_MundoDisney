import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/lineStyles.css';

const LineCharacter = ({idCharacter, name, image, remove, cookies }) => {

  //hacer visibles opciones para administrador
  const getRoleView =()=> { 
    if(cookies.cookies.role === "ADMIN") {
      return 'visible'
    } else {
      return 'invisible'
    };
  };

  return (
    <Card className="card" >
      <Card.Body>
         <Card.Title className="centrar">{name}</Card.Title>
         <Card.Text className="imagenChar centrar"> <img src={'http://localhost:3000/assets/characters/'+image}  alt="artista" ></img></Card.Text>
         <Card.Text>
            <span className={getRoleView()}>  
              <Link to={`/characters/edit/${idCharacter}`} className="btn btn-primary btn-sm mr-1 me-md-2"
                        role="button" aria-pressed="true">Modificar</Link>            
              <button type="button"className="btn btn-danger btn-sm mr-1 me-md-2" 
                        onClick= {() =>{remove(idCharacter);}}>Eliminar</button>
            </span>
            <span>
              <Link to={`/characters/${idCharacter}`} className="btn btn-success btn-sm mr-1 me-md-2"
                        role="button" aria-pressed="true">Detalle</Link>
            </span>
         </Card.Text>
      </Card.Body>
    </Card>    
  );
};
export default LineCharacter;