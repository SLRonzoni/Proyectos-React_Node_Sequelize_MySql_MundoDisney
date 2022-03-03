import React from 'react';
import './styles/lineStyles.css';

const LineMoviesByChar = ({ title, image, created, qualification,genderMovie}) =>(

    <tr >
        <td className="renglon nombreTitulo" >{title}</td>
        <td className="imagenGender centrar"><img src={'http://localhost:3000/assets/movies/'+image}  alt="peli" /> </td>
        <td className=" centrar" >{created} </td>
        <td className=" centrar" >{qualification} </td>
        <td className=" centrar" >{genderMovie} </td>
    </tr>    
);
export default LineMoviesByChar;