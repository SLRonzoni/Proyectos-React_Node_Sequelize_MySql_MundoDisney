import React from 'react';
import './styles/lineStyles.css';

const LineCharByMovies = ({ name, imageCharacter, age, weight,history}) =>(

    <tr >
        <td className="renglon nombreTitulo " >{name}</td>
        <td className="imagenGender centrar"><img src={'http://localhost:3000/assets/characters/'+imageCharacter}  alt="personaje" /> </td>
        <td className=" centrar" >{age} </td>
        <td className=" centrar" >{weight} </td>
        <td className=" centrar" >{history} </td>
    </tr>    
);
export default LineCharByMovies;