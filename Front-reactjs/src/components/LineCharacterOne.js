import React from 'react';
import { Card } from 'react-bootstrap';
import './styles/lineStyles.css';

const LineCharacterOne = ({idCharacter, name, imageCharacter,age, weight, history }) => {

  return (
    <Card className="card" >
      <Card.Body>
         <Card.Title className="centrar">{name}</Card.Title>
         <Card.Text className="imagenChar centrar"> <img src={'http://localhost:3000/assets/characters/'+imageCharacter}  alt="artista" ></img></Card.Text>
         <Card.Text className="centrar">{age}</Card.Text>
         <Card.Text className="centrar">{weight}</Card.Text>
         <Card.Text className="centrar">{history}</Card.Text>
      </Card.Body>
    </Card>    
  );
};
export default LineCharacterOne;